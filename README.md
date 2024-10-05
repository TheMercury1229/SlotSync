# SlotSync

SlotSync is a modern, lightweight meeting scheduling app similar to Calendly, built with **Next.js** and **TypeScript**. It helps users easily schedule meetings and manage appointments with a user-friendly interface. The app integrates powerful tools like **ShadCN UI**, **UploadThing**, **Nylas**, and **TailwindCSS** for a sleek and efficient user experience, while also using **Zod** and **Conform** for robust form validation and schema management.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

SlotSync streamlines the process of scheduling meetings by allowing users to share their availability and sync their calendars using integrations like **Nylas**. It offers seamless customization and flexibility, giving both users and meeting participants an intuitive experience. SlotSync is designed with a focus on responsiveness, accessibility, and ease of use.

## Features

- 📅 **Easy Meeting Scheduling**: Share available time slots with participants to book meetings effortlessly.
- 🌐 **Calendar Sync**: Integrates with **Nylas** for real-time calendar syncing.
- 🎨 **Customizable UI**: Built with **ShadCN UI** and **TailwindCSS** for a modern, responsive interface.
- 🛠️ **Robust Validation**: **Zod** and **Conform** ensure secure, seamless form validation and schema handling.
- 📁 **File Uploads**: **UploadThing** allows for simple and secure file uploads, enhancing scheduling workflows.
- 🔒 **Secure and Private**: Privacy-first design with secure data handling and encryption.

## Tech Stack

- **Next.js** (TypeScript) – Core framework for building the app
- **ShadCN UI** – Component library for building a modern UI
- **UploadThing** – Simple file upload utility
- **Nylas** – Calendar integration for syncing and managing events
- **Zod** – TypeScript-first schema declaration and validation
- **Conform** – Form validation and submission management
- **TailwindCSS** – Utility-first CSS framework for styling

## Installation

To install and run SlotSync locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/slotsync.git
    ```

2. Navigate to the project directory:

    ```bash
    cd slotsync
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and provide the necessary environment variables (see [Configuration](#configuration)).

5. Run the development server:

    ```bash
    npm run dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Configuration

SlotSync requires several environment variables to connect to external services:

- **NYLAS_CLIENT_ID**: Nylas API client ID
- **NYLAS_CLIENT_SECRET**: Nylas API client secret
- **UPLOADTHING_API_KEY**: API key for UploadThing
- **NEXT_PUBLIC_SITE_URL**: URL where the app will be deployed

To configure these, create a `.env` file in the root directory and add the appropriate values:

```env
NYLAS_CLIENT_ID=your_nylas_client_id
NYLAS_CLIENT_SECRET=your_nylas_client_secret
UPLOADTHING_API_KEY=your_uploadthing_api_key
NEXT_PUBLIC_SITE_URL=https://your-deployment-url.com
