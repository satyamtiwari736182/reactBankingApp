import { createSlice } from "@reduxjs/toolkit";

export const utilsSlice = createSlice({
    name: "utils",
    initialState: {
        isAmountChaged: false
    },
    reducers: {
        setIsAmountChanged: (state, action) => {
            state.isAmountChaged = action.payload;
        },

    },
});

export const { setIsAmountChanged } = utilsSlice.actions;
export default utilsSlice.reducer;


