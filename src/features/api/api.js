import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ['Users', 'Positions'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ USERS_COUNT, page }) =>
        `/users?page=${page}&count=${USERS_COUNT}`,
      transformResponse: (response) => {
        return {
          ...response,
          users: response.users.sort(
            (a, b) => b.registration_timestamp - a.registration_timestamp //Transforming the response to sort all the users descending
          ),
        };
      },
      providesTags: ['Users'],
      keepUnusedDataFor: 0, //Caching is a great feature but we don't need it in this app as we want to send request every time
    }),
    getPositions: builder.query({
      query: () => '/positions',
      providesTags: ['Positions'],
    }),
    registerUser: builder.mutation({
      query: ({ token, userData }) => ({
        url: '/users',
        method: 'POST',
        headers: {
          token,
        },
        body: userData,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetPositionsQuery,
  useRegisterUserMutation,
} = api;
