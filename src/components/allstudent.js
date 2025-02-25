import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Studentdetails = () => {
    const [student, setStudent] = useState([]);
  
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/student/')
        .then(response => setStudent(response.data))
        .catch(error => console.error('Error fetching tasks:', error));
    }, []);
  
    const deleteTask = (id) => {
      axios.patch(`http://127.0.0.1:8000/api/student/${id}/`, {id:id , active:'0' })
        .then(() => setStudent(student.filter(student => student.id !== id)))
        .catch(error => console.error('Error deleting task:', error));
    };
    return (
        <div className="container mx-auto mt-5">
        <button className="btn flex justify-start bg-blue-500 rounded-md text-white px-2 py-1 hover:bg-blue-600"><Link to="/add-student">Add a student</Link></button>
        
        <h1 className="text-2xl font-bold mb-4">Student Details</h1>
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
            <thead>
                <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Names</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Ages</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Descriptions</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Native</th>
                {/* <th className="border border-gray-300 px-4 py-2 text-left">Created At</th> */}
                <th className="border border-gray-300 px-4 py-2 text-left">Update</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Delete</th>
                </tr>
            </thead>
            <tbody>
                {student.map((user, index) => (
                <tr
                    key={user.id}
                    className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100`}
                >
                    <td className="border border-gray-300 px-4 py-2"><Link className="text-blue-500" to={`/student/${user.id}`}>{user.name}</Link></td>
                    <td className="border border-gray-300 px-4 py-2">{user.age}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.Description}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.native}</td>
                    <td className="border border-gray-300 px-4 py-2"><Link className='btn bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600' to={`/edit-student/${user.id}`}>Update</Link></td>
                    <td className="border border-gray-300 px-4 py-2"><button className='btn bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600' onClick={() => deleteTask(user.id)}>Delete</button></td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default Studentdetails;