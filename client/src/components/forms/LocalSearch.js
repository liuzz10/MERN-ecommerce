import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  // searching/filtering: step 3
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <div className="container pt-4 pb-4">
      {/* searching/filtering: step 2 INPUT FIELD */}
      <input
        type="text"
        placeholder="Filter"
        value={keyword}
        onChange={handleSearchChange}
        className="form-control mb-4"
      />
    </div>
  );
};

export default LocalSearch;
