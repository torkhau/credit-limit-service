# 💳 Capacity & Credit Limit Management Service

A full-stack application for managing program capacity, multi-currency fund reservations, and limit constraints.

---

## 🎯 Project Scope & Architecture Note

> **Main Focus — Backend:**  
> The primary purpose of this project is to showcase **backend engineering capabilities** using **NestJS** (custom DTO validation, context-aware `AuthGuard`, multi-currency logic, and precise financial math, and async message processing with **Kafka**).
>
> **Client & In-Memory Storage:**
>
> - **React Frontend:** Built solely as a lightweight testing client to interact with the API without requiring tools like Postman.
> - **In-Memory Storage:** An `InMemoryRepository` is deliberately used to keep the project lightweight, fast, and easy to run locally without external database dependencies.
> - **Static Currency Rates:** Supported currencies and exchange rates are hardcoded directly into the application constants for simplicity and predictable testing execution.

---

## 🛠 Tech Stack

- **Backend:** NestJS (HTTP REST & Kafka Microservice), TypeScript, `kafkajs`, `class-validator`, `class-transformer`
- **Frontend:** React 19, Vite, TypeScript
- **Infrastructure:** Apache Kafka (KRaft mode via Docker Compose)

---

## 💱 Supported Currencies & Rates

The system uses `USD` as the base currency. Multi-currency conversions are processed using predefined exchange rates:

| Currency | Rate relative to USD  |
| -------- | --------------------- |
| **USD**  | `1.0` (Base Currency) |
| **EUR**  | `0.85`                |
| **GBP**  | `0.75`                |
| **PLN**  | `3.80`                |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 20.x`
- **npm** `>= 10.x`
- **Docker & Docker Compose** (required for running Apache Kafka broker)

### 1. Installation

Install dependencies for both client and server applications:

```bash
# Install frontend dependencies
cd client
npm install
cd ..

# Install backend dependencies
npm install
```

### 2. Build & Run

To build the React client into static assets and compile the NestJS backend together:

```bash
# Build the client into static assets and compile NestJS
npm run build

# Start the NestJS server
npm run start
```
ℹ️ Note: The `npm run start` command automatically executes `docker compose up -d --wait` to ensure the Kafka broker is healthy and the `totalCapacity-reconciliation` topic is initialized before NestJS connects.

Once started, open `http://localhost:3000` in your browser. NestJS serves both the static React client interface and the REST API endpoints.

### 3. Development Mode (Optional)

If you prefer hot-reloading during development:

```bash
# 1. Start Kafka infrastructure (run once in background)
npm run kafka

# 2. Start NestJS backend in watch mode
npm run start:dev

# 3. Start React client in dev mode (in a separate terminal)
cd client
npm run dev
```
---

## 🔄 Kafka Event Integration

The service consumes events from Apache Kafka for total capacity reconciliation and management.

- **Broker Address:** `localhost:9092`
- **Consumer Group:** `capacity-service-consumer`
- **Topic:** `totalCapacity-reconciliation`

### Testing Kafka Message Ingestion

You can test event consumption by firing a test event using the included test script:

```bash
npm run kafka:test
```

---

## 🔑 Authentication

Protected endpoints require a Bearer Token with the `-tkn` suffix:

```http
Authorization: Bearer <user_id>-tkn
```

_Example:_ `Authorization: Bearer user123-tkn` (where `user123` is extracted as the `userId`).

---

## 📡 API Endpoints

Base URL: `http://localhost:3000/api/v1/capacity`

| Method | Endpoint                | Description                                  | Auth Required |
| ------ | ----------------------- | -------------------------------------------- | ------------- |
| GET    | /                       | Fetch capacity metrics & active reservations | YES           |
| POST   | /reserve                | Reserve capacity in a specified currency     | YES           |
| POST   | /release/:reservationId | Release an active reservation by ID          | YES           |

### Sample Payload (`POST /reserve`):

```json
{
  "amount": "100.50",
  "currency": "EUR"
}
```
