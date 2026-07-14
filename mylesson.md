Architecture
The app follows a layered backend architecture.
HTTP Request
  -> Route
  -> Validation Middleware
  -> Controller
  -> Service
  -> Repository
  -> Database
Each layer has a specific responsibility.
Routes
Routes define endpoint paths and attach middleware.
Example:
POST /api/links
GET /api/links/:shortCode
GET /:shortCode
Routes should not contain business logic.
Validation Middleware
Validation happens before controller logic using Zod schemas.
This protects the service from invalid request data.
Controllers
Controllers translate HTTP requests into service calls.
They should stay thin.
They know about:
request body
request params
response status codes
response shape
They should not know database details.
Services
Services contain business logic.
For TinyLink, the service layer handles:
short code generation
collision retry
finding links
resolving redirects
incrementing click counts
Repositories
Repositories own database access.
They contain SQL queries and return typed records.
They should not know anything about Express, HTTP, or response codes.
Database
SQLite is used locally to keep setup simple.
The database table is created during startup by runMigrations().
Data Model
The links table stores:
id
short_code
original_url
click_count
created_at
Schema:
CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  short_code TEXT NOT NULL UNIQUE,
  original_url TEXT NOT NULL,
  click_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
API Endpoints
Health Check
GET /health
Response:
{
  "data": {
    "status": "ok"
  }
}
Create Short Link
POST /api/links
Content-Type: application/json
Request body:
{
  "url": "https://example.com"
}
Response:
{
  "data": {
    "shortCode": "abc1234",
    "shortUrl": "http://localhost:3000/abc1234",
    "originalUrl": "https://example.com"
  }
}
Get Link Metadata
GET /api/links/:shortCode
Response:
{
  "data": {
    "shortCode": "abc1234",
    "originalUrl": "https://example.com",
    "clickCount": 1,
    "createdAt": "2026-07-14 07:52:51"
  }
}
Redirect To Original URL
GET /:shortCode
Response:
302 Found
Location: https://example.com
Running Locally
Install dependencies:
npm install
Start the dev server:
npm run dev
The app runs at:
http://localhost:3000
Useful Commands
Type-check the code:
npm run typecheck
Build the project:
npm run build
Run compiled JavaScript:
npm start
Manual Testing
Health check:
curl http://localhost:3000/health
Create a short link:
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
Redirect:
curl -i http://localhost:3000/YOUR_SHORT_CODE
Inspect metadata:
curl http://localhost:3000/api/links/YOUR_SHORT_CODE
Important Backend Concepts In This Codebase
Why validate requests?
External input cannot be trusted.
Zod validates request bodies and route params before the controller runs.
This keeps the rest of the application working with known-good data.
Why separate controller, service, and repository?
Because each layer changes for different reasons.
Controllers change when the API changes.
Services change when business rules change.
Repositories change when the database changes.
Keeping them separate makes the code easier to test, debug, and extend.
Why use an AppError class?
Expected errors should produce clean API responses.
For example:
Short link not found -> 404
Invalid request body -> 400
Unexpected errors should become generic 500 Internal server error responses.
Why retry short code generation?
Short codes must be unique.
Even though Nanoid collisions are unlikely, production code handles unlikely failures deliberately.
Why increment click count during redirect?
The redirect endpoint is the moment a short link is actually used.
So the app updates analytics before sending the user to the original URL.
In larger systems, this could be moved to an async queue to keep redirects faster.
Current Limitations
This is intentionally small. It does not yet include:
authentication
rate limiting
Redis caching
Postgres
Docker
automated tests
OpenAPI docs
distributed analytics
background workers
Good Next Improvements
The best next steps are:
Add integration tests with Vitest or Jest.
Replace SQLite with Postgres.
Add Docker Compose.
Add Redis cache for short code lookups.
Add rate limiting to protect POST /api/links.
Add request IDs for tracing.
Add OpenAPI documentation.
Move click tracking into an async event queue.
System Design Notes
A URL shortener has two main paths.
Write Path
Client
  -> POST /api/links
  -> validate URL
  -> generate short code
  -> store in database
  -> return short URL
Read Path
Client
  -> GET /:shortCode
  -> find original URL
  -> increment click count
  -> redirect
In real systems, read traffic is usually much higher than write traffic.
A future scalable version might look like:
Client
  -> API
  -> Redis cache
  -> Database
Click tracking could become:
Redirect API
  -> publish click event
  -> queue
  -> analytics worker
  -> analytics database
Learning Goal
After building this project, you should be able to explain:
how REST APIs are structured
how request validation works
how backend layers communicate
why service and repository layers exist
how redirects work
how data is persisted
how small systems can evolve into scalable systems