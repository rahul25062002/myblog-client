import React from 'react';
import './BlockQuote.css';

function BlockQuote({children}) {
    // console.log(children);
  return (
    <p className='blockquote'>
        {children[0].props.children}
    </p>
  )
}

export default BlockQuote