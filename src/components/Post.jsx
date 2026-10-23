function Post({ title, body }) {
  return (
    <article className="post">
      <h2 className="post-title">{title}</h2>
      <p className="post-body">{body}</p>
    </article>
  )
}

export default Post
