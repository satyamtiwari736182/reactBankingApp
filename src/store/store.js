import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import utilsSlice from "./utilsSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        utils: utilsSlice
    },
});

export default store;
