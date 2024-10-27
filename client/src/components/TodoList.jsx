/* eslint-disable react/prop-types */

import { MdDeleteForever } from "react-icons/md";
import { useAppContext } from "../context/appContext";

export default function TodoList({ todo }) {
  const { deleteTodo, editTodo } = useAppContext();

  //Delete the Todo form list
  function handleDeleteTodo(id) {
    deleteTodo(id);
  }

  function changeTodoToComplete(id) {
    // const IDPresent = false;
    // todos.forEach(todo=> todo._id === id && IDPresent= true)
    // if()
    editTodo(id);
  }

  return (
    <li className="list-none flex justify-between items-center px-10 h-14 text-gray-600 border-b-[1px]">
      <p>{todo.title}</p>
      <p
        className="bg-[#9BC1BC] px-4 rounded-md text-gray-50 text-md cursor-pointer hover:bg-[#8CC2AA] transition-all shadow-md"
        onClick={() => changeTodoToComplete(todo._id)}
        title="Change to complete"
      >
        {todo.status}
      </p>
      <p className="cursor-pointer" onClick={() => handleDeleteTodo(todo._id)}>
        <MdDeleteForever className="text-red-500 text-xl" />
      </p>
    </li>
  );
}
