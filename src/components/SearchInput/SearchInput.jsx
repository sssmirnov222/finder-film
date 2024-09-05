import React from 'react';
import './SearchInput.css';

const SearchInput = (props) => {
  return (
    <div>
      <div>
        <div>
          <form action="" onSubmit={props.handlerSubmit} className="seachSubmit">
            <h1 className="seachHeader">Finder films</h1>
            <input type="text" className="searchInput" onChange={(e) => props.handlerChange(e.target.value)} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
