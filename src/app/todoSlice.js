import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialStateFromLocal = () => {
  return (
    JSON.parse(localStorage.getItem("todos")) || {
      todos: [],
      completed:0,
      uncompleted:0
    }
  );
};

const todoSlice = createSlice({
  name: "todos",
  initialState: initialStateFromLocal(),
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos = [...state.todos, payload];
      todoSlice.caseReducers.calculateTotal(state)
    },
    removeTodo: (state, { payload }) => {
      state.todos = state.todos.filter((todo)=> todo.id !== payload)
      toast.success("Deleted !")
      todoSlice.caseReducers.calculateTotal(state)
    },
    changeStatusTodo: (state, { payload }) => {
      const item = state.todos.find((todo)=> todo.id == payload)
      item.completed = !item.completed
      if(item.completed) {
        toast.success("Completed !")
      } else {
        toast.success("Uncompleted !")
      }
      todoSlice.caseReducers.calculateTotal(state)
    },
    calculateTotal:(state) => {
      localStorage.setItem("todos", JSON.stringify(state))
      let completed = 0
      let uncompleted = 0
      state.todos.forEach((todo)=>{
        if(todo.completed){
          completed += 1 
        } else {
          uncompleted += 1
        }
      })
      state.completed = completed
      state.uncompleted = uncompleted
    }
  },
});

export const { addTodo, removeTodo, changeStatusTodo } = todoSlice.actions;
export default todoSlice.reducer;
