import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: null,
    title: "",
    coverPhoto: "",
    details: "",
    accountID: "",
}


export const bucketSlice = createSlice({
    name: "bucket",
    initialState,
    reducers: {
        updateField:(state, action) => {
            state[action.payload.field] = action.payload.value;
        },
        showModal: (state, action) => {
            state.show = action.payload
        },
        clearForm: () => {
            return initialState;
        },
    },
})

export const { clearForm, updateField, showModal } = bucketSlice.actions;

export const CREATE_BUCKET_MODAL = "CREATE_BUCKET_MODAL"