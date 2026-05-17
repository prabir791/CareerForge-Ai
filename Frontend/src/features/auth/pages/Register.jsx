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

            <div className="register-container">
                {/* Left Side: Brand & Project Overview */}
                <div className="register-info">
                    <div className="project-brand">
                        <span className="sparkle">✦</span> Powered by Gemini 2.5
                    </div>
                    <h1>Generative-AI</h1>
                    <p className="tagline">
                        A state-of-the-art career acceleration platform that tailors your credentials and prepares you for target placements with laser accuracy.
                    </p>

                    <div className="overview-cards">
                        {/* Card 1 */}
                        <div className="overview-card">
                            <div className="card-icon red-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                            </div>
                            <div className="card-content">
                                <h3>ATS Resume Tailoring</h3>
                                <p>Generates print-ready A4 resumes tailored exactly to target Job Descriptions, maximizing screening passage rates.</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="overview-card">
                            <div className="card-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            </div>
                            <div className="card-content">
                                <h3>Smart Interview Prep</h3>
                                <p>Delivers personalized technical and behavioral mock interview guides, revealing interviewer intent and model answers.</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="overview-card">
                            <div className="card-icon purple-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                            </div>
                            <div className="card-content">
                                <h3>Customized Roadmaps</h3>
                                <p>Creates step-by-step day-wise learning structures focused directly on mapping and overcoming your specific skill gaps.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Register Form */}
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
                                    type="text" id="username" name="username" placeholder="Enter your username" required />
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <input
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    type="email" id="email" name="email" placeholder="name@example.com" required />
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <input
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    type="password" id="password" name="password" placeholder="Create a strong password" required minLength={6} />
                            </div>
                        </div>

                        <button disabled={loading} className={`button primary-button ${loading ? "loading" : ""}`} >
                            {loading ? "Creating Account..." : "Register"}
                        </button>
                    </form>

                    <p className="auth-link">Already have an account? <Link to={"/login"} >Log in here</Link> </p>
                </div>
            </div>
        </main>
    )
}

export default Register