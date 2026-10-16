# React To-Do App

A simple To-Do application built with React and Next.js to practice component-based UI development, state management, event handling, and browser storage.

## Features

- Add new tasks
- Mark tasks as completed
- Edit existing tasks
- Delete tasks
- Display completed and total task counts
- Persist tasks in browser `localStorage`

## Tech Stack

- React
- Next.js
- JavaScript
- JSX
- HTML and CSS
- Browser `localStorage`

## Getting Started

### 1. Create the project

Create a Next.js application:

```bash
npx create-next-app@latest todo-app
```

### 2. Enter the project directory

```bash
cd todo-app
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL shown in your terminal to view the app.

## Project Structure

The app is organized into reusable components:

- **`Header.jsx`** — Displays the app header.
- **`TODOHero.jsx`** — Displays task statistics, such as completed and total tasks.
- **`Form.jsx`** — Provides the form for adding a task.
- **`TODOList.jsx`** — Renders the list of tasks.
- **`page.js`** — Brings the components together and manages the main To-Do state.

The exact file structure may vary depending on how the Next.js project was created.

## How It Works

### 1. Components and Props

The app uses separate components to keep the interface organized and reusable.

Props allow a parent component to pass data to a child component. For example:

- `TODOHero` receives the completed-task count and total-task count.
- `TODOList` receives the array of tasks.
- `Form` receives a state-update function so it can add a task to the parent component's state.

A child component can only access the props it receives. If a deeper component needs data, that data or a callback can be passed down through intermediate components. This is known as **prop drilling**.

Props are commonly accessed in either of these ways:

```jsx
function Example({ title }) {
  return <h2>{title}</h2>;
}
```

Or:

```jsx
function Example(props) {
  return <h2>{props.title}</h2>;
}
```

### 2. Rendering the Task List

The app uses JavaScript's `map()` method to render each task as a component.

```jsx
todos?.map((item) => (
  <Item key={item.id} item={item} />
))
```

- `map()` creates a new array by running a function for each array item.
- `key={item.id}` gives React a stable identifier for each rendered item.
- Optional chaining (`?.`) prevents the expression from trying to call `map()` when `todos` is `null` or `undefined`.

Conditional rendering determines whether to show the task list or an empty-state message.

### 3. Managing State with `useState`

React's `useState` Hook stores component state and lets React re-render the UI when that state changes.

```jsx
const [todos, setTodos] = useState([]);
```

- `todos` is the current state value.
- `setTodos` is the function used to update that state.
- `[]` is the initial value: an empty array.

In this app, each task is represented by an object similar to this:

```js
{
  title: "Some task",
  id: self.crypto.randomUUID(),
  is_completed: false
}
```

Each object contains the task title, a unique ID, and a Boolean indicating whether the task is completed.

Because the main task state is managed in `page.js`, it can be passed to child components through props. This is often called **lifting state up**: state is kept in a common parent so multiple components can use or update it.

In Next.js, components that use client-side React features such as `useState`, event handlers, or browser APIs need to be Client Components. Add the directive below at the top of the relevant file:

```jsx
"use client";
```

### 4. Adding a Task

When the form is submitted, the submit handler reads the entered task, prevents the browser's default form submission, and resets the form.

A new task can be added with a functional state update:

```jsx
setTodos((prevTodos) => [
  ...prevTodos,
  {
    title: value,
    id: self.crypto.randomUUID(),
    is_completed: false
  }
]);
```

- `prevTodos` represents the previous state.
- The spread operator (`...prevTodos`) copies the existing tasks into a new array.
- The new task object is appended to the array.

This approach creates a new array rather than mutating the existing state.

### 5. Showing Task Counts

The total task count is the length of the `todos` array. The completed-task count can be calculated with `filter()`:

```js
const totalTodos = todos.length;
const completedTodos = todos.filter(
  (todo) => todo.is_completed
).length;
```

`filter()` returns a new array containing only the tasks that pass the condition. The original array remains unchanged.

### 6. Marking a Task as Completed

When a user clicks the completion button, the app identifies the selected task and updates its `is_completed` value.

The UI can then show the task as completed—for example, by adding a strike-through to its title and changing the adjacent SVG icon's appearance. The completed-task count updates as well.

### 7. Editing a Task

When the user clicks the edit button, the task display can be replaced with an editing form. Submitting the form updates the selected task's title in state.

### 8. Deleting a Task

When the delete button is clicked, the app removes the selected task by filtering it out of the `todos` array and updating state.

### 9. Saving Tasks with `localStorage`

The app uses browser `localStorage` to keep tasks available after a page refresh in the same browser.

`localStorage` stores **strings**, so an array of task objects must be converted to JSON before saving:

```js
localStorage.setItem("todos", JSON.stringify(todos));
```

The stored string can be converted back into JavaScript data with `JSON.parse()` after retrieving it:

```js
const savedTodos = localStorage.getItem("todos");
const todos = savedTodos ? JSON.parse(savedTodos) : [];
```

`localStorage` is browser-specific, so this data is not automatically shared across devices or browsers. It is suitable for a small practice app, while a database and backend would be more appropriate for cross-device persistence.

In a Next.js app, access `localStorage` only in the browser—not during server rendering. A client-side effect is a common way to load and save persisted data.

## CRUD Operations

This project practices the four basic CRUD operations:

- **Create** — Add a task
- **Read** — Display saved tasks
- **Update** — Edit a task or mark it as completed
- **Delete** — Remove a task

## Key Learnings

While building this app, I practiced:

1. Building reusable React components
2. Passing data and callbacks through props
3. Understanding prop drilling and lifting state up
4. Managing state with `useState`
5. Handling form submissions and click events
6. Rendering arrays with `map()` and conditional UI
7. Filtering arrays with `filter()`
8. Updating state without mutating existing arrays
9. Generating unique IDs with `crypto.randomUUID()`
10. Saving and retrieving data with `localStorage`
11. Converting JavaScript data to and from JSON with `JSON.stringify()` and `JSON.parse()`
12. Using SVG elements for icons and visual indicators
13. Understanding when a Next.js component needs `"use client"`

## Future Improvements

- Add task filtering (All, Active, Completed)
- Add due dates and priorities
- Improve accessibility and keyboard navigation
- Add a backend and database for cross-device persistence

---

Built as a hands-on project to strengthen my React and Next.js fundamentals.
