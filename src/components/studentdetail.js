// src/components/TaskDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setstudent] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/student/${id}/`)
      .then(response => setstudent(response.data))
      .catch(error => console.error('Error fetching task:', error));
  }, [id]);

  if (!student) return <p>Loading...</p>;

  return (
    <div>
      <h1>Name: {student.name}</h1>
      <p>Age: {student.age}</p>
      <p>Native: {student.native}</p>
      <p>Description: {student.Description}</p>
      <p>Created At : {student.created_at}</p>

      <Link to="/" className='btn bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600'>Back to List</Link>
    </div>
  );
};

export default StudentDetail;
