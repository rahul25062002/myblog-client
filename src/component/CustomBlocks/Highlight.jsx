import React from 'react';
import Note from '../../assets/Write';
import Warning from '../../assets/Danger';
import Tip from '../../assets/Logo';
import './Highlight.css'

function Highlight(props) {
    const { type,children } = props;
    console.log(children);

    let ImgSrc = Note;
    if( type==='warning' )
        ImgSrc = Warning;
    else if( type==='tip' )
        ImgSrc = Tip;

  return (
    <div className={`highlight ${type}`}>
        <p>
            <ImgSrc />
            {type.toUpperCase()}
        </p>
        <p>
            {children}
        </p>
    </div>
  )
}

export default Highlight