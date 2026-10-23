import Post from './Post.jsx'

function PostList({ posts }) {
  if (posts.length === 0) {
    return <p className="status">No posts found.</p>
  }

  return (
    <section className="post-list">
      {posts.map((post) => (
        <Post key={post.id} title={post.title} body={post.body} />
      ))}
    </section>
  )
}

export default PostList
