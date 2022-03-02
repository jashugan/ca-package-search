const filterResults = (results, query) => {
  if (!results) {
    return [];
  }
  return results.filter((result) => {
    const labelName = result.label_id.toLowerCase();
    return labelName.startsWith(query);
  });
};

const Results = ({ searchQuery, searchResults }) => {
  const filteredResults = filterResults(searchResults, searchQuery);
  return (
    <table>
      <thead>
        <td>Label ID</td>
        <td>Tracking #</td>
      </thead>
      <tbody>
        {filteredResults.map((result) => {
          return (
            <tr key={result.id}>
              <td>{result.label_id}</td>
              <td>{result.shipping_tracking_code}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Results;
