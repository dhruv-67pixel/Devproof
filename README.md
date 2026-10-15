# DevProof

A full-stack developer skill and evidence tracker built with **Node.js, Express.js, MongoDB, Mongoose, EJS, and Bootstrap**.

## Features

- Dashboard statistics powered by MongoDB aggregation
- CRUD operations for skills, projects, evidence entries, and bug logs
- Relationships between projects, skills, and evidence
- Evidence verification checkbox
- Bug journal for recording root causes, fixes, and lessons learned
- Form validation using Mongoose schemas
- Responsive dark user interface
- Confirmation prompts before delete actions

## Requirements

- [Node.js](https://nodejs.org/) (LTS recommended)
- MongoDB Community Server running locally, or a MongoDB Atlas connection string
- npm (included with Node.js)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dhruv-67pixel/Devproof.git
cd Devproof
```

Alternatively, download the repository as a ZIP and extract it.

### 2. Install dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to a new file named `.env`.

On Windows Git Bash, run:

```bash
cp .env.example .env
```

Open `.env` and configure your MongoDB connection:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/devproof
PORT=3000
```

If you're using MongoDB Atlas, replace the local MongoDB URI with your Atlas connection string.

### 4. Start MongoDB

Make sure your local MongoDB server is running if you're using the local connection.

### 5. Run the application

```bash
npm run dev
```

Open your browser and visit:

[http://localhost:3000](http://localhost:3000)

## MongoDB Collections

Mongoose creates these collections when documents are first saved:

- `skills`
- `projects`
- `evidence`
- `buglogs`

## How to Use

1. Add your skills in Skill Vault.
2. Create a project in Project Vault.
3. Add evidence and link it to the relevant project and skills.
4. Record bugs, root causes, fixes, and lessons learned.
5. Review your progress using the dashboard statistics.

## Project Structure

```text
DevProof/
├── public/
│   ├── css/
│   └── js/
├── src/
│   ├── models/
│   ├── routes/
│   └── views/
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Future Improvements

- Add text search for bug titles and lessons
- Use MongoDB `$lookup` to report evidence counts per skill
- Add pagination to skills and evidence pages
- Add unique indexes for project names
- Implement authentication and authorization

## Important Notes

- This project is intended for local learning and development. It does not include authentication, so do not expose it publicly as-is.
- Evidence URLs are entered by users and are not automatically verified.
- Deleting a project also deletes its associated evidence. Related bug logs are retained but detached from the deleted project.
- Bootstrap styling is loaded from a CDN, so an internet connection is required for the intended appearance.
- Never commit your `.env` file, database credentials, or other secrets to GitHub.

## Author

**Dhruv**

GitHub: [@dhruv-67pixel](https://github.com/dhruv-67pixel)

---

Built as a hands-on project to practise full-stack web development and MongoDB.



