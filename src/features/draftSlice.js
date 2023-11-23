import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createDraftApi, deleteDraftApi, getAllDraftsApi, publishDraftApi, updateDraftApi } from '../api/draft';


const noid = {
    id: 'noid',
    title: '',
    tags: [],
    content: '',
    description: '',
    cover_image: '',
    type: 'draft',
}

const initialState = {
    totalDraft: 0,
    loading: false,
    fetched: false,
    draftById: {},
    edit: {
        noid
    }
};

export const getAllDrafts = createAsyncThunk(
    'draft/getall',
    getAllDraftsApi
)

export const createDraft = createAsyncThunk(
    'draft/create',
    createDraftApi
);

export const updateDraft = createAsyncThunk(
    'draft/update',
    updateDraftApi
);

export const publishDraft = createAsyncThunk(
    'draft/publish',
    publishDraftApi
)

export const deleteDraft = createAsyncThunk(
    'draft/delete',
    deleteDraftApi
)

const draftSlice = createSlice({
    name: 'draft',
    initialState,
    reducers: {
        editDraft: (state, { payload }) => {
            const { draft } = payload;
            state.edit[draft.id] = draft;
        },
        addToEdit : (state,{ payload })=>{
            const { id } = payload;
            const draft = state.draftById[id];
            state.edit[id] = { ...draft };
        }
    },
    extraReducers: (builder) => {
        builder

            // get all the drafts
            .addCase(getAllDrafts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllDrafts.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.fetched = true;
                payload.drafts.forEach(elem => {
                    state.draftById[`${elem.id}`] = elem;
                });

                state.totalDraft = payload.drafts.length;
            })
            .addCase(getAllDrafts.rejected, (state) => {
                state.loading = false;
            })


            // create a new draft
            .addCase(createDraft.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDraft.fulfilled, (state, { payload }) => {
                state.loading = false;
                const { changes, type,id, ...edited } = state.edit['noid'];
                console.log(edited);
                state.draftById[payload.id] = { ...edited, id: payload.id }
                state.edit[payload.id] = { ...edited, id: payload.id };
                state.edit.noid = noid;
            })
            .addCase(createDraft.rejected, (state) => {
                state.loading = false;
            })

            // update the draft by id
            .addCase(updateDraft.fulfilled,(state,{ payload })=>{
                const { draft } = payload;
                state.draftById[draft.id] = {
                    ...state.draftById[draft.id],
                    ...draft
                };

                state.edit[draft.id] = {
                    ...state.edit[draft.id],
                    ...draft
                };
            })

            // publish draft
            .addCase(publishDraft.fulfilled,(state,{ payload })=>{
                delete state.draftById[payload.id]
                delete state.edit[payload.id];
            })
            

            .addCase(deleteDraft.fulfilled,(state,{ payload })=>{
                delete state.draftById[payload.id];
                delete state.edit[payload.id];
            })
    }
});

export default draftSlice.reducer;
export const {
    editDraft,
    addToEdit
} = draftSlice.actions;
