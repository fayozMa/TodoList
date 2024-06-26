import "./App.css";
//react imports
import { useRef } from "react";
//rht
import toast from "react-hot-toast";
//redux
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, changeStatusTodo } from "./app/todoSlice";
function App() {
  const inputText = useRef();
  const { todos , uncompleted , completed } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputText.current.value.trim();
    if (value) {
      dispatch(
        addTodo({
          id: Math.random(),
          text: value,
          completed: false,
        })
      );
      toast.success("Added successfuly!");
    } else {
      toast.error("Please write something!");
    }
    inputText.current.value = "";
  };
  return (
    <div>
      <h1 className="mb-5">Todo List - {todos.length}</h1>
      <div className=" flex gap-5 justify-center mb-5">
        <h4>Competed: {completed}</h4>
        <h4>Uncompeted: {uncompleted}</h4>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-5">
        <label htmlFor="input">
          Text:
          <input
            ref={inputText}
            className="input ml-5 input-primary"
            type="text"
            id="input"
          />
        </label>
        <button className="btn btn-primary">Add</button>
      </form>

      <ul className="flex gap-9 flex-col mt-5">
        {todos.map((todo) => {
          return (
            <li className="list-none border p-5" key={todo.id}>
              <h1 className={todo.completed ? "line-through" : ""}>{todo.text}</h1>
              <div className=" flex gap-5 items-center justify-center mt-4">
                <input
                  type="checkbox"
                  className="checkbox checkbox-success"
                  onClick={() => dispatch(changeStatusTodo(todo.id))}
                  checked={todo.completed}
                  readOnly
                />
                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="btn btn-secondary"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
