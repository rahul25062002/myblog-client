import React, { useEffect } from 'react';
import './Home.css';
import Logo from '../../assets/Logo'
import scene from '../../assets/user.png';
import Upvote from '../../assets/Upvote';
import Bookmark from '../../assets/Bookmark';
import Share from '../../assets/Share';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bookmarkPost, getAllPost, upvotePost } from '../../features/postSlice';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { USER_STATUS } from '../../features/userSlice';
import { toast } from 'react-toastify';

function Home() {

  const { postById, totalPost, postFetched, loading } = useSelector(state => state.post);
  const { status, email } = useSelector(state => state.user);
  const ax = usePrivateAxios();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    if (totalPost != postFetched || (totalPost === 0 && postFetched === 0))
      dispatch(getAllPost({ email, offset: postFetched }));
  }

  const upvoteThePost = (id) => {
    dispatch(upvotePost({
      ax,
      id,
      loggedIn: status === USER_STATUS.loggedin
    }));
  }

  const bookmarkThePost = (id) => {
    dispatch(bookmarkPost({
      ax,
      id,
      loggedIn: status === USER_STATUS.loggedin
    }));
  }


  return (
    <div id='Home'>
      <section id='home-intro'>
        <h1>Unraveling the Layers <br /> of Knowledge</h1>
        <p>Discover stories, thinking, and <br /> expertise from writers on any topic.</p>
        <button data-btn='black'>Get Started</button>
        {/* <img src={logo} alt="" /> */}
        <Logo />
      </section>

      <section className='post-list'>
        <h2>All Posts</h2>
        <div className='post-card'>
          <div className='card-creator'>
            <p> Angshu </p>
            <span>Read</span>
          </div>
          <img src={scene} alt="" />
          <div className='card-content'>
            <h4> Default Post </h4>
            <p>description : Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto aut, autem rerum esse illum nihil, veniam dicta ad</p>
          </div>
        </div>
        {
          Object.keys(postById).map(key => {
            const post = postById[key];
            return (
              <div key={post.id} className='post-card'>
                <div className='card-creator'>
                  <p> {post.created_by.split('@')[0]} </p>
                  <span onClick={()=>navigate('/post/'+post.id)} >Read</span>
                </div>
                <img src={post.cover_image} alt="" />
                <div className='card-content'>
                  <h4> {post.title} </h4>
                  <p>description : {post.description} </p>
                </div>
                <div className='card-bar'>
                  <span onClick={(event) => upvoteThePost(post.id)}>
                    <Upvote myclass={post.upvoted_by_user ? 'checked' : ''} votes={post.total_upvote} />
                  </span>
                  <span onClick={(event) => bookmarkThePost(post.id)}>
                    <Bookmark myclass={post.bookmarked_by_user ? 'checked' : ""} />
                  </span>
                  <span>
                    <Share />
                  </span>
                </div>
              </div>
            )
          })
        }



      </section>

    </div>
  )
}

export default Home