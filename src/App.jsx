import { useEffect, useReducer, useState } from 'react'
import { fetchPosts } from './api/postsApi.js'
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  initialState,
  postsReducer,
} from './reducer/postsReducer.js'
import FilterForm from './components/FilterForm.jsx'
import PostList from './components/PostList.jsx'

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState)
  const [titleFilter, setTitleFilter] = useState('')
  const { posts, loading, error } = state

  // Derived state: recomputed on every render from the source posts, never stored.
  const normalizedFilter = titleFilter.trim().toLowerCase()
  const visiblePosts = posts.filter((post) =>
    post.title.toLowerCase().includes(normalizedFilter),
  )

  useEffect(() => {
    const controller = new AbortController()

    async function loadPosts() {
      dispatch({ type: FETCH_START })

      try {
        const data = await fetchPosts(controller.signal)

        if (!Array.isArray(data)) {
          throw new Error('Received an unexpected response from the server')
        }

        dispatch({ type: FETCH_SUCCESS, payload: data })
      } catch (err) {
        // The request was cancelled because the component unmounted; nothing to update.
        if (err.name === 'AbortError') {
          return
        }

        dispatch({ type: FETCH_ERROR, payload: err.message })
      }
    }

    loadPosts()

    return () => controller.abort()
  }, [])

  return (
    <main>
      <h1>Post Dashboard</h1>

      <FilterForm value={titleFilter} onChange={setTitleFilter} />

      {loading && <p className="status">Loading posts...</p>}

      {!loading && error && (
        <p className="status error" role="alert">
          Could not load posts: {error}
        </p>
      )}

      {!loading && !error && <PostList posts={visiblePosts} />}
    </main>
  )
}

export default App
