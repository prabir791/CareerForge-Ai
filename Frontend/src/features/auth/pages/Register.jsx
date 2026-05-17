import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import '../auth.form.scss'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/login")
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
                    <h1>Create Account</h1>
                    <p>Start your AI-powered interview journey</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-wrapper">
                            <input
                                onChange={(e) => { setUsername(e.target.value) }}
                                type="text" id="username" name='username' placeholder='Enter your username' required />
                        </div>
                    </div>
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
                        <div className="input-wrapper">
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" id="password" name='password' placeholder='Create a strong password' required minLength={6} />
                        </div>
                    </div>

                    <button disabled={loading} className={`button primary-button ${loading ? 'loading' : ''}`} >
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <p className="auth-link">Already have an account? <Link to={"/login"} >Log in here</Link> </p>
            </div>
        </main>
    )
}

export default Register