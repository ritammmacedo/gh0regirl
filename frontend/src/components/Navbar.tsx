import React from 'react';
import { NavLink } from 'react-router';

function Navbar() {
    const [showProjects, setShow] = React.useState(false)
    return(
        <>
            <nav className='my-6'>
                <ul className='text-center'>
                <li className='inline mr-4'><NavLink to="/">Home</NavLink></li>
                <li className='inline mr-4' onClick={() => { setShow(!showProjects); }}><NavLink to="/projects" onClick={(e) => { e.preventDefault() }}>Projects</NavLink></li>
                <li className='inline mr-4'><NavLink to="/contact">Contact</NavLink></li>
                </ul>
                <ul className={"text-center mt-2" + (!showProjects ? " hidden" : "")} onMouseLeave={() => { setShow(!showProjects); }}>
                    <li className='inline mr-4'>
                        <NavLink to="/projects/gallery">Gallery</NavLink>
                    </li>
                    <li className='inline mr-4'>
                        <NavLink to="/projects/performances">Performances</NavLink>
                    </li>
                    <li className='inline mr-4'>
                        <NavLink to="/projects/visual-artwork">Visual Artwork</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar