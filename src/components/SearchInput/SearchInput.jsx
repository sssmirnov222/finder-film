import React from 'react';
import './SearchInput.css';

const SearchInput = (props) => {
  return (
    <div>
      <div>
        <div className="d">
          <form action="" className="seachSubmit">
            <input type="text" className="searchInput" onChange={(e) => props.handlerChange(e.target.value)} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
