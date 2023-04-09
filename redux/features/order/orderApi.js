import { apiSlice } from "../api/orderApiSlice";


export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
        query: (data) => `/orders?type=${data}`,
        keepUnusedDataFor: 600,
    }),
    addOrder: builder.mutation({
        query: (data) => ({
            url: "/orders",
            method: "POST",
            body: data,
        })
    })
}),
});
export const { useGetOrdersQuery ,useAddOrderMutation} = orderApiSlice;