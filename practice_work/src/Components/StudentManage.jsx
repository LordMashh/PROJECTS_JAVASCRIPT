import React, { useState } from "react";

const StudentManage = () => {
    const [student, setStudent] = useState([]);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    roll_no: "",
    marks: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleCloseModal = () => {
    setModal(false);
    setFormData({ name: "", roll_no: "", marks: "" });
    setEditIndex(null);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleAddStudent = () => {
    if (editIndex !== null) {
      const updatedStudents = [...student];
      updatedStudents[editIndex] = formData;
      setStudent(updatedStudents);
      handleCloseModal();
    } else {
      setStudent([...student, formData]);
      handleCloseModal();
    }
  };
  const handleEdit = (index) => {
    setModal(true);
    setFormData(student[index]);
    setEditIndex(index);
  };
  const handleDelete = (index) => {
    const updatedStudents = student.filter((_,i) => i != index );
    setStudent(updatedStudents);
  };
  return (
    <div className=" container mx-auto mt-5">
      <div className="flex justify-center items-center flex-col gap-4">
        <h1 className="text-3xl font-bold">Student Management</h1>

        <button
          className="flex justify-center items-center mt-5 bg-blue-500 p-2 text-white rounded-lg  outline-none "
          onClick={() => setModal(true)}
        >
          Add students
        </button>
      </div>

      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="">Name</th>
            <th className="">RollNo</th>
            <th className="">Marks</th>
            <th className="">Actions</th>
          </tr>
        </thead>
        <tbody>
          {student.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.roll_no}</td>
              <td>{item.marks}</td>
              <td className="flex justify-center items-center gap-4">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded font-bold"
                onClick={() => handleEdit(index)}>Edit</button>
                <button className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded font-bold"
                onClick={() => handleDelete(index)}>Delete</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div className="fixed inset-0 flex justify-center items-center bg-slate-500  bg-opacity-50  ">
          <div className="bg-white p-6 w-1/2 rounded-lg">
            <div className="text-red-400 text-xl font-bold ">
              Add Students Details
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-500 text-lg my-2 "
                htmlFor="name"
              >
                Enter name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-slate-600"
                placeholder="Enter name"
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInput}
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-500 text-lg my-2 "
                htmlFor="name"
              >
                Enter Roll Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-slate-600"
                placeholder="Enter Roll Number"
                type="text"
                name="roll_no"
                id="roll_no"
                value={formData.roll_no}
                onChange={handleInput}
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-500 text-lg my-2 "
                htmlFor="name"
              >
                Enter Marks
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-slate-600"
                placeholder="Enter marks"
                type="text"
                name="marks"
                id="marks"
                value={formData.marks}
                onChange={handleInput}
              />
            </div>
            <div className="flex justify-between mx-4 mt-10">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6  rounded-lg"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-3 px-6  rounded-lg"
                onClick={handleAddStudent}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManage;
