import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  tagTypes: ['Todos'],
  endpoints: builder => ({
    getTodos: builder.query({
      query: () => '/todos',
      transformResponse: response => response.sort((a, b) => b.id - a.id), // Sort by id in descending order
      providesTags: ['Todos']
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: '/todos',
        method: 'POST',
        body: newTodo
      }),
      invalidatesTags: ['Todos']
    }),
    updateTodo: builder.mutation({
      query: (updatedTodo) => ({
        url: `/todos/${updatedTodo.id}`,
        method: 'PATCH',
        body: updatedTodo
      }),
      invalidatesTags: ['Todos']
    }),
    deleteTodo: builder.mutation({
      query: ({id}) => ({
        url: `/todos/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Todos']
    })
    })
})

export const {
     useGetTodosQuery,
     useAddTodoMutation,
     useUpdateTodoMutation,
     useDeleteTodoMutation } = apiSlice