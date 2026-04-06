import pool from "../db/connect.js";
import { normalizeUserId } from "../db/userIdSchema.js";

const MAX_RECENT_ITEMS = 24;

const getActor = (req, res) => {
  const userId = normalizeUserId(req.body?.user_id ?? req.query?.user_id);
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

const buildActorClause = (actor, columnPrefix = "rv") => {
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

const fetchRecentlyViewedForActor = async (actor, limit = 8) => {
  const { clause, values } = buildActorClause(actor);
  const query = `
    SELECT
      rv.id AS recently_viewed_id,
      rv.product_id,
      rv.viewed_at,
      p.*,
      COALESCE(v.legal_name, v.company_name, 'Unknown Seller') AS vendor_name
    FROM recently_viewed_items rv
    INNER JOIN products p ON p.id = rv.product_id
    LEFT JOIN vendors v ON p.vendor_id = v.id
    WHERE ${clause}
      AND p.status = 'approved'
    ORDER BY rv.viewed_at DESC
    LIMIT ${Number(limit) > 0 ? Number(limit) : 8}
  `;

  const { rows } = await pool.query(query, values);
  return rows;
};

const fetchRecentlyViewedCountForActor = async (actor) => {
  const { clause, values } = buildActorClause(actor);
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS count FROM recently_viewed_items rv WHERE ${clause}`,
    values
  );

  return rows[0]?.count || 0;
};

const trimRecentlyViewed = async (actor) => {
  if (actor.userId) {
    await pool.query(
      `
        DELETE FROM recently_viewed_items
        WHERE id IN (
          SELECT id
          FROM recently_viewed_items
          WHERE user_id = $1
          ORDER BY viewed_at DESC
          OFFSET $2
        )
      `,
      [actor.userId, MAX_RECENT_ITEMS]
    );
    return;
  }

  await pool.query(
    `
      DELETE FROM recently_viewed_items
      WHERE id IN (
        SELECT id
        FROM recently_viewed_items
        WHERE session_id = $1
        ORDER BY viewed_at DESC
        OFFSET $2
      )
    `,
    [actor.sessionId, MAX_RECENT_ITEMS]
  );
};

export const getRecentlyViewed = async (req, res) => {
  const actor = getActor(req, res);
  if (!actor) return;

  const limit = Number(req.query?.limit) || 8;

  try {
    const items = await fetchRecentlyViewedForActor(actor, limit);
    const count = await fetchRecentlyViewedCountForActor(actor);
    res.json({
      items,
      count,
    });
  } catch (error) {
    console.error("Get recently viewed error:", error.message);
    res.status(500).json({ error: "Failed to fetch recently viewed items" });
  }
};

export const trackRecentlyViewed = async (req, res) => {
  const actor = getActor(req, res);
  if (!actor) return;

  const productId = Number(req.body?.product_id);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({ error: "Valid product_id is required" });
  }

  try {
    if (actor.userId) {
      await pool.query(
        `
          INSERT INTO recently_viewed_items (user_id, product_id, viewed_at, created_at, updated_at)
          VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          ON CONFLICT (user_id, product_id)
          DO UPDATE SET viewed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
        `,
        [actor.userId, productId]
      );
    } else {
      await pool.query(
        `
          INSERT INTO recently_viewed_items (session_id, product_id, viewed_at, created_at, updated_at)
          VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          ON CONFLICT (session_id, product_id)
          DO UPDATE SET viewed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
        `,
        [actor.sessionId, productId]
      );
    }

    await trimRecentlyViewed(actor);

    const count = await fetchRecentlyViewedCountForActor(actor);
    res.json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("Track recently viewed error:", error.message);
    res.status(500).json({ error: "Failed to track recently viewed item" });
  }
};

export const clearRecentlyViewed = async (req, res) => {
  const actor = getActor(req, res);
  if (!actor) return;

  try {
    if (actor.userId) {
      await pool.query("DELETE FROM recently_viewed_items WHERE user_id = $1", [actor.userId]);
    } else {
      await pool.query("DELETE FROM recently_viewed_items WHERE session_id = $1", [actor.sessionId]);
    }

    res.json({
      success: true,
      count: 0,
      items: [],
    });
  } catch (error) {
    console.error("Clear recently viewed error:", error.message);
    res.status(500).json({ error: "Failed to clear recently viewed items" });
  }
};

export const syncRecentlyViewed = async (req, res) => {
  const userId = normalizeUserId(req.body?.user_id);
  const sessionId = String(req.body?.session_id ?? "").trim();

  if (!userId || !sessionId) {
    return res.status(400).json({ error: "user_id and session_id are required" });
  }

  try {
    await pool.query(
      `
        INSERT INTO recently_viewed_items (user_id, product_id, viewed_at, created_at, updated_at)
        SELECT $1, product_id, viewed_at, created_at, CURRENT_TIMESTAMP
        FROM recently_viewed_items
        WHERE session_id = $2
        ON CONFLICT (user_id, product_id)
        DO UPDATE SET viewed_at = EXCLUDED.viewed_at, updated_at = CURRENT_TIMESTAMP
      `,
      [userId, sessionId]
    );

    await pool.query("DELETE FROM recently_viewed_items WHERE session_id = $1", [sessionId]);
    await trimRecentlyViewed({ userId, sessionId: null });

    const actor = { userId, sessionId: null };
    const items = await fetchRecentlyViewedForActor(actor, 8);
    const count = await fetchRecentlyViewedCountForActor(actor);

    res.json({
      success: true,
      items,
      count,
    });
  } catch (error) {
    console.error("Sync recently viewed error:", error.message);
    res.status(500).json({ error: "Failed to sync recently viewed items" });
  }
};
