import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { refreshToken } from '../features/userSlice';

const ax = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

function usePrivateAxios() {

    let {access_token,refresh_token,token_type} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    

    useEffect(() => {
        const reqInterceptor = ax.interceptors.request.use(
            async (config) => {
                config.headers = {
                    ...config.headers,
                    Authorization : `Bearer ${access_token}`,
                    token_type,
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        const resInterceptor = ax.interceptors.response.use(
            (res)=>res,
            async (error)=>{
                let prevRequest = error?.config;
                try {
                    if( error?.response?.status==401 && prevRequest?.sent!==true ){
                        prevRequest.sent = true;
                        let res = await dispatch(refreshToken());
                        const { access_token } = res.payload;
                        
                        prevRequest.headers['Authorization'] = `Bearer ${access_token}`;
                        return ax(prevRequest);
                    }
                    else
                        throw new Error('refresh token expired login again');
                    
                } catch (error) {
                    return Promise.reject(error);
                }
            }
        );

        return () => {
            ax.interceptors.response.eject(resInterceptor);
            ax.interceptors.request.eject(reqInterceptor);
        }
    }, []);

    return ax;
}

export default usePrivateAxios;