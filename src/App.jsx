import { Routes, Route } from "react-router-dom"
import Feed from "./pages/Feed"
import Layout from "./pages/Layout"
import CreatePost from "./pages/CreatePost"
import PostPage from "./pages/PostPage"
import EditPost from "./pages/EditPost"
import PerfumeGallery from "./pages/PerfumeGallery"
import PerfumeDetail from "./pages/PerfumeDetail"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Feed />} />
        <Route path="perfumes" element={<PerfumeGallery />} />
        <Route path="perfumes/:id" element={<PerfumeDetail />} />
        <Route path="new-post" element={<CreatePost />} />
        <Route path="posts/:id" element={<PostPage />} />
        <Route path="posts/:id/edit" element={<EditPost />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
