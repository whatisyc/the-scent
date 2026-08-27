import { Link, Outlet } from "react-router-dom"
import { useState, useEffect } from 'react'
import supabase from '../client'
import './Layout.css'

function Layout() {

    const [user, setUser] = useState(null)

    useEffect(() => {

        const getUser = async () => {
            const {
                data: { user }
            } = await supabase.auth.getUser()

            setUser(user)
        }

        getUser()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setUser(null)
    }

    return(
        <div>
            <nav className="navbar">
                <h1 className="logo">The Scent</h1>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/perfumes">Perfumes</Link></li>
                    <li><Link to="/new-post">Create Post</Link></li>
                    {user ? (
                        <li>
                            <p>{user.user_metadata.nickname}</p>
                            <button className="nav-button" onClick={handleLogout}>Log Out</button>
                        </li>
                    ) : (
                        <li><Link to="/login">Log In</Link></li>
                    )}
                </ul>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
