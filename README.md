# Nuxt 3 Application

A modern, performant web application built with **Nuxt 3**, **Pinia**, and **Tailwind CSS**.

## Technology Stack

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

1. Create a `.env` file in the root directory.
2. Add the following variables (example provided):

```env
NUXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/v1
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
