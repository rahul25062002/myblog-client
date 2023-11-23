import { toast } from 'react-toastify';

export const getAllDraftsApi = async ({ ax }, thunkApi) => {
    try {
        const res = await ax.get('draft');
        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || "some error occured";
        return thunkApi.rejectWithValue({ message });
    }
};

export const createDraftApi = async ({ ax, draft, navigate }, thunkApi) => {
    const t = toast.loading('Creating Draft ... ');

    try {
        const res = await ax.post('draft/create', {
            draft
        });

        toast.update(t, {
            render: 'Draft created',
            type: 'success',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });

        // console.log(res.data);
        let to = '/editor/edit/' + res.data.id;
        navigate(to);
        return { ...res.data, draft };
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
}

export const updateDraftApi = async ({ ax, draft,setChanges }, thunkApi) => {
    const t = toast.loading('Updating Draft ... ');

    // console.log(draft);
    try {
        const res = await ax.put('draft/' + draft.id, {
            draft
        });

        toast.update(t, {
            render: 'Draft updated',
            type: 'success',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });
        setChanges({});
        return { draft };

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

export const publishDraftApi = async ({ id, navigate, ax }, thunkApi) => {
    const t = toast.loading('Publishing Post ... ');

    try {
        const res = await ax.get('draft/publish/' + id);

        toast.update(t, {
            render: 'Draft published',
            type: 'success',
            autoClose: true,
            isLoading: false,
            closeOnClick: true
        });

        navigate('/post/' + id);
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
}

export const deleteDraftApi = async ({ id, ax }, thunkApi) => {
    const t = toast.loading('Deleting Draft ... ');

    try {
        await ax.delete('draft/' + id);
        toast.update(t, {
            render: 'Draft Deleted',
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
}
