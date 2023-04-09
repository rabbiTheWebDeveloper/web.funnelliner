import { apiSlice } from "../api/orderApiSlice";


export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategorys: builder.query({
        query: () => `/categories`,
        keepUnusedDataFor: 600,
    }),
    category: builder.query({
        query: (id) => `/categories/${id}`,
        keepUnusedDataFor: 600,
    }),
    addCategory: builder.mutation({
        query: (data) => ({
            url: "/categories",
            method: "POST",
            body: data,
        })
    })
}),
});
export const { useGetCategorysQuery ,useCategoryQuery ,useAddCategoryMutation} = categoryApi;