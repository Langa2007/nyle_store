// controllers/faqController.js
import { pool } from "../db/connect.js";

export const listFaqs = async (req, res) => {
  try {
    const q = await pool.query(`SELECT * FROM faqs ORDER BY order_index ASC, created_at DESC`);
    res.json(q.rows);
  } catch (err) {
    console.error("listFaqs error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// admin create/update/delete:
export const createFaq = async (req, res) => {
  try {
    const { question, answer, category, order_index } = req.body;
    if (!question || !answer) return res.status(400).json({ message: "question and answer required" });
    const q = await pool.query(
      `INSERT INTO faqs (question, answer, category, order_index) VALUES ($1,$2,$3,$4) RETURNING id`,
      [question, answer, category || null, order_index || 0]
    );
    res.status(201).json({ id: q.rows[0].id });
  } catch (err) {
    console.error("createFaq error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM faqs WHERE id = $1`, [id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("deleteFaq error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
