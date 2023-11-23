import React from 'react';
import './Preview.css';
import { useOutletContext } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import BlockQuote from '../CustomBlocks/BlockQuote';
import Highlight from '../CustomBlocks/Highlight';
import Code from '../CustomBlocks/Code';
import Link from '../CustomBlocks/Link';

function Preview() {

  const { draft } = useOutletContext();
  console.log(draft);

  return (
    <div id='Preview'>
      <div id='post-meta'>
        {
          draft.cover_image === '' ? <></> :
            <img src={ draft.cover_image} id='post-coverimg' alt="" />
        }
        <h1>{draft.title}</h1>
        {
          draft.tags.map(tag => {
            return <span
              key={`${tag}`}
              className='post-tag'>#{tag}
            </span>
          })
        }
        <p id='post-description'> {draft.description} </p>
      </div>

      <Markdown options={{
        forceBlock: false,
        overrides: {
          blockquote: {
            component: BlockQuote,
            props: {
              className: 'blockquote'
            }
          },
          Tip: {
            component: Highlight,
            props: {
              type: 'tip'
            }
          },
          Note: {
            component: Highlight,
            props: {
              type: 'note'
            }
          },
          Warning: {
            component: Highlight,
            props: {
              type: 'warning'
            }
          },
          code: {
            component: Code
          },
          link: {
            component: Link,
          },
        }
      }}>
        {draft.content}
      </Markdown>
    </div>
  )
}

export default Preview


// function Preview() {

//     const { draft } = useOutletContext();
//   console.log(draft);

//   return (
//     <div id='Preview'>
//       <h1></h1>
//     </div>
//   )
// }

// export default Preview