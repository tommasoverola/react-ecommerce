import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../redux/store'


export interface UserResponse {
  access_token: string
}

export interface LoginRequest {
  email: string
  password: string
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
        localStorage.setItem("token",token)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
