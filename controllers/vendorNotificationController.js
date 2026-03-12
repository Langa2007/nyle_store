// controllers/vendorNotificationController.js
import { pool } from "../db/connect.js";

/**
 * Get notification summary for vendor
 * Alerts for:
 * 1. Rejected products (with reasons)
 * 2. Pending products
 * 3. Support ticket updates (future)
 */
export const getNotificationSummary = async (req, res) => {
    try {
        const vendorId = req.user.vendor_id;

        // 1. Get Rejected Products
        const rejectedQuery = `
      SELECT id, name, rejection_reason, updated_at 
      FROM products 
      WHERE vendor_id = $1 AND status = 'rejected'
      ORDER BY updated_at DESC
    `;

        // 2. Get Pending Products Count
        const pendingQuery = `
      SELECT COUNT(*) as count 
      FROM products 
      WHERE vendor_id = $1 AND status = 'pending'
    `;

        // 3. Get Approved Products (Recent ones)
        const approvedQuery = `
      SELECT id, name, approved_at 
      FROM products 
      WHERE vendor_id = $1 AND status = 'approved' AND approved_at > NOW() - INTERVAL '7 days'
      ORDER BY approved_at DESC
    `;

        const [rejectedResult, pendingResult, approvedResult] = await Promise.all([
            pool.query(rejectedQuery, [vendorId]),
            pool.query(pendingQuery, [vendorId]),
            pool.query(approvedQuery, [vendorId])
        ]);

        const notifications = [];

        // Add rejected products as notifications
        rejectedResult.rows.forEach(p => {
            notifications.push({
                id: `rej-${p.id}`,
                type: 'rejection',
                title: 'Product Rejected',
                message: `Your product "${p.name}" was rejected. Reason: ${p.rejection_reason || 'No reason provided.'}`,
                timestamp: p.updated_at,
                severity: 'high',
                action_url: `/vendor/products/edit/${p.id}`
            });
        });

        // Add pending count if > 0
        const pendingCount = parseInt(pendingResult.rows[0].count);
        if (pendingCount > 0) {
            notifications.push({
                id: 'pending-summary',
                type: 'pending_summary',
                title: 'Products Pending Approval',
                message: `You have ${pendingCount} products currently awaiting admin approval.`,
                timestamp: new Date(),
                severity: 'medium',
                action_url: '/vendor/products'
            });
        }

        // Add recent approvals
        approvedResult.rows.forEach(p => {
            notifications.push({
                id: `app-${p.id}`,
                type: 'approval',
                title: 'Product Approved',
                message: `Great news! Your product "${p.name}" has been approved and is now live.`,
                timestamp: p.approved_at,
                severity: 'low',
                action_url: `/vendor/products`
            });
        });

        // Sort all by timestamp descending
        notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        return res.json({
            count: notifications.length,
            notifications: notifications.slice(0, 10), // Limit to recent 10
            summary: {
                rejected: rejectedResult.rows.length,
                pending: pendingCount,
                approved_recent: approvedResult.rows.length
            }
        });

    } catch (err) {
        console.error("Vendor notification summary error:", err);
        res.status(500).json({ message: "Server error fetching notifications" });
    }
};
