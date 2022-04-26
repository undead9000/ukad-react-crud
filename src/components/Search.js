import React, { useCallback } from "react";
import _ from "lodash";

function Search({ searchQuery }) {
  const delayedQuery = useCallback(
    _.debounce((q) => searchQuery(q), 500),
    []
  );
  return (
    <input type="text" onChange={delayedQuery} placeholder="Search..."></input>
  );
}

export default Search;
