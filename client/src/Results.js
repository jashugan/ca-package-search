const filterResults = (results, query) => {
  if (!results) {
    return [];
  }
  return results.filter((result) => {
    const labelName = result.label_id.toLowerCase();
    return labelName.startsWith(query);
  });
};

function Results({ searchQuery, searchResults }) {
  const filteredResults = filterResults(searchResults, searchQuery);
  return (
    <ul>
      {filteredResults.map((result) => {
        return <li key={result.id}>{result.label_id}</li>;
      })}
    </ul>
  );
}

export default Results;
