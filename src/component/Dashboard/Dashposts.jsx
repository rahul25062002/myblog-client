import React, { useEffect } from 'react';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getMyPost } from '../../features/postSlice';


function Dashposts() {

    const dispatch = useDispatch();
    let myPosts = useSelector(state=>state.post.myPosts);
    let posts = useSelector(state=>{
        const keys = Object.keys( myPosts.postById );
        return keys.map(key=>{
            return state.post.postById[key];
        });
    });

    const totalPosts = posts.length;
    const totalComments = posts.reduce((comm,post)=>{
        return comm + post.total_comment;
    },0);
    const totalUpvotes = posts.reduce((upvote,post)=>{
        return upvote + post.total_upvote;
    },0);
    const totalBookmarked = posts.reduce((book,post)=>{
        return book + post.bookmarked;
    },0)

    const ax = usePrivateAxios();
    const navigate = useNavigate();

    useEffect(() => {
        if (!myPosts.fetched)
            dispatch(getMyPost({ ax }));
    }, []);

    const deleteThePost = (id)=>{
        const text = prompt('To delete post type : delete', "Type Here...").trim();

        if( text==='delete' )
            dispatch( deletePost({ax,id}) );
    }

    if (!myPosts.fetched)
        return <div>Loading</div>

    return (
        <>
            <div id='post-stats'>
                <h3>Post statistics</h3>
                <div>
                    <h4>{totalPosts}</h4>
                    <p>Total Posts</p>
                </div>

                <div>
                    <h4>{totalComments}</h4>
                    <p>Total Post Comments</p>
                </div>

                <div>
                    <h4>{totalUpvotes}</h4>
                    <p>Total Post Upvotes</p>
                </div>

                <div>
                    <h4>{totalBookmarked}</h4>
                    <p>Total Times Bookmarked</p>
                </div>

            </div>

            <div className='post-list'>
                <h2>All Posts </h2>

                {
                    posts.map(post => {
                        // const post = myPosts.postById[key];

                        return <div key={post.id} className='post-card'>
                            <div className='card-creator'>
                                <span onClick={()=>navigate('/post/'+post.id)}>Read</span>
                                <span onClick={()=>deleteThePost(post.id)}>Delete</span>
                            </div>
                            {
                                post.cover_image==='' ? <></>:
                                <img src={post.cover_image} alt="" />

                            }
                            <div className='card-content'>
                                <h4>{post.title}</h4>
                                <p>Description : {post.description}</p>
                            </div>
                        </div>
                    })
                }


            </div>
        </>
    )
}

export default Dashposts