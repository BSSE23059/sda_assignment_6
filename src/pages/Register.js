import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import Card from '../components/Card';
import Button from '../components/Button';
import { saveUser, getUsers } from '../utils/localStorage';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const users = getUsers();
        if (users.some(user => user.email === formData.email)) {
            setError('Email already exists');
            return;
        }

        const newUser = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        };

        saveUser(newUser);
        navigate('/login');
    };

    return (
        <div className="register-container">
            <Card title="Register">
                <Form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-control"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <Button type="button" variant="outline-secondary" onClick={() => navigate('/login')}>
                            Back to Login
                        </Button>
                        <Button type="submit" variant="primary">Register</Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default Register;
