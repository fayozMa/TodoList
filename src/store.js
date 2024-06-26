import { configureStore } from "@reduxjs/toolkit";
import todosReduser from "./app/todoSlice"
export const store = configureStore({
    reducer: {
        todos:todosReduser
    },
})
