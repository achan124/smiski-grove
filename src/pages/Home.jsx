import React from 'react';
import { NavLink } from 'react-router-dom'

export function HomePage() {
    return (
        <div className="background">
            <div className="homepage-title">
                <h1>Smiski Grove</h1>
                <p>Jump into the Smiski adventure! Discover, collect, and play exciting games with your favorite Smiskis.</p><em>Click <strong>"Get Started"</strong> to log in and unlock endless fun</em>
                <div className="get-start-button">
                <NavLink to="/search" className="primary-button">Look for Smiskis</NavLink>
                <img src="img/homepage-pointer.PNG" alt="smiski-pointer" />
                </div>
            </div>
        </div>
    )
}