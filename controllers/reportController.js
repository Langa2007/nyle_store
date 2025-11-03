// controllers/reportController.js
import { pool } from "../db/connect.js";

export const createReport = async (req, res) => {
  try {
    const { reporter_name, reporter_email, description, url, priority } = req.body;
    if (!description) return res.status(400).json({ message: "Description required" });

    const q = await pool.query(
      `INSERT INTO reported_issues (reporter_name, reporter_email, description, url, priority)
       VALUES ($1,$2,$3,$4,$5) RETURNING id`,
      [reporter_name || null, reporter_email || null, description, url || null, priority || 'normal']
    );

    res.status(201).json({ message: "Report submitted", id: q.rows[0].id });
  } catch (err) {
    console.error("createReport error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listReports = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const pageSize = Math.min(Number(req.query.pageSize) || 25, 200);
    const offset = (page - 1) * pageSize;

    const q = await pool.query(`SELECT * FROM reported_issues ORDER BY created_at DESC LIMIT $1 OFFSET $2`, [pageSize, offset]);
    const totalQ = await pool.query(`SELECT COUNT(*) FROM reported_issues`);
    res.json({ items: q.rows, total: Number(totalQ.rows[0].count), page, pageSize });
  } catch (err) {
    console.error("listReports error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await pool.query(`UPDATE reported_issues SET status=$1, updated_at=now() WHERE id=$2`, [status || 'open', id]);
    res.json({ message: "Updated" });
  } catch (err) {
    console.error("updateReportStatus error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
