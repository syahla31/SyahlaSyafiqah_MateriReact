import React, { useState } from 'react';

const HookForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', age: '' });
  const [tableData, setTableData] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableData([...tableData, formData]);
    setFormData({ name: '', email: '', age: '' });
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', age: '' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-50 p-6">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">✨ Mini Form ✨</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg border-2 border-pink-200">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-pink-600">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border-2 border-pink-200 rounded-md focus:outline-none focus:border-pink-400 bg-pink-50"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-pink-600">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border-2 border-pink-200 rounded-md focus:outline-none focus:border-pink-400 bg-pink-50"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-semibold text-pink-600">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border-2 border-pink-200 rounded-md focus:outline-none focus:border-pink-400 bg-pink-50"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-400 text-white p-3 rounded-md hover:bg-pink-500 transition-colors duration-200"
        >
          ✨ Submit ✨
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="w-full mt-4 bg-pink-200 text-pink-700 p-3 rounded-md hover:bg-pink-300 transition-colors duration-200"
        >
          Reset
        </button>
      </form>

      <div className="mt-8 w-full max-w-4xl overflow-x-auto">
        <h2 className="text-2xl font-bold text-pink-700 mb-4">💖 Submitted Data 💖</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border-2 border-pink-200">
          <thead>
            <tr className="border-b bg-pink-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-pink-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-pink-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-pink-700">Age</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-3 text-center text-sm text-pink-500">No data submitted yet ✨</td>
              </tr>
            ) : (
              tableData.map((row, index) => (
                <tr key={index} className="border-b border-pink-100 hover:bg-pink-50">
                  <td className="px-6 py-3 text-sm text-pink-600">{row.name}</td>
                  <td className="px-6 py-3 text-sm text-pink-600">{row.email}</td>
                  <td className="px-6 py-3 text-sm text-pink-600">{row.age}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HookForm;