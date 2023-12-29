import { combineSlices, createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: "credentials",
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
    }),
    tagTypes: ["Login", "Register"],
    endpoints: (build) => ({
        userLogIn: build.mutation({
            query: ({ username, password }) => ({
                url: "/api/users/login/",
                method: "POST",
                body: { username, password },
            }),
            invalidatesTags: ["Login"],
        }),
        userRegister: build.mutation({
            query: ({ username, password, email, first_name, last_name }) => ({
                url: "/api/users/register/",
                method: "POST",
                body: { username, password, email, first_name, last_name },
            }),
            invalidatesTags: ["Register", "Login"],
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
        userIsLoged: (state, {payload}) => ({...state, userData: {...payload}}),
        userLogout: (state) => ({...state, userData: null}),
    }
})

export const { useUserLogInMutation, useUserRegisterMutation } = userApi;
export const { userIsLoged, userLogout } = userSlice.actions;