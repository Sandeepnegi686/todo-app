import { useState } from "react";
import { useAppContext } from "../context/appContext";
import TodoList from "../components/TodoList";

const Home = () => {
  const { todos, addTodo } = useAppContext();

  // console.log(todos);
  const [todo, setTodo] = useState("");

  //Adding todo to the list
  function handleAddTodo(e) {
    e.preventDefault();
    if (!todo) return;
    // const todoMap = { title: todo, status: "pending", id: Date.now() };
    // setTodos((todo) => [...todo, todoMap]);.
    addTodo(todo);
    setTodo("");
  }

  return (
    <div className="w-full min-h-full">
      <div className="conatiner max-w-4xl my-0 mx-auto h-full w-[90%]">
        <div className="box rounded-2xl overflow-hidden mt-20 shadow-xl">
          <div className="box-head bg-[#57568E] min-h-24">
            <h2 className="text-white text-center font-light text-4xl uppercase">
              TODO lists
            </h2>
          </div>
          <div className="box-content bg-slate-100 pb-12 relative">
            <form className="todo-input-box flex flex-col justify-evenly gap-5 items-center rounded-xl bg-white w-[90%] my-0 mx-auto py-7 shadow-xl">
              <input
                type="text"
                name=""
                id=""
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                className="text-xl max-w-[300px] w-[95%] border-b-[1px] border-[#57568E] focus:outline-none pl-[3px] pb-[1px]"
                placeholder="What would you like to do?"
              />
              <button
                className="bg-orange-600 hover:bg-orange-700 transition-all max-w-40 w-32 text-md text-white rounded-md shadow-xl p-1"
                type="submit"
                onClick={(e) => handleAddTodo(e)}
              >
                Add
              </button>
            </form>
            {/* absolute top-[-20%] left-[50%] translate-x-[-50%] */}
            <div className="todo-show-box mt-6 py-6 rounded-xl shadow-xl mx-auto w-[90%] bg-white">
              {todos.length > 0 ? (
                <>
                  <h2 className="head text-xl font-bold pl-6 py-6">
                    Todo List
                  </h2>
                  <div className="list">
                    <li className="list-none flex justify-between items-center text-gray-700 bg-[#F9F9F9] h-10 px-10">
                      <p>List </p> <p>Status</p> <p>Close</p>
                    </li>
                    {todos.map((todo, index) => (
                      <TodoList key={index} todo={todo} />
                    ))}
                  </div>
                </>
              ) : (
                <h2 className="text-xl font-bold pl-6">No Todos to show</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
