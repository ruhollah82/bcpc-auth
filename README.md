# BCPC Auth - React Router v7 Application

Welcome to BCPC Auth, a modern React application built with React Router v7, Zustand for state management, and TailwindCSS for styling. This project provides a robust foundation for authentication flows, including login and registration.

## Table of Contents

- [BCPC Auth - React Router v7 Application](#bcpc-auth---react-router-v7-application)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Cloning the Repository](#cloning-the-repository)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
  - [Project Structure](#project-structure)
  - [Adding New Modules/Features](#adding-new-modulesfeatures)
  - [Contributing](#contributing)
  - [Styling](#styling)
  - [Deployment](#deployment)
    - [Docker Deployment](#docker-deployment)
    - [DIY Deployment](#diy-deployment)

## Features

- 🚀 **Client-Side Routing**: Powered by React Router v7 for seamless navigation.
- 🔑 **Authentication**: Implemented with Zustand for client-side state management (login/registration).
- 🎨 **Styling**: Utilizes TailwindCSS for a utility-first CSS approach.
- ⚡️ **Fast Development**: Vite for a lightning-fast development experience.
- 🔒 **TypeScript**: Ensures type safety and improves code quality.
- 🔄 **Hot Module Replacement (HMR)**: For a smooth development workflow.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [pnpm](https://pnpm.io/installation) (a fast, disk space efficient package manager)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Cloning the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/ruhollah82/bcpc-auth.git
cd bcpc-auth
```

### Installation

Install the project dependencies using pnpm:

```bash
pnpm install
```

### Running the Application

Start the development server with HMR:

```bash
pnpm run dev
```

Your application will be available at `http://localhost:5173`.

## Project Structure

The project follows a clear and modular structure to enhance maintainability and scalability:

```
bcpc-auth/
├── public/                 # Static assets
├── app/
│   ├── components/         # Reusable UI components (e.g., forms, buttons)
│   │   ├── forms/
│   │   └── ui/
│   ├── layouts/            # Layout components for different sections of the app
│   ├── lib/                # Utility functions, API services, and helpers
│   ├── routes/             # Route components and their associated logic
│   │   ├── auth/           # Authentication-related routes (login, register)
│   │   ├── dashboard/      # Authenticated dashboard routes
│   │   └── ...             # Other application routes
│   ├── store/              # Zustand stores for global state management
│   ├── app.css             # Global styles
│   ├── root.tsx            # Main application root component
│   └── routes.ts           # Centralized route configuration for React Router
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies and scripts
├── pnpm-lock.yaml          # pnpm lock file
└── README.md               # Project documentation (this file)
```

- **`app/routes/`**: This directory is crucial for defining your application's pages. Each file within this directory (or its subdirectories) that exports a default React component can be mapped to a URL path.
- **`app/routes.ts`**: This file explicitly defines the mapping between URL paths and your route components. This is where you configure how React Router navigates through your application.
- **`app/store/`**: Contains your Zustand stores. Each store manages a specific slice of your application's global state.

## Adding New Modules/Features

To add a new feature or module, follow these general steps:

1.  **Create Route Components**: For new pages, create a new `.tsx` file in the `app/routes/` directory (or a relevant subdirectory like `app/routes/products/`). Export your React component as the default export.

    ```typescript
    // app/routes/products/index.tsx
    import React from "react";

    export default function ProductsPage() {
      return (
        <div>
          <h1>Products</h1>
          <p>Welcome to the products page!</p>
        </div>
      );
    }
    ```

2.  **Define the Route in `app/routes.ts`**: Open `app/routes.ts` and add a new `route` entry that maps a URL path to your new component.

    ```typescript
    // app/routes.ts
    import { type RouteConfig, index, route } from "@react-router/dev/routes";

    export default [
      index("routes/home.tsx"),
      route("auth/login", "routes/auth/login.tsx"),
      route("auth/register", "routes/auth/register.tsx"),
      route("dashboard", "routes/dashboard/index.tsx"),
      route("products", "routes/products/index.tsx"), // Your new route
    ] satisfies RouteConfig;
    ```

3.  **Create Reusable Components**: If your feature requires new UI elements, create them in `app/components/` (e.g., `app/components/products/ProductCard.tsx`).

4.  **Manage State with Zustand**: For global state related to your feature, create a new store file in `app/store/` (e.g., `app/store/product.store.ts`).

5.  **Add Utility Functions/API Calls**: Place any helper functions or API service integrations in `app/lib/`.

## Contributing

We welcome contributions to BCPC Auth! To contribute:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t bcpc-auth-app .

# Run the container
docker run -p 3000:3000 bcpc-auth-app
```

The containerized application can be deployed to any platform that supports Docker.

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.
Make sure to deploy the output of `pnpm run build`.

```
├── package.json
├── pnpm-lock.yaml
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

---

Built with ❤️.
