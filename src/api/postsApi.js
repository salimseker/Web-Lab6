const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

/**
 * Fetches all posts from the JSONPlaceholder API.
 *
 * @param {AbortSignal} [signal] - Lets the caller cancel the request (e.g. on unmount).
 * @returns {Promise<Array<{ id: number, userId: number, title: string, body: string }>>}
 * @throws {Error} When the network request fails or the server responds with a non-2xx status.
 */
export async function fetchPosts(signal) {
  const response = await fetch(POSTS_URL, { signal })

  if (!response.ok) {
    throw new Error(`Failed to fetch posts (HTTP ${response.status})`)
  }

  return response.json()
}
