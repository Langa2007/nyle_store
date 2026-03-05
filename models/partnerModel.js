// models/partnerModel.js
import pool from '../db/connect.js';

class PartnerModel {
    /**
     * Create a new partner application
     * @param {Object} data - Application data from form
     * @returns {Object} - Created application record
     */
    static async createApplication(data) {
        const query = `
            INSERT INTO partner_applications (
                partner_type, partnership_tier, organization_name, registration_number,
                year_established, business_size, website, linkedin,
                full_name, job_title, email, phone, alternative_phone,
                country, city, address, description, services,
                target_markets, key_clients, annual_revenue, countries_of_operation,
                partnership_goals, expected_volume, integration_timeline, additional_info
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26
            ) RETURNING *
        `;

        const values = [
            data.partnerType, data.partnershipTier, data.organizationName, data.registrationNumber,
            data.yearEstablished, data.businessSize, data.website, data.linkedin,
            data.fullName, data.jobTitle, data.email, data.phone, data.alternativePhone,
            data.country, data.city, data.address, data.description,
            JSON.stringify(data.services || []), JSON.stringify(data.targetMarkets || []),
            data.keyClients, data.annualRevenue, JSON.stringify(data.countriesOfOperation || []),
            data.partnershipGoals, data.expectedVolume, data.integrationTimeline, data.additionalInfo
        ];

        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    /**
     * Get all partner applications for admin
     * @returns {Array} - List of applications
     */
    static async getAllApplications() {
        await this.finalizeExpiredTerminations();
        const query = 'SELECT * FROM partner_applications ORDER BY created_at DESC';
        const { rows } = await pool.query(query);
        return rows;
    }

    /**
     * Get single application by ID
     * @param {number} id
     * @returns {Object|null}
     */
    static async getApplicationById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM partner_applications WHERE id = $1',
            [id]
        );
        return rows[0] || null;
    }

    /**
     * Mark application as contacted
     * @param {number} id
     * @param {number|null} adminId
     * @returns {Object|null}
     */
    static async markContacted(id, adminId = null) {
        const query = `
            UPDATE partner_applications
            SET contacted_at = COALESCE(contacted_at, NOW()),
                contacted_by = COALESCE(contacted_by, $2)
            WHERE id = $1
            RETURNING *
        `;
        const { rows } = await pool.query(query, [id, adminId]);
        return rows[0] || null;
    }

    /**
     * Finalize termination notices whose deadline has passed
     */
    static async finalizeExpiredTerminations() {
        const query = `
            UPDATE partner_applications
            SET status = 'terminated',
                terminated_at = COALESCE(terminated_at, NOW())
            WHERE status = 'termination_notice'
              AND termination_deadline IS NOT NULL
              AND termination_deadline <= NOW()
        `;
        await pool.query(query);
    }

    /**
     * Update application status
     * @param {number} id - Application ID
     * @param {string} status - New status
     * @param {Object} options - Extra update fields
     * @returns {Object} - Updated record
     */
    static async updateStatus(id, status, options = {}) {
        const { terminationReason = null } = options;

        let query = '';
        let values = [];

        if (status === 'termination_notice') {
            query = `
                UPDATE partner_applications
                SET status = $1,
                    termination_reason = $2,
                    termination_notice_sent_at = NOW(),
                    termination_deadline = NOW() + INTERVAL '14 days',
                    terminated_at = NULL
                WHERE id = $3
                RETURNING *
            `;
            values = [status, terminationReason, id];
        } else if (status === 'terminated') {
            query = `
                UPDATE partner_applications
                SET status = $1,
                    terminated_at = NOW()
                WHERE id = $2
                RETURNING *
            `;
            values = [status, id];
        } else {
            query = `
                UPDATE partner_applications
                SET status = $1,
                    termination_reason = NULL,
                    termination_notice_sent_at = NULL,
                    termination_deadline = NULL,
                    terminated_at = NULL
                WHERE id = $2
                RETURNING *
            `;
            values = [status, id];
        }

        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}

export default PartnerModel;
