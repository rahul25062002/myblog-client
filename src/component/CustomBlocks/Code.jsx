import React,{ useState } from 'react'
import Copy from '../../assets/copy.svg';
import Copied from '../../assets/copied.svg';
import SyntaxHighlighter from 'react-syntax-highlighter';
import './Code.css';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function Code(props) {
  
  const { language } = props;
  const [copyImg, setCopyImg] = useState(Copy);

  const copyCode = ()=>{
    navigator.clipboard.writeText(props.children[0]);
    setCopyImg(Copied);
    setTimeout(() => {
      setCopyImg(Copy);
    }, 3000);
  }

  return (
    <div className='code'>
      <p className='code-lang'>{language}</p>
      {/* <img className='code-copy' src={Copied} alt="copied" /> */}
      <img onClick={copyCode} className='code-copy' src={copyImg} alt="copy" />
      <SyntaxHighlighter language={language} style={docco}>
        {
          props.children[0]
        }
      </SyntaxHighlighter>
    </div>
  )
}

export default Code