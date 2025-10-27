# Library Management API

Simple Node.js + Express + MongoDB API for managing authors and books.

## Features
- Create authors and books
- View all books with author details
- Search books by author name (partial, case-insensitive)
- Update and delete books
- Pagination on `/api/books`
- Input validation (express-validator)
- Configurable via `.env`

---

## Requirements
- Node.js (16+ recommended)
- MongoDB (local or Atlas)
- npm

---

## Setup

1. Clone repository
```bash
git clone <repo-url>
cd library-api
