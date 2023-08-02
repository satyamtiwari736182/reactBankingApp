import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userId: null,
        walletId: null
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },

        setWalletId: (state, action) => {
            state.walletId = action.payload;
        },

    },
});

export const { setUserId, setWalletId } = userSlice.actions;
export default userSlice.reducer;


