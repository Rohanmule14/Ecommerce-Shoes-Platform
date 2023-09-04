import React from "react";

const Search = (props) => {
  return (
    <div className="d-flex justify-content-center mt-4">
      <form className="col-6">
        <input
          className="form-control me-2"
          type="search"
          value={props.search}
          onChange={props.onChange}
          placeholder="Search for any shoe..."
          aria-label="Search"
        />
      </form>
    </div>
  );
};

export default Search;
