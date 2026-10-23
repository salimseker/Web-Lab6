# Web-Lab6 - Post Dashboard

A small React app that loads posts from the JSONPlaceholder API and shows them in a list. You can filter the posts by title. It was built with Vite for Assignment 6.

## How to run

```bash
npm install
npm run dev
```

Then open the link that Vite prints in the terminal (usually http://localhost:5173).

## File organization

```
src/
 ├─ api/
 │   └─ postsApi.js
 ├─ components/
 │   ├─ Post.jsx
 │   ├─ PostList.jsx
 │   └─ FilterForm.jsx
 ├─ reducer/
 │   └─ postsReducer.js
 ├─ App.jsx
 ├─ main.jsx
 └─ index.css
```

- **api/postsApi.js** – Has the `fetchPosts` function. It gets the posts with `fetch` and returns the JSON. It throws an error if the response is not ok. It has no React code and no JSX.
- **reducer/postsReducer.js** – The reducer for the async state (`posts`, `loading`, `error`). It handles `FETCH_START`, `FETCH_SUCCESS` and `FETCH_ERROR`. It always returns a new object and never changes the old state.
- **App.jsx** – The main component. It uses `useReducer` for the posts state and `useEffect` to fetch the posts when the page first loads. It also keeps the filter text in `useState` and calculates the filtered posts during render.
- **components/PostList.jsx** – Gets the posts as props and renders one `Post` per item with `.map()`. It shows "No posts found." when the list is empty.
- **components/Post.jsx** – Shows the title and body of one post. It has no state and no effects.
- **components/FilterForm.jsx** – A controlled input for filtering the posts by title. The value comes from App.
- **main.jsx** – Renders `App` into the page.
- **index.css** – Basic styles.

## Challenges I faced

- **Cleaning up the fetch.** At first I did not know how to stop the request when the component unmounts. I used an `AbortController` and called `abort()` in the cleanup function of `useEffect`. I also had to ignore the `AbortError` in the `catch` block. Without that, the app showed an error message even though nothing had really gone wrong. In development, React StrictMode runs the effect twice, so this cleanup is also what cancels the first request.
- **fetch does not fail on 404 or 500.** I thought a bad status code would go to the `catch` block, but `fetch` only fails on network errors. So I check `response.ok` in `postsApi.js` and throw an error myself.
- **Not storing the filtered posts in state.** My first idea was to keep a `filteredPosts` state and update it with `useEffect`. Then I learned that this is derived state. It is simpler to calculate it with `posts.filter(...)` during render, and this way the two lists can never get out of sync.
- **Showing the right state at the right time.** I had to make sure the loading, error and empty messages never show at the same time. One small problem I noticed: the initial state has `loading: false` and the fetch starts after the first render, so "No posts found." can flash for a very short moment when the page opens. I kept the initial state exactly as the assignment asked.
- **Keeping the files separated.** It was tempting to put everything in `App.jsx`. Splitting the API, the reducer and the UI components made each file shorter and easier to understand.
