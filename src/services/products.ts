import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from '../models/Product'



// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/',
    prepareHeaders: (headers ) => {
      const token = localStorage.getItem("jwt-token")
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], {}>({
      query: ({skip = '0',limit}: {skip?:string, limit?:string}) => `/products?skip=${skip}&limit=${limit}`,
      providesTags: ['Products'],
    }),
    getSingleProduct: builder.query<Product,{}>({
      query:(id:number)=> `/products/${id}`
    }),
    updateSingleProduct: builder.mutation<Product, {id:number, title:string, price:string}>({
      query: ({id, title, price}) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: {title,price},
      }),
      invalidatesTags: ['Products']
    }),

    deleteSingleProduct: builder.mutation<null, {id:number}>({
      query: ({id}) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products']
    }),
    createSingleProduct: builder.mutation<null, { title:string, price:string, img:string}>({
      query: ({title,price,img}) => ({
        url: `/products`,
        method: 'POST',
        body: {title,price,thumbnail:img},

      }),
      invalidatesTags: ['Products']
    }),
  }),
})


export const { 
  useGetProductsQuery,
  useGetSingleProductQuery,
  useUpdateSingleProductMutation, 
  useDeleteSingleProductMutation,
  useCreateSingleProductMutation
} = productsApi