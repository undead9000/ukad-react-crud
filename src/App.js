import "./App.css";
import Details from "./components/Details";
import Items from "./components/Items";
import Search from "./components/Search";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

function App({ itemsPerPage }) {
  const [data, setData] = useState([]);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setcurrentPage] = useState(0);
  const [query, setQuery] = useState("");
  let [queryResult, setQueryResult] = useState([]);
  const [detailsItem, updateDetails] = useState({
    userId: 1,
    id: 1,
    title: "Initial data",
    completed: false,
  });

  let items = [];

  const onSearch = (event) => {
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
    const query = event.target.value;
    queryResult = [];
    setQueryResult(queryResult);

    if (event.target.value === "") {
      setQueryResult([]);
    } else {
      items.forEach((item) => {
        if (item.title.includes(event.target.value)) {
          queryResult.push(item);
        }
      });
    }

    if (query) {
      setCurrentItems(queryResult.slice(0, itemsPerPage));
      setPageCount(Math.ceil(queryResult.length / itemsPerPage));
    } else {
      setCurrentItems(items.slice(0, itemsPerPage));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }

    setItemOffset(itemsPerPage);
    setcurrentPage(0);
    setQuery(event.target.value);
  };

  useEffect(async () => {
    try {
      const urlData = window.location.search;
      const result = await axios("https://jsonplaceholder.typicode.com/todos");

      if (queryResult.length === 0) {
        setData(result.data);
        items = result.data;
      } else {
        setData(queryResult);
        items = queryResult;
      }

      if (urlData) {
        const urlParams = new URLSearchParams(urlData);
        const currentPage = Number(urlParams.get("page") - 1);
        const newOffset = (currentPage * itemsPerPage) % items.length;
        const endOffset = newOffset + itemsPerPage;
        setItemOffset(newOffset);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setcurrentPage(currentPage);
      } else {
        setItemOffset(itemsPerPage);
        setCurrentItems(items.slice(0, itemsPerPage));
        setcurrentPage(0);
      }

      setPageCount(Math.ceil(items.length / itemsPerPage));
    } catch (err) {
      alert(err);
    }
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
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

    setItemOffset();
  };

  return (
    <div className="c-wrapper">
      <div className="c-column">
        <Items currentItems={currentItems} onSearch={onSearch} />
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
