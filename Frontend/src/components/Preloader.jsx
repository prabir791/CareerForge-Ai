import React from 'react';
import './Preloader.scss';

const Preloader = ({ fadeOut }) => {
    return (
        <div className={`preloader-container ${fadeOut ? 'fade-out' : ''}`}>
            {/* Ambient Glowing Orbs */}
            <div className="ambient-glow-cyan"></div>
            <div className="ambient-glow-magenta"></div>

            {/* Main Visual Centerpiece */}
            <div className="loader-centerpiece">
                {/* Outer & Inner Spinning Rings */}
                <div className="loader-ring"></div>
                <div className="loader-ring-inner"></div>

                {/* Brand Text & Brackets */}
                <div className="logo-wrapper">
                    <h1 className="logo-text">
                        <span className="bracket bracket-left">[</span>
                        <img src="/favicon.png" alt="logo icon" className="logo-icon" />
                        GENERATIVE-AI
                        <span className="bracket bracket-right">]</span>
                    </h1>
                </div>
            </div>

            {/* Micro Subtitle */}
            <div className="loading-subtitle">Initializing System</div>
        </div>
    );
};

export default Preloader;
