# Notion Task Reporting

This project generates reports on task completion for a team using Notion. The report is generated based on data from a Notion database that tracks tasks performed by the team on different projects.

## Requirements

- Node.js (at least `v18`, need fetch API support)
- Notion API key
- OpenAI GPT API key

## Features

- Retrieve tasks from Notion database using the Notion API (`src/lib/notion/task.ts`).
- Filter tasks by (isTaskDueThisWeek in `src/lib/date/currentWeek.ts`).
- Group tasks by project based on a project property (`src/lib/notion/project.ts`).

- A generic function to retrieve the content of a Notion page, including all children of different types (`src/lib/notion/block.ts`).

- Automatically generate a prompt via tasks (`src/lib/gpt/prompt.ts`).
- Generate a response to the prompt via GPT-3 (`src/lib/gpt/completion.ts`).

- Create a new Notion page with the generated response (`src/lib/notion/page.ts`).

## Usage

1. Clone the repository
2. Install dependencies by running `npm install` or `pnpm install`.
3. Create a `.env` (following `.env.example` keys) file in the root directory and specify your Notion API key and (input and output) database ID and OpenAI GPT API key.
4. Run `npm run start` (`pnpm start`) to generate the report.

## Contributions

Feel free to contribute to the project by opening a pull request.
