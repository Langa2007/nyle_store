# Nyle Store

Nyle Store is a modern, premium e-commerce platform built with performance, aesthetics, and user experience in mind. It connects buyers with sellers across various categories, offering a robust, scalable marketplace environment.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/) for premium micro-animations
- **Data Fetching & State**: [TanStack React Query](https://tanstack.com/query/latest)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (integrating Google Identity Services & Credentials)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database Provider**: [Neon Serverless Postgres](https://neon.tech/)

## 📂 Project Structure

The workspace is structured as a monorepo-style environment, divided into several key components:

- `nyle-frontend/` - The main Next.js web application for buyers and vendors.
- `admin-dashboard/` - The administrative control panel for platform management and oversight.
- `buyer_mobile_app/` - The mobile application for Nyle Store customers.
- `services/`, `controllers/`, `routes/`, `models/` - Core backend API logic and integrations.

## 🛠️ Key Features

- **Dynamic Cart & Checkout**: Real-time cart synchronization, quantity management, and seamless checkout flows with NylePay integration.
- **Vendor Hub**: Dedicated dashboards for sellers to manage products, orders, fulfillment, and analytics.
- **Premium Aesthetics**: High-end UI design with glassmorphism, responsive layouts, and dynamic visual feedback tailored for both Heavy PC and Lightweight Mobile views.
- **Robust Authentication**: Multi-provider login with session management and protected routing.
- **Hot Deals & Promotions**: Time-sensitive promotional systems with "Grab Deal Now" one-click checkout functionality.
- **Comprehensive Help Center**: Self-service support portal categorized for vendors and buyers.

## 💻 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- A Neon Database or local PostgreSQL instance

### Installation & Setup

1. Navigate to the main frontend directory:
   ```bash
   cd nyle-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables by configuring a `.env` file in the root of the frontend application (ensure your `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXT_PUBLIC_API_URL` are set).

4. Generate the Prisma Client and push the schema:
   ```bash
   npx prisma generate
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📝 License

Proprietary Software. All rights reserved.
