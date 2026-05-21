import React from 'react';
import { useRouteError, useNavigate } from 'react-router';
import './ErrorPage.scss';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    // Check error details
    let errorCode = "404";
    let errorMessage = "The page you are looking for has drifted into deep space or never existed.";
    
    if (error) {
        if (error.status === 404) {
            errorCode = "404";
            errorMessage = "The system could not locate the requested interface route.";
        } else {
            errorCode = error.status || "ERR";
            errorMessage = error.message || error.statusText || "An unexpected subsystem exception occurred.";
        }
        console.error("Router error captured:", error);
    }

    return (
        <main className="error-page-container">
            {/* Ambient Background Glows */}
            <div className="ambient-glow cyan"></div>
            <div className="ambient-glow magenta"></div>

            {/* Glowing Grid Background Effect */}
            <div className="cyber-grid"></div>

            <div className="error-panel glass-panel">
                <div className="brand-accent">
                    <span className="sparkle">✦</span> CAREERFORGEAI SUBSYSTEM
                </div>

                <div className="glitch-wrapper">
                    <h1 className="error-code" data-text={errorCode}>{errorCode}</h1>
                </div>

                <h2 className="error-title">Route Mismatch / System Error</h2>
                <p className="error-message">{errorMessage}</p>

                {error?.data && (
                    <div className="error-debug">
                        <span className="debug-label">Console Log:</span>
                        <pre className="debug-content">{typeof error.data === 'string' ? error.data : JSON.stringify(error.data)}</pre>
                    </div>
                )}

                <div className="button-group">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="button secondary-button"
                        id="btn-error-back"
                    >
                        <span className="arrow">←</span> Go Back
                    </button>
                    <button 
                        onClick={() => navigate('/plan')} 
                        className="button primary-button"
                        id="btn-error-home"
                    >
                        Terminal Dashboard
                    </button>
                </div>
            </div>
            
            <div className="system-footer">
                Secured Connection // Port: 3000-5173 // Status: Active
            </div>
        </main>
    );
};

export default ErrorPage;
