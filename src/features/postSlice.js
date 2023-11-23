import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addCommentApi,
    bookmarkPostApi,
    deletePostApi,
    getAllPostApi,
    getBookmarkedPostApi,
    getMyPostApi,
    getPostByIdApi,
    getPostCommentApi,
    upvotePostApi
} from "../api/post";

const initialState = {
    totalPost: 0,
    postFetched: 0,
    loading: false,
    postById: {

    },
    myPosts: {
        fetched: false,
        loading: false,
        postById: {

        }
    },
    bookmarkedPosts : {
        fetched: false,
        loading : false,
        postById : {

        }
    }
};

export const getMyPost = createAsyncThunk(
    'post/mypost',
    getMyPostApi
);

export const deletePost = createAsyncThunk(
    'post/delete',
    deletePostApi
);

export const upvotePost = createAsyncThunk(
    'post/upvote',
    upvotePostApi
);

export const bookmarkPost = createAsyncThunk(
    'post/bookmark',
    bookmarkPostApi
);

export const getAllPost = createAsyncThunk(
    'post/getall',
    getAllPostApi
);

export const getPostComment = createAsyncThunk(
    'post/comment',
    getPostCommentApi
)

export const getPostById = createAsyncThunk(
    'post/useid',
    getPostByIdApi
)

export const addComment = createAsyncThunk(
    'post/add/comment',
    addCommentApi
);

export const getBookmarkedPost = createAsyncThunk(
    'post/get/bookmarked',
    getBookmarkedPostApi
)

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyPost.pending, (state) => {
                state.myPosts.loading = true;
            })
            .addCase(getMyPost.fulfilled, (state, { payload }) => {
                state.myPosts.loading = false;
                state.myPosts.fetched = true;
                const { posts } = payload;
                posts.forEach(post => {
                    state.myPosts.postById[post.id] = { id: post.id };
                    state.postById[post.id] = post;
                });
            })
            .addCase(getMyPost.rejected, (state) => {
                state.myPosts.loading = false;
            })

            // delete post
            .addCase(deletePost.fulfilled, (state, { payload }) => {
                const post = state.myPosts.postById[payload.id];
                delete state.myPosts.postById[payload.id];
            })

            // upvote the post
            .addCase(upvotePost.pending, (state, action) => {
                const id = action.meta.arg.id;
                const st = state.postById[id].upvoted_by_user;
                state.postById[id].upvoted_by_user = !st;
                state.postById[id].total_upvote += st ? -1 : 1;
            })
            .addCase(upvotePost.rejected, (state, action) => {
                const id = action.meta.arg.id;
                const st = state.postById[id].upvoted_by_user;
                state.postById[id].upvoted_by_user = !st;
                state.postById[id].total_upvote += st ? -1 : 1;
            })


            // bookmark the post
            .addCase(bookmarkPost.pending, (state, action) => {
                const id = action.meta.arg.id;
                const st = state.postById[id].bookmarked_by_user;
                state.postById[id].bookmarked_by_user = !st;
                state.postById[id].bookmarked += st ? -1 : 1;
            })
            .addCase(bookmarkPost.fulfilled,(state,{ payload })=>{
                const { id } = payload;
                const st = state.postById[id].bookmarked_by_user;
                if( !st ){
                    delete state.bookmarkedPosts.postById[id];
                }
                else
                    state.bookmarkedPosts.postById[id] = { id };
            })
            .addCase(bookmarkPost.rejected, (state, action) => {
                const id = action.meta.arg.id;
                const st = state.postById[id].bookmarked_by_user;
                state.postById[id].bookmarked_by_user = !st;
                state.postById[id].bookmarked += st ? -1 : 1;
            })

            // get all post
            .addCase(getAllPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllPost.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getAllPost.fulfilled, (state, { payload }) => {
                const { posts,totalPosts } = payload;
                state.totalPost = totalPosts;
                state.postFetched += posts.length;
                posts.forEach(post=>{
                    state.postById[post.id] = post;
                });
            })


            // post comment
            .addCase(getPostComment.fulfilled,(state,{payload})=>{
                const { id,comments } = payload;
                // console.log(comments,id);
                state.postById[id].comments = comments;
            })


            // post by id 
            .addCase(getPostById.fulfilled,(state,{payload})=>{
                const { post,comment } = payload;
                state.postById[post.id] = post;
                state.postById[post.id].comments = comment;
            })


            // add comment 
            .addCase(addComment.fulfilled,(state,{ payload })=>{
                const { id,email,comment } = payload;
                if( !state.postById[id]?.comments )
                    state.postById[id].comments = [];

                state.postById[id].comments.push({
                    id : Math.random(),
                    post_id : id,
                    account_id : email,
                    comment
                })
            })

            // get bookmarked posts
            .addCase(getBookmarkedPost.pending,(state)=>{
                state.bookmarkedPosts.loading = true;
            })
            .addCase(getBookmarkedPost.rejected,(state)=>{
                state.bookmarkedPosts.loading = false;
            })
            .addCase(getBookmarkedPost.fulfilled,(state,{ payload })=>{
                state.bookmarkedPosts.loading = false;
                state.bookmarkedPosts.fetched = true;
                const { posts } = payload;
                posts.forEach(post=>{
                    state.bookmarkedPosts.postById[post.id] = { id : post.id };
                    state.postById[post.id] = post;
                })
            })
    }
});

export default postSlice.reducer;

export const {

} = postSlice.actions;

