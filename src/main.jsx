import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import PerfumeGallery from './pages/PerfumeGallery.jsx'
import Feed from './pages/Feed'
import PerfumeDetail from './pages/PerfumeDetail.jsx'
import CreatePost from './pages/CreatePost.jsx'
import Layout from './pages/Layout.jsx'
import PostPage from './pages/PostPage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Feed />}/>
        <Route path="perfumes" element={<PerfumeGallery />} />
        <Route path="perfumes/:id" element={<PerfumeDetail />} />
        <Route path="new-post" element={<CreatePost />}/>
        <Route path="posts/:id" element={<PostPage />}/>
      </Route>
    </Routes>
  </BrowserRouter>
)
