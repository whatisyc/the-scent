import { useState } from 'react'
import supabase from '../client.js'

const SignUp = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nickname, setNickname] = useState("")

    const handleSignUp = async (event) => {
        event.preventDefault()

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    nickname: nickname.trim()
                }
            }
        })

        if (error) {
            setMessage(error.message)
            return
        }

        window.alert("Your account has been succesfully created")
        window.location.href="/"
    }

    return (
        <div className="signup-page">
            <form onSubmit={handleSignUp}>
                <h1>Create Account</h1>

                <label htmlFor="email">Email</label>
                <input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <label htmlFor="nickname">Nickname</label>
                <input
                    id="nickname"
                    type="text"
                    value={nickname}
                    onChange={(event) => setNickname(event.target.value)}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                <button type="submit">Sign Up</button>
            </form>  

        </div>
    )
}

export default SignUp