import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import Card from '../components/Card';
import Button from '../components/Button';
import { findUser } from '../utils/localStorage';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        const user = findUser(formData.email, formData.password);
        
        if (user) {
            navigate('/dashboard');
        } else {
            setError('Invalid email or password');
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <Card title="Login">
                <Form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
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
                    <div className="button-group">
                        <Button type="submit" variant="primary">Login</Button>
                        <Button type="button" variant="outline-primary" onClick={handleRegisterClick}>
                            Register
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
