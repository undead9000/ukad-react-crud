import "./App.css";
import React, { useEffect, useState, useCallback } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import _ from "lodash";
let items = [],
  queryResult = [];

function Details({ detailsItem }) {
  return (
    <div className="c-details">
      <div className="c-subtitle">Details:</div>
      <table className="c-table">
        <tbody>
          <tr>
            <th>User Id</th>
            <th>Id</th>
            <th>Text</th>
            <th>Completed</th>
          </tr>
          <tr key={detailsItem.id}>
            <td>{detailsItem.userId}</td>
            <td>{detailsItem.id}</td>
            <td>{detailsItem.title}</td>
            <td>{detailsItem.completed.toString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Search({ searchQuery }) {
  const delayedQuery = useCallback(
    _.debounce((q) => searchQuery(q), 500),
    []
  );
  return (
    <input type="text" onChange={delayedQuery} placeholder="Search..."></input>
  );
}

function Items({ currentItems, passedFunction }) {
  return (
    <div>
      {currentItems && currentItems.length > 0 ? (
        <table className="c-table">
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} onClick={() => passedFunction(item)}>
                <td>{item.id}</td>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No results</h2>
      )}
    </div>
  );
}

function App({ itemsPerPage }) {
  const [data, setData] = useState([]);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setcurrentPage] = useState(0);
  const [query, setQuery] = useState("");

  const detailsItemInitial = {
    userId: 1,
    id: 1,
    title: "Initial data",
    completed: false,
  };
  const [detailsItem, updateDetails] = useState(detailsItemInitial);

  const passedFunction = (event) => {
    (async () => {
      try {
        const result = await axios(
          "https://jsonplaceholder.typicode.com/todos/" + event.id
        );
        setData(result.data);
        updateDetails(result.data);
      } catch (err) {
        alert(err);
      }
    })();
  };

  const searchQuery = (event) => {
    const queryString = window.location.search;
    queryResult = [];

    if (event.target.value === "") {
      queryResult = items;
    } else {
      items.forEach((item) => {
        if (item.title.includes(event.target.value)) {
          queryResult.push(item);
        }
      });
    }

    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      const currentPage = Number(urlParams.get("page") - 1);
      const newOffset = (currentPage * itemsPerPage) % queryResult.length;
      const endOffset = newOffset + itemsPerPage;
      setItemOffset(newOffset);
      setCurrentItems(queryResult.slice(itemOffset, endOffset));
      setcurrentPage(currentPage);
    } else {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(queryResult.slice(itemOffset, endOffset));
      setcurrentPage(0);
    }
    setPageCount(Math.ceil(queryResult.length / itemsPerPage));
    setQuery(event.target.value);
  };

  useEffect(async () => {
    try {
      const queryString = window.location.search;
      const result = await axios("https://jsonplaceholder.typicode.com/todos");
      setData(result.data);
      items = result.data;

      if (queryString) {
        const urlParams = new URLSearchParams(queryString);
        const currentPage = Number(urlParams.get("page") - 1);
        const newOffset = (currentPage * itemsPerPage) % items.length;
        const endOffset = newOffset + itemsPerPage;
        setItemOffset(newOffset);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setcurrentPage(currentPage);
      } else {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setcurrentPage(0);
      }

      setPageCount(Math.ceil(items.length / itemsPerPage));
    } catch (err) {
      alert(err);
    }
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;

    if (event.selected > 0) {
      let refresh =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?page=" +
        Number(event.selected + 1);
      window.history.pushState({ path: refresh }, "", refresh);
    } else {
      let refresh =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      window.history.pushState({ path: refresh }, "", refresh);
    }

    setItemOffset(newOffset);
  };

  return (
    <div className="c-wrapper">
      <div className="c-column">
        <Items currentItems={currentItems} passedFunction={passedFunction} />
        <ReactPaginate
          className="c-pagination"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< prev"
          renderOnZeroPageCount={null}
          forcePage={currentPage}
        />
      </div>
      <div className="c-column">
        <Search searchQuery={searchQuery}></Search>
        <Details detailsItem={detailsItem}></Details>
      </div>
    </div>
  );
}

export default App;
