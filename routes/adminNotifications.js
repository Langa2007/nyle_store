import express from 'express';
import { pool } from '../db/connect.js';

const router = express.Router();

// GET /api/admin/notifications/summary
// Fetches the count of actionable items requiring admin attention
router.get('/summary', async (req, res) => {
    try {
        // Execute queries in parallel for performance
        const [
            pendingVendorsResult,
            pendingPartnersResult,
            pendingOrdersResult,
            openSupportMessagesResult,
            openReportedIssuesResult
        ] = await Promise.all([
            pool.query("SELECT COUNT(*) FROM vendors WHERE status = 'pending'"),
            pool.query("SELECT COUNT(*) FROM partner_applications WHERE status = 'pending' OR status = 'termination_notice'"),
            pool.query("SELECT COUNT(*) FROM orders WHERE status = 'pending'"),
            pool.query("SELECT COUNT(*) FROM support_messages WHERE status = 'open'"),
            pool.query("SELECT COUNT(*) FROM reported_issues WHERE status = 'open'")
        ]);

        const pendingVendors = parseInt(pendingVendorsResult.rows[0].count, 10) || 0;
        const pendingPartners = parseInt(pendingPartnersResult.rows[0].count, 10) || 0;
        const pendingOrders = parseInt(pendingOrdersResult.rows[0].count, 10) || 0;
        const openSupportMessages = parseInt(openSupportMessagesResult.rows[0].count, 10) || 0;
        const openReportedIssues = parseInt(openReportedIssuesResult.rows[0].count, 10) || 0;

        const totalNotifications = pendingVendors + pendingPartners + pendingOrders + openSupportMessages + openReportedIssues;

        res.status(200).json({
            success: true,
            total: totalNotifications,
            details: {
                pendingVendors,
                pendingPartners,
                pendingOrders,
                openSupportMessages,
                openReportedIssues
            }
        });

    } catch (error) {
        console.error('Error fetching admin notifications summary:', error);
        res.status(500).json({ error: 'Failed to fetch admin notifications summary' });
    }
});

export default router;
