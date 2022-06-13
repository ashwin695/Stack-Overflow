import React, { useState } from 'react'
import './Auth.css'
import logo from '../../assets/logo.png'
import AboutAuth from './AboutAuth'
import { signup, login } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Auth () {

    const [isSignup, setIsSignup] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSwitch = () => {
        setIsSignup(!isSignup)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(!email && !password)
        {
            alert("Enter Email and Password")
        }
        if(isSignup)
        {
            if(!name)
            {
                alert("Enter a name to continue")
            }
            dispatch(signup({ name, email, password }, navigate))
        }
        else
        {
            dispatch(login({ email, password }, navigate))
        }
        console.log({ name, email, password })
    }

    return(
        <section class='auth-section'>
            { isSignup && <AboutAuth /> }
            <div className='auth-container-2'>
                { !isSignup && <img src={logo} alt='stackoverflow' className='login-logo' width="100" /> }
                <form onSubmit={handleSubmit}>
                    {
                        isSignup && (
                            <label htmlFor='name'>
                                <h1>Display Name</h1>
                                <input type='text' id='name' name='name' onChange={(event)=>setName(event.target.value)} />
                            </label>
                        )
                    }
                    <label htmlFor="email">
                        <h4>Email</h4>
                        <input type="email" name='email' id='email' onChange={(event)=>setEmail(event.target.value)} />
                    </label>
                    <label htmlFor="password">
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <h4>Password</h4>
                            { !isSignup && <p style={{color: '#007ac6', fontSize:13}}>forgot password ?</p> }
                        </div>
                        <input type="password" name='password' id='password' onChange={(event)=>setPassword(event.target.value)} />
                        { isSignup && <p style={{color: '#666767', fontSize: 13}}>Passwords must contain at least eight<br /> characters, including at least 1 number and 1<br /> letter. </p> }
                    </label>
                    {
                        isSignup && (
                            <label htmlFor='check'>
                                <input type='checkbox' id='check' />
                                <p style={{fontSize: 13}}>
                                    Opt-in to receive occasional,<br />
                                    product updates, user reserach invitations,<br />
                                    company announcements, and digest.
                                </p>
                            </label>
                        )
                    }
                    <button type='submit' className='auth-btn'>{ isSignup ? 'Sign Up' : 'Log In' }</button>
                    {
                        isSignup && (
                            <p style={{color: '#666767', fontSize: 13}}>
                                By clicking "Sign up", you agree to our
                                <span style={{color: '#007ac6'}}> terms<br /> of service</span>, 
                                <span style={{color: '#007ac6'}}> privacy policy</span> and 
                                <span style={{color: '#007ac6'}}> cookie policy</span>.
                            </p>
                        )
                    }
                </form>
                <p>
                    { isSignup ? 'Already have an account ?' : "Don't have an account ?" }
                    <button type='button' className='handle-switch-btn' onClick={handleSwitch}>
                        { isSignup ? 'Log In' : 'Sign Up' }
                    </button>
                </p>
            </div>
        </section>
    )
}

export default Auth