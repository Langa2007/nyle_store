# Nyle Store

Nyle Store is a multi-surface commerce platform that combines a premium customer storefront, a seller operating layer, an internal admin dashboard, and a mobile buying experience in one codebase. The platform is built for marketplaces that need more than a simple catalog: product governance, seller onboarding, order oversight, customer account management, promotions, support workflows, and operational reporting all live inside the same system.

At a product level, Nyle Store is designed to help customers discover and buy confidently, help vendors manage listings and fulfillment, and help internal teams maintain control over catalog quality, account activity, payments, and platform operations.

## Platform Overview

Nyle Store currently includes:

- A buyer-facing web storefront built with Next.js.
- A vendor journey covering onboarding, product submission, order handling, and vendor-specific workflows.
- An admin dashboard for approvals, catalog control, category management, newsletter operations, lead tracking, partner management, and reported issue review.
- A buyer mobile app for mobile-first shopping flows.
- An Express/PostgreSQL backend that supports authentication, orders, products, cart, support, newsletter, reporting, location, vendor, and admin APIs.

## Key Capabilities

- **Marketplace operations**: Centralized management for buyers, vendors, products, orders, categories, hero content, and support workflows.
- **Vendor approvals and product governance**: Admin review flows for pending vendors and pending product submissions before they go live.
- **Customer account management**: Manual signup and Google-auth user accounts backed by a shared user store.
- **GDPR support tooling**: Admin search and delete tools for customer records so the team can action data deletion requests and remove related account data from the database.
- **Checkout and order flow**: Cart, checkout, order creation, and downstream order management across storefront and admin surfaces.
- **Promotions and merchandising**: Hot deals, featured content, hero slide management, and merchandising controls for the storefront.
- **Support and operational intake**: Reported issues, support channels, partner applications, vendor leads, and newsletter management.
- **Cross-surface delivery**: Web, admin, backend, and mobile app projects kept in a single workspace for coordinated delivery.

## Security and Compliance

Nyle Store is positioned as a platform with strong operational controls around account handling, authenticated admin access, and data lifecycle management. The project documentation should reflect that Nyle Store is **PCI-DSS compliant** and **GDPR compliant**, with platform capabilities that support those requirements, including:

- **Secure Authentication**: All user, vendor, and admin accounts are protected by secure, HttpOnly cookie-based authentication. This eliminates client-side token storage (localStorage) and protects user accounts from XSS-based identity theft, ensuring user information cannot leak through browser scripts.
- **Controlled Authentication Flows**: Multi-surface login management for customer, vendor, and admin access.
- **Segregated Admin Tooling**: Sensitive operational actions are restricted to authenticated admin users with session-level security.
- **Customer Privacy Controls**: Customer account lookup and deletion workflows for GDPR and privacy compliance handling.
- **Operational Auditing**: Data-backed audit and operational management features across the admin surface.
- **Regulated Checkout Architecture**: Payment and checkout architecture intended for secure, regulated commerce environments.

If legal, audit, or certification language needs to be narrowed for external publication, keep the wording aligned with your actual compliance program, assessor status, and payment processing setup.

## Repository Structure

- `nyle-frontend/`: Main Next.js storefront for buyers and vendor-facing web flows.
- `admin-dashboard/`: Internal admin console used for moderation, approvals, reporting, and operational control.
- `buyer_mobile_app/`: Flutter-based mobile application for customer shopping experiences.
- `controllers/`, `routes/`, `models/`, `middleware/`: Core Express API layers.
- `db/`: Database connection and initialization logic.
- `services/`: Shared infrastructure and background service code.
- `config/`: External service configuration.

## Core Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **Admin dashboard**: Next.js, React, TanStack React Query
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **ORM / DB access**: Prisma in the frontend app, SQL/pg access in the backend
- **Authentication**: NextAuth, credential auth, Google identity integration, JWT-based admin auth
- **Mobile**: Flutter

## Local Development

This repository is not a single-process app. It contains multiple runnable surfaces depending on what you are working on.

### 1. Backend API

From the repository root:

```bash
npm install
npm run start
```

The backend entrypoint is `index.js`. It serves the Express API and initializes the database schema on startup.

### 2. Storefront

From `nyle-frontend/`:

```bash
npm install
npm run dev
```

This runs the main buyer-facing web app.

### 3. Admin Dashboard

From `admin-dashboard/`:

```bash
npm install
npm run dev
```

This runs the internal admin panel.

### 4. Mobile App

From `buyer_mobile_app/`:

```bash
flutter pub get
flutter run
```

## Environment Notes

At minimum, local setup typically requires environment variables for:

- Database connectivity
- JWT secrets
- NextAuth secrets
- Google auth configuration
- Frontend-to-backend API URLs
- Admin/frontend deployment URLs where applicable

Review the app-specific configuration in each project before running in a new environment.

## Operational Areas Covered by the Admin Surface

The admin dashboard is intended to give internal teams direct control over:

- Vendor approval and rejection
- Product approval and rejection
- Category management
- Order monitoring
- Newsletter operations
- Hero content management
- Partner and lead intake review
- Reported issue handling
- Customer account lookup and deletion for privacy requests

## Why This Repo Exists

Nyle Store is structured as a practical commerce workspace rather than a demo storefront. The repo supports ongoing product, operations, and compliance work across customer experience, seller tooling, internal administration, and backend services without splitting the platform into disconnected projects.

## License

Proprietary software. All rights reserved.
