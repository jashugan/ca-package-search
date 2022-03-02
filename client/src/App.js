import logo from "../src/logo.svg";
import "./App.css";
import Search from "./Search";
import { useState } from "react";
import Results from "./Results";

function updateSearchResults(query, results, setSearchQuery, setSearchResults) {
  if (query?.length < 3) {
    setSearchResults([]);
    return;
  }

  if (!results?.length) {
    fetch("/api/?label_id=" + query, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((body) => {
        setSearchResults(body.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }
}

function App() {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("label_id");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Search
          searchQuery={searchQuery}
          setSearchQuery={(value) => {
            setSearchQuery(value);
            updateSearchResults(
              value,
              searchResults,
              setSearchQuery,
              setSearchResults
            );
          }}
        />
        <Results searchQuery={searchQuery} searchResults={searchResults} />
      </header>
    </div>
  );
}

export default App;
