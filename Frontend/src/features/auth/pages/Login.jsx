import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import '../auth.form.scss'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate('/plan')
    }

    const handleTiltMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3; 
        const rotateY = ((x - centerX) / centerX) * 3;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    };

    const handleTiltLeave = (e) => {
        const card = e.currentTarget;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    if (loading) {
        return (
            <main>
                <h1>Loading.......</h1>
            </main>
        )
    }
    return (
        <main className="auth-page">
            {/* Dynamic Background Elements */}
            <div className="bg-shape bg-shape-1"></div>
            <div className="bg-shape bg-shape-2"></div>
            <div className="bg-shape bg-shape-3"></div>

            <div 
                className="form-container glass-panel"
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
            >
                <div className="form-header">
                    <h1>Welcome Back</h1>
                    <p>Log in to access your interview plans</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email" id="email" name='email' placeholder='name@example.com' required />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper" style={{ position: 'relative' }}>
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type={showPassword ? 'text' : 'password'} id="password" name='password' placeholder='Enter your password' required />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    right: "15px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                    color: "#666",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    zIndex: "10",
                                    backgroundColor: "transparent",
                                    border: "none",
                                    padding: "0"
                                }}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <button disabled={loading} className={`button primary-button ${loading ? 'loading' : ''}`} >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="auth-link">Don't have an account? <Link to={"/register"} >Register here</Link> </p>
            </div>
        </main>
    )
}

export default Login