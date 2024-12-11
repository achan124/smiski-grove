import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'


export function NavBar({ username }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav>
            <ul>
                <div className="nav-left" >
                    <div id="homepage-hamburger-menu" onClick={toggleMenu}>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                    </div>


                    {/* <div > */}
                        <ul id="nav-links" className={isMenuOpen ? 'menu-open' : 'menu-closed'}>
                            <li><NavLink to="/home" onClick={() => setIsMenuOpen(false)} >Home</NavLink></li>
                            <li><NavLink to="/search" onClick={() => setIsMenuOpen(false)} >Search</NavLink></li>
                            <li><NavLink to="/mySmiskis" onClick={() => setIsMenuOpen(false)} >My Smiskis</NavLink></li>
                            <li><NavLink to="/memoryMatch" onClick={() => setIsMenuOpen(false)} >Memory Match</NavLink></li>
                            <li><NavLink to="/oddOneOut" onClick={() => setIsMenuOpen(false)} >Odd One Out</NavLink></li>
                        </ul>
                    {/* </div> */}

                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/search">Search</NavLink></li>
                    <li><NavLink to="/mySmiskis">My Smiskis</NavLink></li>
                    <li><NavLink to="/memoryMatch">Memory Match</NavLink></li>
                    <li><NavLink to="/oddOneOut">Odd One Out</NavLink></li>
                </div>

                <div className="nav-right">
                    <li>
                        <div className="profile">
                            <NavLink to="/profile" className="profile-link">
                                <p><strong>{username}</strong></p>
                            </NavLink>
                            <div className="profile-icon">
                                <NavLink to="/profile" className="profile-link">
                                    <img src="img/Smiski-onYourSide.png" alt="Profile Photo" />
                                </NavLink>
                            </div>
                        </div>
                    </li>
                </div>
            </ul>
        </nav>
    )
}

export function Footer() {
    return (
        <footer>
            <div className="group-name">
                <p>&copy; Authors: Alexia Chan, Teresa Wang, Raizel Lagunero, Edlyn Hsueh</p>
            </div>
        </footer>
    )
}