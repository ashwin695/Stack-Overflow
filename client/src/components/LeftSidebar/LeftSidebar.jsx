import React from 'react'
import './LeftSidebar.css'
import { NavLink } from 'react-router-dom'
import globe from '../../assets/globe.png'

function LeftSidebar() {

    return(
        <div className='left-sidebar'>
            <nav className='side-nav'>
                <NavLink to='/' className='side-nav-links' activeClassName='active'>
                    <p>HOME</p>
                </NavLink>
                <div className='side-nav-div'>
                    <div>
                        <p>PUBLIC</p>
                    </div>
                    <NavLink to="/Questions" className='side-nav-links' activeClassName='active'>
                        <img src={globe} alt="globe" width='20'></img>
                        <p style={{paddingLeft: 10}}>
                            Questions
                        </p>
                    </NavLink>
                    <NavLink to="/Tags" className='side-nav-links' activeClassName='active' style={{paddingLeft:40}}>
                        <p>Tags</p>
                    </NavLink>
                    <NavLink to="/Users" className='side-nav-links' activeClassName='active' style={{paddingLeft:40}}>
                        <p>Users</p>
                    </NavLink>
                </div>
            </nav>
        </div>
    )
}

export default LeftSidebar