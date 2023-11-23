import React, { useEffect } from 'react';
import scene from '../../assets/user.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { addToEdit, deleteDraft, getAllDrafts } from '../../features/draftSlice';

function Dashdrafts() {

    const ax = usePrivateAxios();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
    const {
        totalDraft,
        loading,
        fetched,
        draftById
    } = useSelector(state => state.draft);

    let drafts = Object.keys(draftById).map(elem => {
        return draftById[elem];
    });

    const editTheDraft = (id)=>{
        dispatch( addToEdit({id}) );
        navigate('/editor/edit/'+id);
    }

    const previewDraft = (id)=>{
        dispatch( addToEdit({id}) );
        navigate('/editor/preview/' + id);
    }

    const deleteTheDraft = (id)=>{
        let text = prompt("To Delete draft write : delete",'Write Here' );
        if( text==='delete' )
            dispatch( deleteDraft({ax,id}) )
    }

    console.log(drafts);

    useEffect(() => {
        if (!fetched)
            dispatch(getAllDrafts({ ax }));
    }, []);

    return (
        <div className='post-list'>
            <h2>All Drafts</h2>

            {
                totalDraft===0 ? <></> :
                    drafts.map(elem => {
                        return <div key={elem.id} className='post-card'>
                            <div className='card-creator'>
                                <span onClick={()=>editTheDraft(elem.id)}>Edit</span>
                                <span onClick={()=>previewDraft(elem.id)}>Preview</span>
                                <span onClick={()=>deleteTheDraft(elem.id)}>Remove</span>
                            </div>
                            {
                                !elem.cover_image ? <></> :
                                <img src={elem.cover_image} alt="" />
                            }
                            <div className='card-content'>
                                <h4>{elem.title}</h4>
                                <p>{elem.description}</p>
                            </div>
                        </div>
                    })
            }
            {
                fetched && !loading && totalDraft===0 ? 
                <p>No Drafts available</p> : 
                <></>
            }

        </div>
    )
}

export default Dashdrafts