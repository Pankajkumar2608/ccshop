import React, { useState } from "react";
import Filter from "./Filter";
import Body from "./Body";

const App = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleFilter = (data) => {
    setFilteredData(data);
    setIsFiltered(true);
  };

  return (
    <div>
      <Filter onFilter={handleFilter} />
      <Body filteredData={filteredData} isFiltered={isFiltered} />
    </div>
  );
};

export default App;
