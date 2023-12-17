import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: `http://78.24.216.128:3000/` }),
  tagTypes: ['TasksItem', 'Directions', 'User', 'Task-statuses'],
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    getAllList: build.query({
      query: (url) => `/tasks/${url}`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
          [
            ...result.map(({ id }: any) => ({ type: 'Tasks', id } as const)),
            { type: 'TasksItem', id: 'LIST' },
          ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
          [{ type: 'TasksItem', id: 'LIST' }],
    }),
    getTasksId: build.query({
      query: (id) => `/tasks/info/${id}`,
    }),

    addTask: build.mutation({
      query(body) {
        console.log(body);
        return {
          url: `tasks/`,
          method: 'POST',
          body
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'TasksItem', id: 'LIST' }],
    }),
    deleteTask: build.mutation({
      query: (id) => ({
        url: `/tasks/info/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'TasksItem', id: 'LIST' }]
    }),

    addUser: build.mutation({
      query(body) {
        console.log(body);
        return {
          url: `users/`,
          method: 'POST',
          body
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'User', id: 'USerList' }],
    }),

    getDirectionsList: build.query({
      query: (url) => `/directions/${url}`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
          [
            ...result.map(({ id }: any) => ({ type: 'Directions', id } as const)),
            { type: 'Directions', id: 'Dir' },
          ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
          [{ type: 'Directions', id: 'Dir' }],
    }),

    addDirection: build.mutation({
      query(body) {
        console.log(body);
        return {
          url: `directions/`,
          method: 'POST',
          body
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'Directions', id: 'Dir' }],
    }),
    addStatus: build.mutation({
      query(body) {
        console.log(body);
        return {
          url: `task-statuses/`,
          method: 'POST',
          body
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'Task-statuses', id: 'task-statuses' }],
    }),

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllListQuery,
  useGetTasksIdQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useAddUserMutation,
  useGetDirectionsListQuery,
  useAddDirectionMutation,
  useAddStatusMutation
} = tasksApi;
