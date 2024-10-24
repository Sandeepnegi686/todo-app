import "./App.css";
import { MdDeleteForever } from "react-icons/md";

function App() {
  return (
    <div className="w-full min-h-full">
      <div className="conatiner max-w-4xl my-0 mx-auto h-full w-[90%]">
        <div className="box rounded-2xl overflow-hidden mt-20 shadow-xl">
          <div className="box-head bg-[#57568E] min-h-24">
            <h2 className="text-white text-center font-light text-4xl uppercase">
              TODO list
            </h2>
          </div>
          <div className="box-content bg-slate-100 pb-12 relative">
            <div className="todo-input-box flex flex-col justify-evenly gap-5 items-center rounded-xl bg-white w-[90%] my-0 mx-auto py-7 shadow-xl">
              <input
                type="text"
                name=""
                id=""
                className="text-xl max-w-[300px] w-[95%] border-b-[1px] border-[#57568E] focus:outline-none pl-[3px] pb-[1px]"
                placeholder="What would you like to do?"
              />
              <button className="bg-orange-600 hover:bg-orange-700 transition-all max-w-40 w-32 text-md text-white rounded-md shadow-xl p-1">
                Add
              </button>
            </div>
            {/* absolute top-[-20%] left-[50%] translate-x-[-50%] */}
            <div className="todo-show-box mt-6 py-6 rounded-xl shadow-xl mx-auto w-[90%] bg-white">
              <h2 className="head text-xl font-bold pl-6 py-6">Todo List</h2>
              <div className="list">
                <table className="w-full">
                  <thead className="bg-[#F1F5F9]">
                    <tr className="text-gray-400 py-40">
                      <th className="font-normal text-md py-2">List</th>
                      <th className="font-normal text-md py-2">Status</th>
                      <th className="font-normal text-md py-2">Close</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr className="py-2">
                      <td>Go to gym</td>
                      <td className="bg-[#9BC1BC] w-20 rounded-md text-white font-medium shadow-md py-[1px]">
                        pending
                      </td>
                      <td className="text-center">
                        <MdDeleteForever className="text-red-500 text-lg" />
                      </td>
                    </tr>
                    <tr>
                      <td>Go to gym</td>
                      <td>pending</td>
                      <td>
                        <MdDeleteForever className="text-red-500 text-lg" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
