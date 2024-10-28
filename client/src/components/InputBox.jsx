export default function InputBox({ type, label, name, handleChange, value }) {
  return (
    <>
      <div className="input-feild flex flex-col py-2">
        <label htmlFor={type} className="pl-2 text-lg text-gray-600">
          {label || name}
        </label>
        <input
          type={type}
          name={name}
          id={type}
          onChange={(e) => handleChange(e.target.value)}
          value={value}
          required
          className="border border-gray-300 rounded-md mt-1 py-1 px-2 focus:outline-none"
        />
      </div>
    </>
  );
}
