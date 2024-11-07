
# Simple Note-Taking Application

A simple note-taking application built with Laravel for the backend and React.js for the frontend. Users can create, read, update, and delete notes via a RESTful API.

## Requirements

- PHP 8.x or higher
- Composer
- Node.js
- MySQL or any compatible database

## Installation

### Backend (Laravel)

1. Clone the repository:

   git clone <repository-url>
   cd <repository-folder>
  

2. Install Laravel dependencies:
3. 
   composer install
   

4. Copy `.env.example` to `.env` and configure your database settings.

   cp .env.example .env


5. Generate application key:

   php artisan key:generate
   

6. Run migrations and seed the database:

   php artisan migrate:fresh --seed
   

7. Start the Laravel server:

   php artisan serve

   The backend will be available at `http://localhost:8000`.

### Frontend (React)

1. Install Node.js dependencies:

   npm install

2. Start the React development server:

   npm run dev

   The frontend will be available at `http://localhost:3000`.

## Usage

- **Create a Note**: Fill in the title and content, then click "Create Note."
- **Edit a Note**: Modify a note's title or content, then click "Update."
- **Delete a Note**: Click "Delete" to remove a note from the list.
- **View Notes**: Your notes will be displayed on the dashboard.

## API Endpoints

- **GET** `/api/notes`: Get all notes.
- **POST** `/api/notes`: Create a new note (requires `title` and `content`).
- **PUT** `/api/notes/{id}`: Update a note by ID.
- **DELETE** `/api/notes/{id}`: Delete a note by ID.

