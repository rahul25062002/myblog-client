import React, { useEffect } from 'react';
import scene from '../../assets/user.png';
import Upvote from '../../assets/Upvote';
// import Bookmark from '../../assets/Bookmark';
import Share from '../../assets/Share';
import { useSelector, useDispatch } from 'react-redux';
import { getBookmarkedPost, upvotePost, bookmarkPost } from '../../features/postSlice';
import { USER_STATUS } from '../../features/userSlice';
import usePrivateAxios from '../../hooks/usePrivateAxios';

function Dashbookmark() {

    const ax = usePrivateAxios();
    const dispatch = useDispatch();
    const { loading, fetched, postById } = useSelector(state => state.post.bookmarkedPosts);
    const status = useSelector(state => state.user.status);
    const posts = useSelector(state => {
        return Object.keys(postById).map(key => {
            return state.post.postById[key];
        });
    });

    useEffect(() => {
        if (!fetched)
            dispatch(getBookmarkedPost({ ax }));
    }, []);

    const upvoteThePost = (id) => {
        dispatch(upvotePost({
            ax,
            id,
            loggedIn: status === USER_STATUS.loggedin
        }));
    }

    const bookmarkThePost = (id) => {

        const text = prompt("To remove from bookmark write : 'remove'",'write here').trim();
        if( text!=='remove' )
            return;

        dispatch(bookmarkPost({
            ax,
            id,
            loggedIn: status === USER_STATUS.loggedin
        }));
    }

    return (
        <div className='post-list'>
            <h2>Bookmarks</h2>

            {
                posts.map(post => {
                    return <div key={post.id} className='post-card'>
                        <div className='card-creator'>
                            <p>{post.created_by.split('@')[0]}</p>
                            <span onClick={() => bookmarkThePost(post.id)}>Remove</span>
                            <span>Read</span>
                        </div>
                        <img src={post.cover_image} alt="" />
                        <div className='card-content'>
                            <h4>{post.title}</h4>
                            <p>description : {post.title}</p>
                        </div>
                        <div className='card-bar'>
                            <span onClick={() => upvoteThePost(post.id)}>
                                <Upvote myclass={post.upvoted_by_user ? 'checked' : ''} votes={post.total_upvote} />
                            </span>
                            {/* <Bookmark /> */}
                            <Share />
                        </div>
                    </div>
                })
            }

        </div>
    )
}

export default Dashbookmark