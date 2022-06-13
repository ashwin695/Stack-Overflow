import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import stackoverflow from "../../assets/stackoverflow.png"
import search from "../../assets/search.svg"
import Avatar from "../../components/Avatar/Avatar"
import { useSelector, useDispatch } from "react-redux"
import decode from 'jwt-decode'

import "./Navbar.css"
import { setCurrentUser } from "../../actions/currentUser"

const Navbar = () => {

    var User = useSelector((state) => (state.currentUserReducer))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch({type:'LOGOUT'})
        navigate('/')
        dispatch(setCurrentUser(null))
    }

    useEffect(() =>{
        const token = User?.token
        if(token)
        {
            const decodeToken = decode(token)
            if(decodeToken.exp * 1000 < new Date().getTime())
            {
                handleLogout()
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    },[dispatch])
    
    return(
        <nav className="main-nav">
            <div className="navbar">
                <Link to='/' className="nav-item nav-logo">
                    <img src={stackoverflow} alt="logo" width="130" />
                </Link>
                <Link to='/' className="nav-item nav-btn">
                    About
                </Link>
                <Link to='/' className="nav-item nav-btn">
                    Products
                </Link>
                <Link to='/' className="nav-item nav-btn">
                    For Teams
                </Link>

                <form>
                    <input type="text" placeholder="Search..." />
                    <img src={search} alt="search" width="18" className="search-icon"></img>
                </form>

                { User === null 
                  ? <Link to="/Auth" className="nav-item nav-links">
                        Log In
                    </Link>
                  : <>
                        <Avatar backgroundColor="#009dff" px="13px" py="7px" borderRadius="20px" color='white'>
                            <Link to={`/Users/${User?.result?._id}`} style={{color:'#fff', textDecoration:'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link>
                        </Avatar>
                        <button className="nav-item nav-links" onClick={handleLogout}>Log Out</button>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar