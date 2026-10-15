# DevProof

DevProof is a full-stack developer skill evidence tracker built with Node.js, Express, MongoDB, Mongoose, EJS and Bootstrap.

## Features

- Dashboard statistics and MongoDB aggregation
- CRUD for skills, projects, evidence entries and bug logs
- Reference relationships between projects, skills and evidence
- Evidence verification checkbox
- Bug root-cause / fix / lesson journal
- Form validation through Mongoose schemas
- Responsive dark UI
- Confirmation before delete actions

## Requirements

- Node.js (LTS recommended)
- MongoDB Community Server running locally, or a MongoDB Atlas connection string

## Setup on Windows

1. Extract the project ZIP.
2. Open the extracted `devproof` folder in VS Code.
3. Open a terminal in that folder.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Copy `.env.example` to `.env`. In VS Code, you can right-click `.env.example`, duplicate it, and rename the copy to `.env`.
6. Confirm `MONGODB_URI` matches your MongoDB setup. Default:

   ```text
   mongodb://127.0.0.1:27017/devproof
   ```

7. Start the app:

   ```bash
   npm run dev
   ```

8. Visit `http://localhost:3000`.

If `npm run dev` says the script is missing, check that you ran `npm install` from the folder containing `package.json`.

## MongoDB collections

Mongoose creates these collections when the first document is saved:

- `skills`
- `projects`
- `evidence`
- `buglogs`

## First-use workflow

1. Add a few skills in Skill Vault.
2. Add a project in Project Vault.
3. Add evidence and select the project and skills it demonstrates.
4. Add bugs and record root cause, fix and lesson learned.
5. Review dashboard metrics.

## Important notes

- This is a local learning project. It does not include authentication, so do not expose it publicly as-is.
- A proof URL is user-entered and is not automatically verified.
- Deleting a project also deletes evidence attached to that project. Related bug logs are retained but detached from the deleted project.
- The Bootstrap stylesheet is loaded from a CDN, so an internet connection is needed for the intended styling.

## Suggested advanced MongoDB exercises

1. Add a text index to bug titles and lessons and implement bug search.
2. Add a `$lookup` aggregation that reports evidence count per skill.
3. Add pagination to skills and evidence pages.
4. Add a unique index for project names if desired.
5. Add authentication before deploying to the public internet.
