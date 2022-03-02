function Search({ searchQuery, setSearchQuery }) {
  return (
    <form action="/" method="get">
      <label htmlFor="header-search">
        <span className="visually-hidden">Enter kit label ID</span>
      </label>
      <input
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
        type="text"
        id="header-search"
        placeholder="Enter kit label ID"
        name="label_id"
      />
    </form>
  );
}

export default Search;
