import { useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../client.js'

import './Login.css'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleLogin = async (event) => {
        event.preventDefault()

        const { error } = await supabase.auth.signInWithPassword({      // {error}
            email,
            password
        })

        if (error) {
            setErrorMessage(error.message)
            return
        }

        window.location.href = "/"
        }

    return(
        <div className="login-page">
            <form className="login-form" onSubmit={handleLogin}>
                <h1>Log In</h1>

                <label htmlFor="email">Email</label>   
                <input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                {errorMessage && <p>{errorMessage}</p>}

                <button className="submit-button" type="submit">Log In</button>
            </form>

            <Link className="signup-link" to="/signup">Create an account</Link>


        </div>
    )
}

export default Login