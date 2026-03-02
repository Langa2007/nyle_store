// controllers/partnerController.js
import PartnerModel from '../models/partnerModel.js';
import { sendPartnerApplicationEmail } from '../services/emailService.js';

class PartnerController {
    /**
     * Handle partner application submission
     */
    static async apply(req, res) {
        try {
            const formData = req.body;

            // Basic validation
            if (!formData.organizationName || !formData.email || !formData.fullName) {
                return res.status(400).json({
                    success: false,
                    message: "Required fields are missing."
                });
            }

            // Save to database
            const application = await PartnerModel.createApplication(formData);

            // Send confirmation email
            await sendPartnerApplicationEmail(formData.email, {
                organizationName: formData.organizationName,
                fullName: formData.fullName,
                partnershipTier: formData.partnershipTier
            });

            res.status(201).json({
                success: true,
                message: "Application submitted successfully.",
                data: application
            });
        } catch (error) {
            console.error("Partner application error:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error. Please try again later."
            });
        }
    }

    /**
     * Get all partner applications (Admin)
     */
    static async getApplications(req, res) {
        try {
            const applications = await PartnerModel.getAllApplications();
            res.status(200).json({
                success: true,
                data: applications
            });
        } catch (error) {
            console.error("Fetch applications error:", error);
            res.status(500).json({
                success: false,
                message: "Failed to fetch applications."
            });
        }
    }

    /**
     * Update application status (Admin)
     */
    static async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status) {
                return res.status(400).json({
                    success: false,
                    message: "Status is required."
                });
            }

            const updated = await PartnerModel.updateStatus(id, status);
            res.status(200).json({
                success: true,
                data: updated
            });
        } catch (error) {
            console.error("Update status error:", error);
            res.status(500).json({
                success: false,
                message: "Failed to update status."
            });
        }
    }
}

export default PartnerController;
