import pool from "../db/connect.js";

const parseUserId = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

const getActor = (req, res) => {
  const userId = parseUserId(req.body?.user_id ?? req.query?.user_id);
  const sessionId = String(req.body?.session_id ?? req.query?.session_id ?? "").trim();

  if (!userId && !sessionId) {
    res.status(400).json({ error: "user_id or session_id is required" });
    return null;
  }

  return {
    userId,
    sessionId: userId ? null : sessionId,
  };
};

const buildActorClause = (actor, columnPrefix = "w") => {
  if (actor.userId) {
    return {
      clause: `${columnPrefix}.user_id = $1`,
      values: [actor.userId],
    };
  }

  return {
    clause: `${columnPrefix}.session_id = $1`,
    values: [actor.sessionId],
  };
};

const fetchWishlistItemsForActor = async (actor) => {
  const { clause, values } = buildActorClause(actor);
  const query = `
    SELECT
      w.id AS wishlist_id,
      w.product_id,
      w.created_at AS wished_at,
      p.*,
      COALESCE(v.legal_name, v.company_name, 'Unknown Seller') AS vendor_name
    FROM wishlist_items w
    INNER JOIN products p ON p.id = w.product_id
    LEFT JOIN vendors v ON p.vendor_id = v.id
    WHERE ${clause}
      AND p.status = 'approved'
    ORDER BY w.created_at DESC
  `;

  const { rows } = await pool.query(query, values);
  return rows;
};

const fetchWishlistCountForActor = async (actor) => {
  const { clause, values } = buildActorClause(actor);
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS count FROM wishlist_items w WHERE ${clause}`,
    values
  );

  return rows[0]?.count || 0;
};

export const getWishlist = async (req, res) => {
  const actor = getActor(req, res);
  if (!actor) return;

  try {
    const items = await fetchWishlistItemsForActor(actor);
    res.json({
      items,
      count: items.length,
    });
  } catch (error) {
    console.error("Get wishlist error:", error.message);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};

export const toggleWishlistItem = async (req, res) => {
  const actor = getActor(req, res);
  if (!actor) return;

  const productId = Number(req.body?.product_id);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({ error: "Valid product_id is required" });
  }

  try {
    const existingQuery = actor.userId
      ? "SELECT id FROM wishlist_items WHERE user_id = $1 AND product_id = $2 LIMIT 1"
      : "SELECT id FROM wishlist_items WHERE session_id = $1 AND product_id = $2 LIMIT 1";

    const actorValue = actor.userId || actor.sessionId;
    const existing = await pool.query(existingQuery, [actorValue, productId]);

    let wishlisted = false;

    if (existing.rows.length) {
      const deleteQuery = actor.userId
        ? "DELETE FROM wishlist_items WHERE user_id = $1 AND product_id = $2"
        : "DELETE FROM wishlist_items WHERE session_id = $1 AND product_id = $2";
      await pool.query(deleteQuery, [actorValue, productId]);
    } else {
      const insertQuery = actor.userId
        ? `
            INSERT INTO wishlist_items (user_id, product_id, created_at, updated_at)
            VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          `
        : `
            INSERT INTO wishlist_items (session_id, product_id, created_at, updated_at)
            VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          `;
      await pool.query(insertQuery, [actorValue, productId]);
      wishlisted = true;
    }

    const count = await fetchWishlistCountForActor(actor);
    res.json({
      success: true,
      wishlisted,
      count,
    });
  } catch (error) {
    console.error("Toggle wishlist error:", error.message);
    res.status(500).json({ error: "Failed to update wishlist" });
  }
};

export const removeWishlistItem = async (req, res) => {
  const actor = getActor(req, res);
  if (!actor) return;

  const productId = Number(req.params.productId);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({ error: "Valid productId is required" });
  }

  try {
    const deleteQuery = actor.userId
      ? "DELETE FROM wishlist_items WHERE user_id = $1 AND product_id = $2"
      : "DELETE FROM wishlist_items WHERE session_id = $1 AND product_id = $2";

    await pool.query(deleteQuery, [actor.userId || actor.sessionId, productId]);
    const count = await fetchWishlistCountForActor(actor);

    res.json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("Remove wishlist item error:", error.message);
    res.status(500).json({ error: "Failed to remove wishlist item" });
  }
};

export const syncWishlist = async (req, res) => {
  const userId = parseUserId(req.body?.user_id);
  const sessionId = String(req.body?.session_id ?? "").trim();

  if (!userId || !sessionId) {
    return res.status(400).json({ error: "user_id and session_id are required" });
  }

  try {
    await pool.query(
      `
        INSERT INTO wishlist_items (user_id, product_id, created_at, updated_at)
        SELECT $1, product_id, created_at, CURRENT_TIMESTAMP
        FROM wishlist_items
        WHERE session_id = $2
        ON CONFLICT (user_id, product_id)
        DO UPDATE SET updated_at = CURRENT_TIMESTAMP
      `,
      [userId, sessionId]
    );

    await pool.query("DELETE FROM wishlist_items WHERE session_id = $1", [sessionId]);

    const actor = { userId, sessionId: null };
    const items = await fetchWishlistItemsForActor(actor);
    res.json({
      success: true,
      items,
      count: items.length,
    });
  } catch (error) {
    console.error("Sync wishlist error:", error.message);
    res.status(500).json({ error: "Failed to sync wishlist" });
  }
};
