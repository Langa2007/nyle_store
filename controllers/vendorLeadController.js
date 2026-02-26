import { pool } from "../db/connect.js";

// @desc    Submit a vendor interest lead
// @route   POST /api/vendor-leads/submit
export const submitLead = async (req, res) => {
    try {
        const {
            full_name, business_name, email, business_email,
            phone, business_phone, location, type
        } = req.body;

        if (!email || !phone) {
            return res.status(400).json({ message: "Email and phone are required" });
        }

        const lead = await pool.query(
            `INSERT INTO vendor_leads (
                full_name, business_name, email, business_email, 
                phone, business_phone, location, type
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [
                full_name, business_name, email, business_email,
                phone, business_phone, location, type || 'kenyan'
            ]
        );

        res.status(201).json({
            message: "Interest captured successfully! Our team will contact you soon.",
            lead: lead.rows[0]
        });
    } catch (err) {
        console.error("Error submitting lead:", err);
        res.status(500).json({ message: "Server error while submitting interest" });
    }
};

// @desc    Get all vendor leads (Admin only)
// @route   GET /api/vendor-leads
export const getLeads = async (req, res) => {
    try {
        const leads = await pool.query("SELECT * FROM vendor_leads ORDER BY created_at DESC");
        res.json({ leads: leads.rows });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch leads" });
    }
};

// @desc    Update lead status (Admin only)
// @route   PATCH /api/vendor-leads/:id
export const updateLeadStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await pool.query(
            "UPDATE vendor_leads SET status = $1 WHERE id = $2",
            [status, id]
        );

        res.json({ message: "Lead status updated" });
    } catch (err) {
        res.status(500).json({ message: "Failed to update lead status" });
    }
};
