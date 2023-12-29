import { combineSlices, createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: "credentials",
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
    }),
    tagTypes: ["Login"],
    endpoints: (build) => ({
        userLogIn: build.mutation({
            query: ({ username, password }) => ({
                url: "/api/users/login/",
                method: "POST",
                body: { username, password },
            }),
            invalidatesTags: ["Login"],
        }),
    }),
});

const initialState = {
    userData:
        localStorage.getItem("userData")
            ? JSON.parse(localStorage.getItem("userData"))
            : null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userIsLoged: (state, action) => ({...state, ...action.payload}),
        userLogout: (state) => ({...state, userData: null})
    }
})

export const { useUserLogInMutation } = userApi;
export const { userIsLoged, userLogout } = userSlice.actions;