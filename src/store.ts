import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo } from './components/TodoForm';
import { Tag } from './components/TagList';

const initialTodoState :Todo[] = [];
const todoSlice = createSlice({
    name: 'todo',
    initialState: initialTodoState,
    reducers: {
        addTodo (state, action:PayloadAction<Todo>) {
            state.push(action.payload);
        },
        editTodo (state, action :PayloadAction<Todo>) {

        },
        deleteTodo (state, action :PayloadAction<string>) {

        }
    }
})

const initialTagState :Tag[] = [];
const tagSlice = createSlice({
    name: 'tag',
    initialState: initialTagState,
    reducers: {
        addTag (state, action:PayloadAction<Tag>) {
            state.push(action.payload);
        }
    }
});

let store = configureStore({
    reducer: {
        todo : todoSlice.reducer,
        tag : tagSlice.reducer,
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export let { addTodo, editTodo, deleteTodo } = todoSlice.actions
export let { addTag } = tagSlice.actions