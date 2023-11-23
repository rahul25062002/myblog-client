import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useOutletContext } from 'react-router-dom';
import './Editor.css';
import Blockquote from '../../assets/Blockquote';
import Bold from '../../assets/Bold';
import Italic from '../../assets/Italic';
import Underline from '../../assets/Underline';
import Divider from '../../assets/Divider';
import Code from '../../assets/Code';
import Photo from '../../assets/Photo';
import Link from '../../assets/Link';
import controls from './controls';
import Note from '../../assets/Write';
import Tip from '../../assets/Logo';
import Warning from '../../assets/Danger';
import VerticalDot from '../../assets/VerticalDot';
import { uploadImageApi } from '../../api/auth';
import Loading from '../../assets/Loading';


function Editor() {

  const { id } = useParams();
  const editorControlRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef();
  const { draft, setDraft, changes, setChanges } = useOutletContext();

  useEffect(() => {

    const selector = `#editor_title > textarea,
                  #editor_content > textarea`;
    const textarea = document.querySelectorAll(selector);
    textarea.forEach(elem => {
      elem.addEventListener('input', autoGrowTextarea);
    });

    const input = document.querySelector(`#editor_title > input[type='text']`);
    input.addEventListener('keyup', addTags);
    controls.autoGrow();

    return () => {
      textarea.forEach(elem => {
        elem.removeEventListener('input', autoGrowTextarea);
      })
      input.removeEventListener('keyup', addTags);
    }
  });

  var autoGrowTextarea = (event) => {
    const prevHeight = event.target.scrollHeight;
    const editor = document.querySelector('#editor');
    const prevPos = editor.scrollTop;

    event.target.style.height = '5px';
    const scrollHeight = event.target.scrollHeight;
    event.target.style.height = (scrollHeight) + 'px';

    if (prevHeight === scrollHeight)
      editor.scrollTop = prevPos;

  }

  var addTags = (event) => {
    if (event.key === 'Enter') {
      let text = event.target.value.trim().toLowerCase();
      if (text !== '' && !draft.tags.includes(text) && draft.tags.length < 4){
        editCurrentDraft([...draft.tags, text], 'tags');
        setChanges({
          ...changes,
          tags : true,
        });
      }
      
      else
        event.target.placeholder = 'No more tags';

        event.target.value = '';
    }
  }
  
  var removeTag = (tag) => {
    const newTagList = draft.tags.filter(elem => elem !== tag);
    editCurrentDraft(newTagList, 'tags');
    const input = document.querySelector('#editor_title > input');
    input.placeholder = 'Add upto 4 tags ...';
    setChanges({
      ...changes,
      tags : true,
    });

  }

  const editCurrentDraft = (value, property) => {
    let newDraft = { ...draft };
    newDraft[property] = value;
    setDraft(newDraft);
    const newChanges = { ...changes };
    newChanges[property] = true;
    setChanges(newChanges);
  }

  const onClickController = (property) => {
    controls[property]();
    setDraft({ ...draft, content: contentRef.current.value });
  }

  const selectCoverImage = async (event) => {
    const image = event.target.files[0];

    try {
      setDraft({
        ...draft,
        cover_image: 'LOADING',
        loading : true,
      });

      const image_url = await uploadImageApi(image);

      setDraft({
        ...draft,
        cover_image: image_url,
        loading : false,
      });

      setChanges({
        ...changes,
        cover_image : true,
      })

    } catch (error) {
      setDraft({
        ...draft,
        cover_image : '',
        loading : false,
      });
    }
  }

  const removeCoverImg = () => {
    setDraft({ ...draft, cover_image: '' });
    document.querySelector('#select_coverimg').value = '';
  }

  return (
    <div id='editor'>
      <div id='editor_title'>

        <div id='editor_coverimg'>
          <button>
            <label htmlFor="select_coverimg">Add Cover Image</label>
          </button>
          {
            draft.cover_image === '' ?
              <></> :
              draft.cover_image === 'LOADING' ?
                <Loading /> :
                <img onClick={removeCoverImg} src={draft.cover_image} alt="" />
          }
        </div>
        <input accept='image/*'
          onChange={selectCoverImage}
          style={{ display: 'none' }}
          type="file" id="select_coverimg" />

        <textarea
          value={draft.title}
          onChange={(e) => editCurrentDraft(e.target.value, 'title')}
          placeholder='New Post Title Here...'
          className="title" rows="1"></textarea>
        <textarea
          value={draft.description}
          onChange={(e) => editCurrentDraft(e.target.value, 'description')}
          placeholder='Add Description : upto 50 words'></textarea>
        <input type="text" placeholder='Add upto 4 tags ...' />
        <div>
          {
            draft.tags.map(tag => {
              return <span
                key={`${tag}`}
                onClick={() => removeTag(tag)} className='post-tag'>#{tag}&nbsp;&nbsp;
                <span>&#x2718;</span>
              </span>
            })
          }
        </div>
      </div>
      <div id='editor_control'>
        <span style={{ "--desc": "'Bold'" }} onClick={() => onClickController('bold')}>
          <Bold />
        </span>
        <span style={{ "--desc": "'Italic'" }} onClick={() => onClickController('italic')}>
          <Italic />
        </span>
        <span style={{ "--desc": "'Underline'" }} onClick={() => onClickController('underline')}>
          <Underline />
        </span>
        <span style={{ "--desc": "'Link'" }} onClick={() => onClickController('link')}>
          <Link />
        </span>
        <span style={{ "--desc": "'Divider'" }} onClick={() => onClickController('divider')}>
          <Divider />
        </span>
        <span style={{ "--desc": "'Code'" }} onClick={() => onClickController('code')}>
          <Code />
        </span>
        <span style={{ "--desc": "'Image'" }} onClick={() => onClickController('photo')} >
          <Photo />
        </span>

        <span id='extra-control' ref={editorControlRef} onClick={() => setIsOpen(!isOpen)}>
          <VerticalDot />
          {
            !isOpen ? <></> :
              <div >
                <span onClick={() => onClickController('blockquote')}>
                  <Blockquote />
                  <p>Blockquote</p>
                </span>
                <span onClick={() => { onClickController('tip') }}>
                  <Tip />
                  <p>Tip</p>
                </span>
                <span onClick={() => onClickController('warning')}>
                  <Warning />
                  <p>Warning</p>
                </span>
                <span onClick={() => onClickController('note')}>
                  <Note />
                  <p>Note</p>
                </span>
              </div>
          }
        </span>

      </div>
      <div id='editor_content'>
        <textarea
          ref={contentRef}
          value={draft.content}
          onChange={(e) => editCurrentDraft(e.target.value, 'content')}
          placeholder='Your content Here'></textarea>
      </div>
    </div>
  )
}

export default Editor