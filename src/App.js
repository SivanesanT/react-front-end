import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './components/allstudent.js';
import StudentForm from './components/studentform.js';
import StudentDetail from './components/studentdetail.js';

function App() {
  return (
    <div className="App">
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <Router>
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/add-student" element={<StudentForm />} />
            <Route path="/edit-student/:id" element={<StudentForm />} />
            <Route path="/student/:id" element={<StudentDetail />} />
          </Routes>
        </Router>
        </div>
    </div>
  );
}

export default App;
