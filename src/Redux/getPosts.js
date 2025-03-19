import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nt-devconnector.onrender.com/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("x-auth-token", token);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts",
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
