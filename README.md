# Minor Project 04 — To-Do App + Notes App

A beginner-friendly React project containing two small productivity tools in one responsive website. It was built to practise functional components, JSX, props, `useState`, `useEffect`, event handling, conditional rendering, and JavaScript array methods.

## Features

### To-Do App
- Add tasks, edit them, delete them, and mark them complete.
- See whether each task is Pending or Completed.
- Filter by All, Pending, or Completed.
- Add an optional due date.
- Keep tasks after refreshing the page using `localStorage`.
- Responsive layout and task counts.

### Notes App
- Create, edit, and delete notes.
- Search note titles and note text.
- Add a category to each note.
- Show when a note was created or last updated.
- Save notes in `localStorage`.
- Responsive card layout.

## Technologies
- React 18
- Vite
- JavaScript (ES6+)
- JSX
- CSS
- Lucide React icons

## Folder structure

```text
minor-project-04/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── components/
    │   ├── Sidebar.jsx
    │   ├── TodoApp.jsx
    │   ├── TaskForm.jsx
    │   ├── TaskItem.jsx
    │   ├── TaskList.jsx
    │   ├── NotesApp.jsx
    │   ├── NoteForm.jsx
    │   └── NoteCard.jsx
    └── utils/
        └── storage.js
```

## Run in VS Code

1. Install Node.js (the LTS version) from https://nodejs.org/.
2. Extract the downloaded ZIP file.
3. Open VS Code and choose **File → Open Folder**. Select the `minor-project-04` folder.
4. Open **Terminal → New Terminal**.
5. Run `npm install` and wait for it to finish.
6. Run `npm run dev`.
7. Open the local URL shown in the terminal, usually `http://localhost:5173`.
8. To stop the app, click the terminal and press `Ctrl + C`.

## Build check

Run `npm run build`. Vite creates a production build in the `dist` folder.

## Upload to GitHub

1. Sign in at https://github.com/ and create a new repository, for example `minor-project-04`.
2. In VS Code, open the terminal inside this project folder.
3. Run these commands one by one (replace the URL with your own repository URL):

```bash
git init
git add .
git commit -m "Build To-Do and Notes React apps"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/minor-project-04.git
git push -u origin main
```

If Git asks you to identify yourself, configure your name and email:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

If you already created a Git repository in this folder, do not run `git init` or add a second remote. Check it first with `git status` and `git remote -v`.

## Submit

Copy the public GitHub repository URL and paste it into the Minor Project 04 submission form in your learning platform. Follow the submission path described in your project PDF: **My Course → Main Program → Modules → Minor Project → Minor Project 04 → Minor Project Submission Link**.

## How the React concepts are used

- **Functional components:** each screen and repeated item has its own component.
- **Props:** the parent passes task/note data and callbacks to child components.
- **`useState`:** stores the current tasks, notes, filters, search, and form values.
- **`useEffect`:** saves task and note changes to `localStorage`.
- **Conditional rendering:** displays helpful empty states and changes button labels while editing.
- **`.map()`:** displays task and note cards.
- **`.filter()`:** filters tasks and searches notes.
- **`.find()`:** locates the task or note being edited.
- **Spread operator:** updates one object without replacing its other properties.

## Notes
- Data is stored in this browser on this device. Clearing browser site data will remove it.
- This project does not require an API key or a backend.
- Read through each component and make small changes so you can confidently explain the code during evaluation.
