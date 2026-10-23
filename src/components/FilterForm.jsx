function FilterForm({ value, onChange }) {
  function handleSubmit(event) {
    // Filtering happens as the user types; pressing Enter should not reload the page.
    event.preventDefault()
  }

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <label htmlFor="title-filter">Filter by title</label>
      <input
        id="title-filter"
        type="search"
        placeholder="Type to filter posts..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </form>
  )
}

export default FilterForm
