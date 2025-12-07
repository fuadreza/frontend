# ProfitMax Frontend

ProfitMax is an AI-assisted Inventory Management System for small and medium businesses optimize inventory operations.

AI helps users to optimize inventory production to maximize profit.

## ProfitMax in Action
On our platform, users can input their inventory data, including product names, prices, and quantities. Our AI then analyzes this data and provides recommendations for optimizing inventory production.

![ProfitMax in Action](docs/assets/demo.gif)

## Main Features

- Inventory Management
- AI Price Recommendations
- AI Product Insights

## Technology Stack

- **AI:** [Kolosal.ai](https://kolosal.ai/) with OpenAI API
- **Framework:** [Nuxt 3](https://nuxt.com/) (Vue 3)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Package Manager:** [pnpm](https://pnpm.io/)

## Setup and Configuration

### Prerequisites

- Node.js (Latest LTS recommended)
- pnpm

### Installation

1. Clone the repository.
2. Install dependencies:

```bash
pnpm install
```

### Environment Variables

This application requires environment variables to be configured.

1. Create a `.env` or copy from `.env.example` into `.env` file in the root directory.
2. Add the following variables (example provided):

```env
NUXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/v1
VITE_KOLOSAL_API_KEY=
```

> [!IMPORTANT]
> Do not commit the `.env` file to version control. It is already included in `.gitignore`.

### Running the Application

Start the development server:

```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`.

## Features

- **Landing Page:** SSG optimized.
- **Authentication:** Simulated login/logout using Pinia.
- **Protected Routes:** Home page requires authentication.
- **AI Analysis:** AI analysis using Kolosal.ai API.
- **AI Price Recommendations:** AI price recommendations using Kolosal.ai API.
- **AI Product Insights:** AI product insights using Kolosal.ai API.
