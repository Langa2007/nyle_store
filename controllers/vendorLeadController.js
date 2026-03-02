import { pool } from "../db/connect.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const SELLER_BASE_URL = process.env.SELLER_FRONTEND_URL || "https://nyle-luxe.vercel.app";

const getSellerSignupLink = (leadType) => {
    return leadType === "overseas"
        ? `${SELLER_BASE_URL}/vendor/overseas-sellers`
        : `${SELLER_BASE_URL}/vendor/kenyansellers`;
};

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

// @desc    Send signup link to vendor lead via email (Admin only)
// @route   POST /api/vendor-leads/:id/send-link
export const sendLeadSignupLink = async (req, res) => {
    try {
        const { id } = req.params;

        const leadResult = await pool.query(
            "SELECT id, full_name, email, type, status FROM vendor_leads WHERE id = $1",
            [id]
        );

        if (!leadResult.rows.length) {
            return res.status(404).json({ message: "Lead not found" });
        }

        const lead = leadResult.rows[0];

        if (lead.status !== "contacted") {
            return res.status(400).json({
                message: "Lead must be marked as contacted before sending signup link",
            });
        }

        const signupLink = getSellerSignupLink(lead.type);
        const recipientName = lead.full_name || "there";

        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "Nyle Store <onboarding@resend.dev>",
            to: lead.email,
            subject: "Your Nyle seller signup link",
            html: `
                <h2>Complete your Nyle seller onboarding</h2>
                <p>Hello ${recipientName},</p>
                <p>Use the link below to continue your seller onboarding:</p>
                <p><a href="${signupLink}">${signupLink}</a></p>
                <p>If you did not request this, you can ignore this email.</p>
            `,
        });

        await pool.query(
            "UPDATE vendor_leads SET status = 'link_sent' WHERE id = $1",
            [id]
        );

        return res.json({
            message: "Signup link sent successfully",
            link: signupLink,
        });
    } catch (err) {
        console.error("Failed to send lead signup link:", err);
        return res.status(500).json({ message: "Failed to send signup link" });
    }
};
