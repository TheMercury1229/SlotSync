
# SlotSync

SlotSync is a modern, lightweight meeting scheduling app similar to Calendly, built with **Next.js** and **TypeScript**. It helps users easily schedule meetings and manage appointments with a user-friendly interface. The app integrates powerful tools like **ShadCN UI**, **UploadThing**, **Nylas**, **Auth.js**, and **TailwindCSS** for a sleek and efficient user experience, while also using **Zod** and **Conform** for robust form validation and schema management.

## Table of Contents

- [Introduction](#introduction)
- [Live Link](#live-link)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)


## Introduction

SlotSync streamlines the process of scheduling meetings by allowing users to share their availability and sync their calendars using integrations like **Nylas**. It offers seamless customization and flexibility, giving both users and meeting participants an intuitive experience. SlotSync is designed with a focus on responsiveness, accessibility, and ease of use.

## Live Link

You can access the live version of SlotSync at:

[https://your-deployment-url.com](https://your-deployment-url.com)

## Features

- 📅 **Easy Meeting Scheduling**: Share available time slots with participants to book meetings effortlessly.
- 🔐 **User Authentication**: **Auth.js** provides secure, easy-to-use authentication and session management.
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
- **Auth.js** – User authentication and session management
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
- **AUTH_SECRET**: Secret for managing user authentication (Auth.js)
- **NEXTAUTH_URL**: URL for authentication callbacks (Auth.js)
- **NEXT_PUBLIC_SITE_URL**: URL where the app will be deployed

To configure these, create a `.env` file in the root directory and add the appropriate values:

```env
AUTH_SECRET="your-auth-secret"

AUTH_GITHUB_ID=your-id
AUTH_GITHUB_SECRET=your-api-secret

AUTH_GOOGLE_ID=your-google-id
AUTH_GOOGLE_SECRET=your-google-secret

DATABASE_URL=your-db-url
DIRECT_URL=your-direct-url

NYLAS_API_SECRET_KEY=your-nylas-key
NYLAS_API_URI=your-nylas-uri

NYLAS_CLIENT_ID=your-client-id

NEXT_PUBLIC_URL=http://localhost:3000

UPLOADTHING_TOKEN=your-uploadthing-token
```

## Usage

1. Once the app is running, users can sign in and authenticate via **Auth.js**.
2. After authentication, users can log in and connect their calendar via Nylas.
3. Share available time slots with meeting participants by providing a custom link.
4. Participants can book a meeting by selecting an available slot.
5. Both users and participants receive notifications and calendar updates when a meeting is scheduled.

## Contributing

I welcome contributions to SlotSync! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear commit messages.
4. Open a pull request to the `main` branch.

Please make sure your code follows the existing code style and passes all linting checks.


Feel free to reach out if you have any questions or issues !

##MySocials:

- **Instagram** : [themercury1229](https://www.instagram.com/themercury1229/)
- **Twitter** : [TheMercury1229](https://x.com/TheMercury1229)
- **LinkedIn** : [Hardik Gujrathi](https://www.linkedin.com/in/hardik-gujrathi-b7ba49294/)

