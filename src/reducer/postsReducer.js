export const FETCH_START = 'FETCH_START'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_ERROR = 'FETCH_ERROR'

export const initialState = {
  posts: [],
  loading: false,
  error: null,
}

/**
 * Pure reducer for the async posts state.
 * Every branch returns a new object; the previous state is never mutated.
 */
export function postsReducer(state, action) {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true, error: null }

    case FETCH_SUCCESS:
      return { ...state, posts: action.payload, loading: false, error: null }

    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload }

    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}
