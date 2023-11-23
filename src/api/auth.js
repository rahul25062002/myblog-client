import axios from "axios";
import { toast } from "react-toastify";

const ax = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});


export const registerUserJwtApi = async ({ email, password, username, avatar, navigate }) => {
    const t = toast.loading('Registering user ... ');

    // console.log(email,password,username);
    try {
        await ax.post('auth/register/jwt', {
            email,
            password,
            username,
            avatar
        });
        toast.update(t, {
            render: 'User Registered',
            type: 'success',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });

        navigate('/login')

    } catch (error) {
        const message = error?.response?.data?.message || "some error occured";
        console.log('here');
        toast.update(t, {
            render: message,
            type: 'error',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });
    }
};

export const loginUserJwtApi = async ({ email, password, navigate, to }, thunkApi) => {
    const t = toast.loading('Logging in ... ');
    // console.log(body, thunkApi);
    try {
        const res = await ax.post('auth/login/jwt', {
            email,
            password
        });
        toast.update(t, {
            render: 'User Logged in',
            type: 'success',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });

        navigate(to);
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
        return thunkApi.rejectWithValue({ message: error.response.data.message });
    }
};

export const loginUserGithubApi = async ({ codeParam, navigate, to }, thunkApi) => {

    const t = toast.loading('Logging in ... ');
    try {
        const res = await axios.get('http://localhost:5000/auth/login/github', {
            headers: {
                code: codeParam
            }
        });

        toast.update(t, {
            render: 'User Logged in',
            type: 'success',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });

        navigate(to);
        return res.data;
    }
    catch (error) {
        const message = error?.response?.data?.message || "some error occured";
        toast.update(t, {
            render: message,
            type: 'error',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });
        return thunkApi.rejectWithValue({ message: error.response.data.message });
    }
};

export const autoLoginApi = async ({ refresh_token, token_type, navigate, to }, thunkApi) => {
    const tst = toast.loading('Logging in ... ', {
        closeOnClick: true
    });

    try {
        let res;
        if (token_type === 'JWT')
            res = await ax.post('auth/autologin/jwt', {
                refresh_token
            });
        else
            res = await ax.post('auth/autologin/github', {
                refresh_token
            });

        toast.update(tst, {
            render: 'User Logged in',
            type: 'success',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        })
        navigate(to);
        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "some error occured";
        toast.update(tst, {
            render: message,
            type: 'error',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });
        return thunkApi.rejectWithValue({ message: error.response.data.message });
    }
};

export const refreshTokenApi = async (thunkApi) => {

    const { refresh_token, token_type } = JSON.parse(
        localStorage.getItem('myblog-token')
    );
    try {
        let res = {};

        if (!refresh_token || !token_type)
            throw new Error('token not found');

        if (token_type === 'JWT')
            res = await ax.post('auth/refresh/jwt', {
                refresh_token
            });
        else
            res = await ax.post('auth/refresh/github', {
                refresh_token
            });

        return {
            ...res.data,
            token_type
        };

    } catch (error) {
        const message = error?.response?.data?.message || "some error occured";
        return thunkApi.rejectWithValue({ message });

    }
};

export const uploadImageApi = async (image) => {
    
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'myblog-angshu');
    data.append('cloud_name', 'myblog-angshu');


    try {
        let res = await fetch("https://api.cloudinary.com/v1_1/myblog-angshu/image/upload", {
            method: 'post',
            body: data,
        }).then(res => res.json());

        return res.url;
    } catch (error) {
        toast.error('image not uploaded');
        return Promise.reject( error );
    }
}