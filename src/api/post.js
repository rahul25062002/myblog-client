import axios from "axios";
import { toast } from "react-toastify";

const ax = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

export const getPostByIdApi = async ({ id, email }) => {
    try {
        const res = await ax.get(`post/useid?id=${id}&email=${email}`);

        return res.data;
    } catch (error) {
        return new Error(error);
    }
};

export const getPostCommentApi = async ({ id }, thunkApi) => {
    try {
        const res = await ax.get(`post/postcomment/` + id);
        return { id,...res.data };
    } catch (error) {
        const message = error?.response?.data?.message || "some error occured";
        return thunkApi.rejectWithValue({
            message,
            error
        });
    }
}

export const addCommentApi = async ({ id, email, comment, ax },thunkApi) => {
    const t = toast.loading('Posting comment .... ');

    try {
        await ax.post('post/comment', {
            id,
            comment
        });
        toast.update(t, {
            render: 'Comment saved',
            type: 'success',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });

        return { id,email,comment };
    } catch (error) {
        const message = error?.response?.data?.message || "some error occured";
        toast.update(t, {
            render: message,
            type: 'error',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });
        return thunkApi.rejectWithValue({ message });
    }
}

export const getMyPostApi = async ({ ax }, thunkApi) => {
    const t = toast.loading('Fetching Posts .... ');
    try {

        const res = await ax.get('post/useemail');

        toast.update(t, {
            render: 'Posts Fetched',
            type: 'success',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });

        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "some error occured";
        toast.update(t, {
            render: message,
            type: 'error',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });
        return thunkApi.rejectWithValue({ message });
    }
};

export const deletePostApi = async ({ ax, id }, thunkApi) => {
    const t = toast.loading('Deleting Posts .... ');

    try {
        await ax.delete('post/' + id)
        toast.update(t, {
            render: 'Post Deleted',
            type: 'success',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });

        return { id };
    } catch (error) {
        const message = error?.response?.data?.message || "some error occured";
        toast.update(t, {
            render: message,
            type: 'error',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });
        return thunkApi.rejectWithValue({ message });

    }
};

export const upvotePostApi = async ({ ax, id,loggedIn }, thunkApi) => {

    if( !loggedIn ){
        toast('Login to upvote');
        return;
    }
    try {
        const res = await ax.put('post/upvote/' + id);
        return res.data;

    } catch (error) {
        const message = error?.response?.data?.message || "some error occured";
        toast("couldn't upvote the post", {
            type: 'error',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });

        return thunkApi.rejectWithValue({ message });
    }
};

export const bookmarkPostApi = async ({ ax, id,loggedIn }, thunkApi) => {

    if( !loggedIn ){
        toast('login to bookmark');
        return;
    }
    try {
        const res = await ax.put('post/bookmark/' + id);

        return { id };

    } catch (error) {
        const message = error?.response?.data?.message || "some error occured";
        toast("couldn't bookmark the post", {
            type: 'error',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });

        return thunkApi.rejectWithValue({ message, id });
    }
};

export const getAllPostApi = async ({ email, offset }, thunkApi) => {
    try {
        const res = await ax.get(`post/allpost?email=${email}&offset=${offset}`);
        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "some error occured";
        return thunkApi.rejectWithValue({ message });
    }
};

export const getBookmarkedPostApi = async({ ax },thunkApi)=>{
    const t = toast.loading('Fetching bookmarks.... ');

    try {
        const res = await ax.get('post/bookmark');
        toast.update(t, {
            render: 'bookmarks fetched',
            type: 'success',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });

        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "some error occured";
        toast.update(t, {
            render: message,
            type: 'error',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });
        return thunkApi.rejectWithValue({ 
            message,
            error
        });
    }
};