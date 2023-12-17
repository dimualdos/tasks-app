import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _directionsListApi, _dnsApiPartner } from '../../utils/srm-api';

export const fetchTodos = createAsyncThunk(
    'tasks/fetchTodos',
    async function (_, { rejectWithValue }) {
        try {
            //const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=18');
            const response = await fetch(`${_dnsApiPartner}?perfomer=${localStorage.getItem("Mail_Data")}`, {
                method: `GET`,
                mode: 'no-cors',
                // cache: 'no-cache',
                // credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem("JWT_Token")}`
                },

                // body: JSON.stringify({
                //     perfomer: localStorage.getItem("Mail_Data"),
                // })
            });

            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const fetchStatuseServer = createAsyncThunk(
    'data-lists/fetchStatuseServer',
    async function (_, { rejectWithValue }) {
        try {
            //const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=18');
            const response = await fetch(`${_directionsListApi}/task-statuses/list`);

            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);


export const fetchDirectionServer = createAsyncThunk(
    'data-lists/fetchDirectionServer',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(`${_directionsListApi}/directions/list`);

            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const fetchUsers = createAsyncThunk(
    'data-lists/fetchUsers',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(`${_directionsListApi}/users/list`);
            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

// export const deleteTodo = createAsyncThunk(
//     'todos/deleteTodo',
//     async function (id, { rejectWithValue, dispatch }) {
//         try {
//             const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
//                 method: 'DELETE',
//             })

//             if (!response.ok) {
//                 throw new Error('Can\'t delete task. Server error.');
//             }

//             dispatch(removeTodo({ id }));

//         } catch (error: any) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// export const toggleStatus = createAsyncThunk(
//     'todos/toggleStatus',
//     async function (id, { rejectWithValue, dispatch, getState }) {
//         const todo = getState().todos.todos.find(todo => todo.id === id);

//         try {
//             const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     completed: !todo.completed,
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error('Can\'t toggle status. Server error.');
//             }

//             dispatch(toggleComplete({ id }));

//         } catch (error: any) {
//             return rejectWithValue(error.message)
//         }
//     }
// );

// export const addNewTodo = createAsyncThunk(
//     'todos/addNewTodo',
//     async function (text, { rejectWithValue, dispatch }) {
//         try {
//             const todo = {
//                 title: text,
//                 userId: 1,
//                 completed: false,
//             };

//             const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(todo)
//             });

//             if (!response.ok) {
//                 throw new Error('Can\'t add task. Server error.');
//             }

//             const data = await response.json();
//             dispatch(addTodo(data));

//         } catch (error: any) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

const setError = (state: { statusMessage: string; errorMessage: any; }, action: { payload: any; }) => {
    state.statusMessage = 'rejected';
    state.errorMessage = action.payload;
}

interface ITaskReduser {
    tasks: any,
    statusMessage: string,
    errorMessage: {} | null
}
interface IDataListsReduser {
    statuseList: [],
    directionsList: [],
    usersList: [],
    statusMessage: string,
    errorMessage: {} | null
}

export const initialStateTask: ITaskReduser = {
    tasks: [],
    statusMessage: '',
    errorMessage: null
}

export const initialStateDataLists: IDataListsReduser = {
    statuseList: [],
    directionsList: [],
    usersList: [],
    statusMessage: '',
    errorMessage: null
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialStateTask,
    reducers: {
        // addTodo(state, action) {
        //     state.todos.push(action.payload);
        // },
        // toggleComplete(state, action) {
        //     const toggledTodo = state.todos.find((todo: { id: any; }) => todo.id === action.payload.id);
        //     toggledTodo.completed = !toggledTodo.completed;
        // },
        // removeTodo(state, action) {
        //     state.todos = state.todos.filter((todo: { id: any; }) => todo.id !== action.payload.id);
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.statusMessage = 'loading';
                state.errorMessage = false;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.statusMessage = 'resolved';
                state.tasks = action.payload;
            })

            .addCase(fetchTodos.rejected, setError)

    },
});

const directionSlice = createSlice({
    name: 'data-lists',
    initialState: initialStateDataLists,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatuseServer.pending, (state) => {
                state.statusMessage = 'loading';
                state.errorMessage = false;
            })
            .addCase(fetchStatuseServer.fulfilled, (state, action) => {
                state.statusMessage = 'resolved';
                state.statuseList = action.payload;
            })
            .addCase(fetchStatuseServer.rejected, setError)

            .addCase(fetchDirectionServer.pending, (state) => {
                state.statusMessage = 'loading';
                state.errorMessage = false;
            })
            .addCase(fetchDirectionServer.fulfilled, (state, action) => {
                state.statusMessage = 'resolved';
                state.directionsList = action.payload;
            })
            .addCase(fetchDirectionServer.rejected, setError)

            .addCase(fetchUsers.pending, (state) => {
                state.statusMessage = 'loading';
                state.errorMessage = false;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.statusMessage = 'resolved';
                state.usersList = action.payload;
            })
            .addCase(fetchUsers.rejected, setError)
    },
});




// const { addTodo, removeTodo, toggleComplete } = todoSlice.actions;
export default directionSlice.reducer;
