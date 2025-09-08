# expense-management-frontend

A Vue.js/Nuxt.js frontend for the Expense Management System that allows employees to submit expenses and managers to approve them.

## Features

- User Authentication: Login with email/password
- Expense Submission: Submit new expenses with amount, description, and receipt URL
- Expense Dashboard: View personal expense history with status tracking
- Manager Approval: Managers can view and approve/reject pending expenses
- IDR Currency Formatting: Proper Indonesian Rupiah formatting throughout the UI
- Responsive Design: Works on desktop and mobile devices
- Real-time Status Updates: See expense status changes in real-time

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and configure your environment variables
3. Run `docker-compose up -d` to start the database

## Demo Account Login

- Manager: `manager@example.com` / `password`
- Employee: `employee@example.com` / `password`