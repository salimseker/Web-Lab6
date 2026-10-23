import { useEffect, useReducer } from 'react'
import { fetchPosts } from './api/postsApi.js'
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  initialState,
  postsReducer,
} from './reducer/postsReducer.js'
import PostList from './components/PostList.jsx'

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState)
  const { posts, loading, error } = state

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

      {loading && <p className="status">Loading posts...</p>}

      {!loading && error && (
        <p className="status error" role="alert">
          Could not load posts: {error}
        </p>
      )}

      {!loading && !error && <PostList posts={posts} />}
    </main>
  )
}

export default App
