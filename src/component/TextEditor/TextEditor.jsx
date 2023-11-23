import React, { useEffect, useState } from 'react';
import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { createDraft, editDraft, updateDraft, publishDraft, addToEdit } from '../../features/draftSlice';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { toast } from 'react-toastify';
import './TextEditor.css';
import { useSelector, useDispatch } from 'react-redux';

function TextEditor() {

  const [toLink, setToLink] = useState('/edit/');
  const ax = usePrivateAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  let origDraft = useSelector(state => state.draft.edit[id]);
  // console.log(id, origDraft.id);
  const [draft, setDraft] = useState(
    JSON.parse(JSON.stringify({ ...origDraft, loading: false }))
  );
  const [changes, setChanges] = useState({})

  // save changes 
  useEffect(() => {
    return function () {
      dispatch(editDraft({ draft }));
    }
  }, []);

  useEffect(() => {
    setDraft(
      JSON.parse(JSON.stringify({ ...origDraft, loading: false }))
    )
  }, [origDraft])


  const toggleNavlink = () => {
    if (toLink === '/edit/')
      setToLink('/preview/');
    else
      setToLink('/edit/');
  }

  const saveDraft = () => {

    dispatch(addToEdit({ id }));
    dispatch(editDraft({ draft }));

    if (id === 'noid') {
      const { id, type, loading, ...editedDraft } = draft;
      dispatch(createDraft({ ax, draft: editedDraft, navigate }));
    }
    else {
      const editedDraft = {};
      // console.log(changes,draft);
      Object.keys(changes).forEach(key => {
        if (changes[key] && key !== 'loading')
          editedDraft[key] = draft[key];
      })

      editedDraft.id = draft.id;
      // console.log(editedDraft, draft);

      dispatch(updateDraft({ ax, draft: editedDraft,setChanges }));
    }

  }

  const publishTheDraft = () => {
    if( Object.keys(changes).length===0 )
      dispatch(publishDraft({ ax, id, navigate }));
    else 
      toast('save changes before publishing');
  }

  return (
    <div id='TextEditor'>
      <div id='edit_toggle'>
        <button
          disabled={draft.loading}
          onClick={saveDraft}>{id === 'noid' ? 'Create Draft' : 'Save Changes'}</button>
        {
          id !== 'noid' ?
            <button disabled={draft.loading}
              onClick={publishTheDraft} data-btn='blue'>Publish</button> :
            <></>
        }

        <NavLink onClick={toggleNavlink} className='navlink' to={"/editor" + toLink + id}>{
          toLink === '/edit/' ? 'Preview' : 'Edit Here'
        }</NavLink>
      </div>

      <Outlet context={{ draft, setDraft, changes, setChanges }} />

    </div>
  )
}

export default TextEditor