import { Link, Outlet } from "react-router-dom"

function Layout() {
    return(
        <div>
            <nav className="navbar">
                <h1 className="logo">The Scent</h1>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/perfumes">Perfumes</Link></li>
                    <li><Link to="/new-post">Create Post</Link></li>
                </ul>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
