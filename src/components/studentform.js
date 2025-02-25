// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const StudentForm = () => {

  const { id } = useParams(); // Get task ID from URL (for editing)
  const navigate = useNavigate();
  
  const [form, setForm] = useState({ name: '',age:'',native:'', Description: '', active: '1' });

  useEffect(() => {
    if (id) {
      // Fetch task data if editing
      axios.get(`http://127.0.0.1:8000/api/student/${id}/`)
        .then(response => setForm(response.data))
        .catch(error => console.error('Error fetching task:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Update task
      axios.put(`http://127.0.0.1:8000/api/student/${id}/`, form)
        .then(() => navigate('/'))
        .catch(error => console.error('Error updating task:', error));
    } else {
      // Create new task
      axios.post('http://127.0.0.1:8000/api/student/', form)
        .then(() => navigate('/'))
        .catch(error => console.error('Error creating task:', error));
    }
  };

  return (
    <div>
      <h1 className='block text-gray-700 font-bold mb-5'>{id ? 'Edit Student' : 'Add Student'}</h1>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <label>
          Completed:
          <input
            type="checkbox"
            name="completed"
            checked={form.completed}
            onChange={handleChange}
          />
        </label>
        <button type="submit"></button>
      </form> */}
      <form onSubmit={handleSubmit}> 
      <div class="mb-4 flex"> 
        <label for="name" class="block text-gray-700 font-bold mr-2">Name:</label> 
        <input type="text" id="name"
          placeholder="Enter a Name"
          value={form.name}
          onChange={handleChange} name="name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/> 
      </div> 
      <div class="mb-4 flex "> 
        <label for="age" class="block text-gray-700 font-bold mr-2 ">Age:</label> 
        <input type="text" placeholder="Enter a Age"
          value={form.age}
          onChange={handleChange} id="age" name="age" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/> 
      </div> 
      <div class="mb-4 flex "> 
        <label for="native" class="block text-gray-700 font-bold mr-2 ">Native:</label> 
        <input type="text" placeholder="Enter a Native Place"
          value={form.native}
          onChange={handleChange} id="native" name="native" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/> 
      </div> 
      <div class="mb-4 flex"> 
        <label for="description" class="block text-gray-700 font-bold mr-2">Description:</label> 
        <textarea id="description"
          placeholder="Description"
          value={form.Description}
          onChange={handleChange} name="Description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea> 
      </div> 
      <div class="text-center ">
         <button type="submit" className="bg-blue-500 text-white px-4 py-2 mr-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">{id ? 'Update Task' : 'Create Task'}</button>
         <Link to="/"><button type="cancel" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Cancel</button></Link>
      </div> 
      </form>
    </div>
  );
};

export default StudentForm;
