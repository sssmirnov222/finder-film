import React from 'react';
import './SearchInput.css';

const SearchInput = (props) => {
  return (
    <div>
      <div>
        <section>
          <form action="" onSubmit={props.handlerSubmit}>
            <input type="text" placeholder="Type to search..." onChange={props.handlerInput} />
          </form>
        </section>
      </div>
    </div>
  );
};

export default SearchInput;
