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
git clone https://github.com/VivaanPathak/library_management_api_taski.git
cd library_management_api_taski

## Run project
npm install
npm start

## Example API requests (via cURL or Postman)

to create author
curl -X POST http://localhost:3000/api/authors \
 -H "Content-Type: application/json" \
 -d '{"name":"test name", "Description":"English writer"}'


to create books //give author id in place of "<AUTHOR_ID> which you get after creating author from previous curl or any valid authorid if you created any author
curl -X POST http://localhost:3000/api/books \
 -H "Content-Type: application/json" \
 -d '{"title":"Test book","author":"<AUTHOR_ID>","summary":"A fantasy novel","publishedDate":"1937-09-21","pages":310}'

to get pagination
curl "http://localhost:3000/api/books?page=1&limit=5"

to search author by name in place of <name> put author name 
curl "http://localhost:3000/api/books/search?q=<name>"

to update book in place of <BOOK_ID> give valid bookid
curl -X PUT http://localhost:3000/api/books/<BOOK_ID> \
 -H "Content-Type: application/json" \
 -d '{"pages": 320}'

# to delete books in place of <BOOK_ID> give valid bookid
curl -X DELETE http://localhost:3000/api/books/<BOOK_ID>"


##Env
i have directly give env file in code not a good practice but for sample i have put it so that you can directly use it





