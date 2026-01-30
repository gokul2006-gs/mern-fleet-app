import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', formData);
            console.log('Login Success:', res.data);
            alert('Login Successful!');
            // localStorage.setItem('token', res.data.token); 
            navigate('/');
        } catch (err) {
            console.error(err.response.data);
            setError(err.response.data.msg || 'Login Failed');
        }
    };

    const googleSuccess = async (response) => {
        try {
            const res = await axios.post('/api/auth/google', { token: response.credential });
            console.log('Google Login Success:', res.data);
            alert('Google Login Successful!');
            // localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            console.error('Google Login Error:', err);
            setError('Google Login Failed');
        }
    };

    const googleError = () => {
        console.error('Google Login Failed');
        setError('Google Login Failed');
    };

    return (
        <div className="card">
            <h1 className="title">Welcome Back</h1>
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                />
                <button type="submit">Sign In</button>
            </form>

            <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
                <GoogleLogin
                    onSuccess={googleSuccess}
                    onError={googleError}
                />
            </div>

            <Link to="/register" className="link">Don't have an account? Sign Up</Link>
        </div>
    );
};

export default Login;
