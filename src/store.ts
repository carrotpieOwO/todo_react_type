import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo } from './components/TodoForm';
import { Tag } from './components/TagList';
import { layoutType } from './components/LayoutButton';
import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(weekday)

const themeSlice = createSlice({
    name: 'theme',
    initialState: true,
    reducers: {
        changeTheme (state, action :PayloadAction<boolean>) {
            return action.payload
        }
    }
});

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
            console.log('payload', payload)
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
    editTarget: ''
}
const formSlice = createSlice({
    name: 'form',
    initialState: initialFormState,
    reducers: {
        setAddForm (state, action:PayloadAction<boolean>) {
            state.addForm = action.payload;
        },
        setEditForm (state, action:PayloadAction<string>) {
            state.editTarget = action.payload;
        }
    }
})

const selectedDaySlice = createSlice({
    name: 'selectedDay',
    initialState: dayjs().format('YYYY-MM-DD'),
    reducers: {
        setDay (state, action:PayloadAction<string>) {
            console.log('action', action.payload)
            return action.payload;
        }
    }
})

function createWeek(targetDate :Dayjs) {
    let weekArr = [];
    for(let i =0; i < 7; i++) {
        let targetDay = dayjs(targetDate).add(i, 'day').format('YYYY-MM-DD');    
        weekArr.push(targetDay)
    }
    return weekArr;
}

const firstDay = dayjs().weekday(0);
let initialWeekState :string[] = createWeek(firstDay);
const weekSlice = createSlice({
    name: 'week',
    initialState: initialWeekState,
    reducers: {
        setThisWeek (state) {
            let targetDay = dayjs().weekday(0);
            return createWeek(targetDay)            
        },
        setPrevWeek (state) {
            let targetDay = dayjs(state[0]).subtract(7, 'day').weekday(0);
            return createWeek(targetDay);
        },
        setNextWeek (state) {
            let targetDay = dayjs(state[0]).add(7, 'day').weekday(0);
            return createWeek(targetDay);        
        }
    }
})


const layoutSlice = createSlice({
    name: 'layout',
    initialState: 'board',
    reducers: {
        setLayout (state, action:PayloadAction<layoutType>) {
            return action.payload;
        }
    }
})

const filterSlice = createSlice({
    name: 'filter',
    initialState: 'all',
    reducers: {
        setFilter (state, action:PayloadAction<string>) {
            return action.payload;
        }
    }
})

const searchSlice = createSlice({
    name: 'search',
    initialState: '',
    reducers: {
        setSearch (state, action:PayloadAction<string>) {
            return action.payload.toUpperCase();
        }
    }
})

let store = configureStore({
    reducer: {
        theme : themeSlice.reducer,
        todo : todoSlice.reducer,
        tag : tagSlice.reducer,
        form : formSlice.reducer,
        selectedDay : selectedDaySlice.reducer,
        week : weekSlice.reducer,
        layout : layoutSlice.reducer,
        filter : filterSlice.reducer,
        search : searchSlice.reducer,
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export let { changeTheme } = themeSlice.actions
export let { addTodo, editTodo, deleteTodo, setDone } = todoSlice.actions
export let { addTag } = tagSlice.actions
export let { setAddForm, setEditForm } = formSlice.actions
export let { setDay } = selectedDaySlice.actions
export let { setThisWeek, setPrevWeek, setNextWeek } = weekSlice.actions
export let { setLayout } = layoutSlice.actions
export let { setFilter } = filterSlice.actions
export let { setSearch } = searchSlice.actions