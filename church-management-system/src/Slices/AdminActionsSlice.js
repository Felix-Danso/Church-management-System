import { createSlice } from "@reduxjs/toolkit";
// import { alerts } from "../Utility/alerts";
// import { AxiosPrivate } from "axios";

const initialState = {
    status: 'idle',
    searchField: '',
    isModalOpen: false,

}

export const adminActionsSlice = createSlice({
    name: 'adminDoctors',
    initialState,
    reducers: {
        setSearchField: (state, action) => {
            state.searchField = action.payload;
        },
        setIsModalOpen: (state, action) => {
            state.isModalOpen = !state.isModalOpen;
        },
    },
});
export const { setSearchField,setIsModalOpen } = adminActionsSlice.actions;
export default adminActionsSlice.reducer