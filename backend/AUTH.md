# BazaArts backend — Created by Nick Thomas & CoPi

## Authentication

Authentication uses short-lived JWT access tokens and rotating, hashed refresh tokens. The refresh token is issued as an HTTP-only cookie; API clients may also send it in the refresh request body for non-browser clients.

Required environment variables:

- `DATABASE_URL`
- `JWT_SECRET` (at least 16 characters)
- `REFRESH_SECRET` (at least 16 characters)
