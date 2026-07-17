# TinyLink

TinyLink is a production-style TypeScript backend service for shortening URLs.

It lets users create short links, redirect through short codes, and inspect basic link analytics such as click count.

This project was built as a learning-focused backend system, but the codebase follows patterns used in real production teams: typed configuration, request validation, layered architecture, centralized error handling, and repository/service/controller separation.

## What This Project Teaches

TinyLink teaches core backend and system design ideas:

- REST API design
- TypeScript backend development
- request validation
- database persistence
- service-layer business logic
- repository pattern
- centralized error handling
- structured request logging
- startup migrations
- redirect flows
- basic analytics tracking

## Tech Stack

- Node.js
- TypeScript
- Express
- SQLite
- Zod
- Nanoid
- Pino HTTP logger
- tsx for local development

## Features

- Create a short URL from a long URL
- Redirect short codes to original URLs
- Track click counts
- Fetch link metadata
- Validate request bodies and params
- Return consistent error responses
- Run database migrations on startup

## Project Structure

```txt
src/
  app.ts
  server.ts
  config/
    env.ts
  db/
    database.ts
    migrations.ts
  errors/
    AppError.ts
    errorHandler.ts
    notFoundHandler.ts
  features/
    links/
      link.controller.ts
      link.repository.ts
      link.routes.ts
      link.schema.ts
      link.service.ts
      link.types.ts
  middleware/
    requestLogger.ts
    validateRequest.ts
  utils/
    asyncHandler.ts
