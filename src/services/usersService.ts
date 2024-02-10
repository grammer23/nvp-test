import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@/libs'
import { UsersResponse } from '@/types/type'

export const userApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://dummyjson.com/'
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, number>({
      query: (limit: number) => ({
        url: `users?limit=${limit}`,
        method: 'GET'
      }),
      merge: (currentCache, newItems) => {
        currentCache.users.push(...newItems.users)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      }
    }),
    getUserDetail: builder.query<Pick<UsersResponse, 'users'>['users'][0], string>({
      query: (id: string) => ({
        url: `users/${id}`,
        method: 'GET'
      })
    })
  })
})

export const { useGetUsersQuery, useGetUserDetailQuery } = userApi