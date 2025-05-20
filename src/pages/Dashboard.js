import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Form from '../components/Form';
import { getStudents, saveStudent, updateStudent, deleteStudent } from '../utils/localStorage';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        rollNumber: '',
        class: '',
        section: ''
    });

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = () => {
        const studentList = getStudents();
        setStudents(studentList);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingStudent) {
            updateStudent({ ...formData, id: editingStudent.id });
        } else {
            saveStudent(formData);
        }
        setFormData({
            name: '',
            rollNumber: '',
            class: '',
            section: ''
        });
        setEditingStudent(null);
        loadStudents();
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setFormData(student);
    };

    const handleDelete = (studentId) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            deleteStudent(studentId);
            loadStudents();
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Student Management</h1>
                <Button variant="outline-danger" onClick={() => navigate('/login')}>
                    Logout
                </Button>
            </div>

            <div className="dashboard-content">
                <Card title={editingStudent ? 'Edit Student' : 'Add New Student'}>
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rollNumber">Roll Number</label>
                            <input
                                type="text"
                                id="rollNumber"
                                name="rollNumber"
                                className="form-control"
                                value={formData.rollNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="class">Class</label>
                            <input
                                type="text"
                                id="class"
                                name="class"
                                className="form-control"
                                value={formData.class}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="section">Section</label>
                            <input
                                type="text"
                                id="section"
                                name="section"
                                className="form-control"
                                value={formData.section}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="button-group">
                            {editingStudent && (
                                <Button 
                                    type="button" 
                                    variant="secondary"
                                    onClick={() => {
                                        setEditingStudent(null);
                                        setFormData({
                                            name: '',
                                            rollNumber: '',
                                            class: '',
                                            section: ''
                                        });
                                    }}
                                >
                                    Cancel
                                </Button>
                            )}
                            <Button type="submit" variant="primary">
                                {editingStudent ? 'Update' : 'Add'} Student
                            </Button>
                        </div>
                    </Form>
                </Card>

                <Card title="Student List">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Roll Number</th>
                                    <th>Class</th>
                                    <th>Section</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.id}>
                                        <td>{student.name}</td>
                                        <td>{student.rollNumber}</td>
                                        <td>{student.class}</td>
                                        <td>{student.section}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <Button
                                                    variant="outline-primary"
                                                    onClick={() => handleEdit(student)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    onClick={() => handleDelete(student.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
