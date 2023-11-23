import React, { useEffect, useRef } from 'react';
import './Post.css';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import BlockQuote from '../CustomBlocks/BlockQuote';
import Highlight from '../CustomBlocks/Highlight';
import Code from '../CustomBlocks/Code';
import Link from '../CustomBlocks/Link';
import Upvote from '../../assets/Upvote';
import Bookmark from '../../assets/Bookmark';
import Share from '../../assets/Share';
import { toast } from 'react-toastify';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import {
    getPostById,
    getPostComment,
    upvotePost,
    bookmarkPost,
    addComment
} from '../../features/postSlice';
import { USER_STATUS } from '../../features/userSlice';

function Post() {

    const { id } = useParams();
    const dispatch = useDispatch();

    const post = useSelector(state => {
        return state.post.postById[id];
    });

    const comments = post?.comments ? post.comments : [];

    const commentRef = useRef();
    const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
    const { email, status } = useSelector(state => state.user);
    const ax = usePrivateAxios();

    useEffect(() => {
        if (!post)
            dispatch(getPostById({ id, email }));
        else if (!post?.comment)
            dispatch(getPostComment({ id }));
    }, []);

    const upvoteThePost = () => {
        dispatch(upvotePost({
            ax,
            id,
            loggedIn: status === USER_STATUS.loggedin
        }));
    }

    const bookmarkThePost = () => {
        dispatch(bookmarkPost({
            ax,
            id,
            loggedIn: status === USER_STATUS.loggedin
        }));
    }

    const addTheComment = async () => {
        console.log('here');
        if( status!==USER_STATUS.loggedin ){
            toast('Login to comment');
            return;
        }

        const text = commentRef.current.value.trim();
        if (text === '') {
            toast("comment can't be empty");
            return;
        }


        dispatch( addComment({
            id,
            comment : text,
            ax,
            email
        }) ).then(()=>{
            commentRef.current.value = '';
        })

    }

    if (!post)
        return <div>Post</div>

    return (
        <div id='Post'>
            <div id='post-meta'>
                {
                    post.cover_image === '' ? <></> :
                        <img src={post.cover_image} id='post-coverimg' alt="" />
                }
                <div id='post-creator'>
                    <span>@{post.created_by.split('@')[0]}</span>
                    <span>{format(new Date(post.created_at), 'dd LLL yy')}</span>
                </div>
                <h1>{post.title}</h1>
                <div id='post-tags'>
                    {
                        post.tags.map(tag => {
                            return <span
                                key={`${tag}`}
                            >#{tag}
                            </span>
                        })
                    }
                </div>
                <p id='post-description'>{post.description}</p>
            </div>


            <div id='post-content'>
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
                    {post.content}
                </Markdown>
            </div>

            <div id='post-control'>
                <span onClick={upvoteThePost}>
                    <Upvote myclass={post.upvoted_by_user ? 'checked' : ''} votes={post.total_upvote} />
                </span>
                <span onClick={bookmarkThePost}>
                    <Bookmark myclass={post.bookmarked_by_user ? 'checked' : ""} />
                </span>
                <span>
                    <Share />
                </span>
            </div>

            <div id='post-comment'>
                <h3>Comments</h3>
                <div id='addcomment'>
                    <textarea ref={commentRef} placeholder='Add new comment ....' rows='3'></textarea>
                    <span onClick={addTheComment}>Send</span>
                </div>
                {
                    comments.map(comm => {
                        return <div className='comment' key={comm.id}>
                            <p>{comm.account_id.split('@')[0]} </p>
                            <p>
                                {comm.comment}
                            </p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Post