<!-- PROJECT LOGO -->
<p align="center">
  <img src="https://sora.chatgpt.com/g/gen_01jy1y53p6f8bbzjj6hgvxrqj4" alt="Twitter Influencer Backend Logo" width="400"/>
</p>

<h1 align="center">Twitter Influencer Backend</h1>

<p align="center">
  <b>Automate Twitter threads about history and geography using Grok AI and Clean Architecture.</b><br/>
  <a href="https://github.com/aepel/virtual-x-influencer"><strong>View on GitHub »</strong></a>
  <br/>
  <br/>
  <a href="#features">Features</a>
  ·
  <a href="#quick-start">Quick Start</a>
  ·
  <a href="#api-endpoints">API</a>
  ·
  <a href="#contributing">Contributing</a>
  ·
  <a href="#license">License</a>
</p>

<p align="center">
  <a href="https://github.com/aepel/virtual-x-influencer/actions"><img src="https://img.shields.io/github/actions/workflow/status/aepel/virtual-x-influencer/ci.yml?branch=main" alt="Build Status"></a>
  <a href="https://github.com/aepel/virtual-x-influencer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aepel/virtual-x-influencer.svg" alt="License"></a>
  <a href="https://github.com/aepel/virtual-x-influencer/stargazers"><img src="https://img.shields.io/github/stars/aepel/virtual-x-influencer.svg" alt="Stars"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg" alt="Node.js"></a>
</p>

---

## Table of Contents
- [About](#about)
- [Features](#features)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Configuration](#configuration)
- [Development](#development)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## About

**Twitter Influencer Backend** is a modern, open-source backend for automating the creation and publishing of Twitter threads about history and geography facts. It leverages the Grok API for content generation, follows Clean Architecture and SOLID principles, and uses Prisma ORM for database abstraction.

---

## Features

- 🚀 **Automated Content Generation**: Uses Grok AI to generate engaging, factual Twitter threads.
- 🕒 **Scheduled Posting**: Auto-schedules and publishes threads 3 times per day.
- 🧠 **Duplicate Prevention**: Tracks posted content to avoid repetition within the same month.
- 🏗️ **Clean Architecture**: Decoupled layers, SOLID principles, and testable code.
- 🗃️ **Prisma ORM**: Database abstraction with type safety.
- 🛡️ **Open Source**: MIT licensed and ready for contributions.

---

## Architecture

- **Domain Layer**: Entities, repository interfaces, and domain services.
- **Application Layer**: Use cases and business logic.
- **Infrastructure Layer**: Database implementations, external service integrations.
- **Presentation Layer**: Controllers and HTTP endpoints.

---

## Quick Start

### Prerequisites
- **Node.js 22+** (Latest LTS recommended)
- Yarn or npm
- Grok API access
- Twitter API access (for production)

### Installation
```bash
git clone https://github.com/aepel/virtual-x-influencer.git
cd virtual-x-influencer
yarn install
cp .env.example .env
```
Edit `.env` with your credentials.

### Database Setup
```bash
yarn prisma:generate
yarn prisma:migrate
yarn db:seed
```

### Run the App
```bash
yarn start:dev
```

---

## API Endpoints

### Create a Thread
```http
POST /threads
Content-Type: application/json
{
  "topicId": "topic-uuid",
  "threadSize": 7
}
```

### Publish a Thread
```http
POST /threads/{threadId}/publish
```

### Schedule Threads
```http
POST /threads/schedule
Content-Type: application/json
{
  "postingTimes": ["09:00", "14:00", "19:00"],
  "threadSize": 7
}
```

---

## Usage

- **Manual Thread Creation**: Use the API to create and publish threads for specific topics.
- **Automated Scheduling**: The system schedules and publishes threads at configured times every day.

---

## Configuration

Edit your `.env` file:
```env
DATABASE_URL="file:./dev.db"
GROK_API_URL="https://api.x.ai/v1"
GROK_API_KEY="your-grok-api-key"
TWITTER_API_KEY="your-twitter-api-key"
TWITTER_API_SECRET="your-twitter-api-secret"
TWITTER_ACCESS_TOKEN="your-twitter-access-token"
TWITTER_ACCESS_TOKEN_SECRET="your-twitter-access-token-secret"
NODE_ENV="development"
PORT=3000
POSTING_TIMES="09:00,14:00,19:00"
THREAD_SIZE=7
```

---

## Development

- **Testing**: `yarn test` and `yarn test:e2e`
- **Linting**: `yarn lint`
- **Formatting**: `yarn format`
- **Prisma Studio**: `yarn prisma:studio`

---

## Contributing

Contributions are welcome! Please:
- Open issues for bugs or feature requests.
- Fork the repo and submit a pull request.
- Follow the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).
- Write tests for new features.
- Keep documentation up to date.

---

## Security

If you discover a security vulnerability, please open an issue or contact the maintainers directly. Responsible disclosure is appreciated.

---

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

This project is licensed under the MIT License.

---

## Acknowledgements

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Grok API](https://x.ai/)
- [Twitter API](https://developer.twitter.com/)
- [Contributor Covenant](https://www.contributor-covenant.org/)

---

<p align="center">
  <i>Made with ❤️ by the open source community.</i>
</p>

---

## Author & Copyright

Copyright © 2025 Ariel Epelman (<arielepelman@gmail.com>)
