# Multi-Step User Selection App

This project is a multi-step user selection and note-taking application built using React and React Router.

## Setup Instructions

### Prerequisites
Ensure you have Node.js and npm installed. You can check by running:
```sh
node -v
npm -v
```

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd <repo-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Overview
This React app allows users to:
- Select a user from a dropdown (fetched from an API)
- View details of the selected user
- Enter and submit a note
- Navigate through multiple steps smoothly

## Approach
- **React Router** is used for navigation between different steps.
- **React Hooks** (`useState`, `useEffect`) manage component state.
- **Local Storage** is used to persist selected user data.
- **Tailwind CSS** is used for a clean UI with a blue & white theme.

## Challenges Faced
- Managing route navigation and ensuring local storage persists user selection.
- Handling API failures gracefully.
- Styling the UI for a smooth user experience.

## Demo Video
Watch the working demo here: [https://firebasestorage.googleapis.com/v0/b/skedule-ad781.appspot.com/o/React%20App%20(1).webm?alt=media&token=ae39af9c-8a3a-4286-8a88-ad8267f667c9](#) *(Replace with actual link)*
