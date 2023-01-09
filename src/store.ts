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
            const payload = action.payload;
            const targetIndex = state.findIndex(todo => todo.id === payload.id);
            state[targetIndex].todo = payload.todo;
            state[targetIndex].date = payload.date;
            state[targetIndex].time = payload.time;
            state[targetIndex].tag = payload.tag;
        },
        deleteTodo (state, action :PayloadAction<string>) {
            const targetIndex = state.findIndex(todo => todo.id === action.payload);
            state.splice(targetIndex, 1);
        },
        // action.payload = [id, done]
        setDone (state, action:PayloadAction<[string, boolean]>) {
            const targetIndex = state.findIndex(todo => todo.id === action.payload[0]);
            state[targetIndex].done = action.payload[1];            
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

const initialFormState = {
    addForm: false,
    editform: false
}

const formSlice = createSlice({
    name: 'form',
    initialState: initialFormState,
    reducers: {
        setAddForm (state, action:PayloadAction<boolean>) {
            state.addForm = action.payload;
        },
        setEditForm (state, action:PayloadAction<boolean>) {
            state.editform = action.payload;
        }
    }
})

let store = configureStore({
    reducer: {
        todo : todoSlice.reducer,
        tag : tagSlice.reducer,
        form : formSlice.reducer,
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export let { addTodo, editTodo, deleteTodo, setDone } = todoSlice.actions
export let { addTag } = tagSlice.actions
export let { setAddForm, setEditForm } = formSlice.actions