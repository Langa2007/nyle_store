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
        const query = 'SELECT * FROM partner_applications ORDER BY created_at DESC';
        const { rows } = await pool.query(query);
        return rows;
    }

    /**
     * Update application status
     * @param {number} id - Application ID
     * @param {string} status - New status
     * @returns {Object} - Updated record
     */
    static async updateStatus(id, status) {
        const query = 'UPDATE partner_applications SET status = $1 WHERE id = $2 RETURNING *';
        const { rows } = await pool.query(query, [status, id]);
        return rows[0];
    }
}

export default PartnerModel;
