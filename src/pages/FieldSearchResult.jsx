import React from "react";
import { useLocation } from "react-router";

function FieldSearchResult() {
  const location = useLocation();

  const fields = location.state || [];
  console.log("Fields: ", fields);
  return (
    <div>
      <h1>Fields Search Results</h1>
      <ul>
        {fields.map((item, index) => (
          <li key={index}>{item.fieldName}</li>
        ))}
      </ul>
    </div>
  );
}

export default FieldSearchResult;
