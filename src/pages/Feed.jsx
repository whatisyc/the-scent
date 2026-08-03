import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../client.js'
import './Feed.css'

const Feed = () => {

    const [posts, setPosts] = useState([])
    const [sortBy, setSortBy] = useState("newest")
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const fetchPosts = async () => {
            const orderColumn =
                sortBy === "newest" ? "created_at" : "upvotes"

            const { data, error } = await supabase
                .from('posts')
                .select(`
                    *,
                    comments(id)
                `) 
                .order(orderColumn, { ascending: false })

            if (error) {
                console.error('Error fetching posts:', error)
                return
            }

            setPosts(data)
        }

        fetchPosts()
    }, [sortBy])


    const filteredPosts = posts.filter((post) => {
        return post.title
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
    })


    return (
        <div className="feed-page">
            <div className="feed-header">
                <h1>What's New?</h1>
                <p>Check out the latest posts from our community!</p>
            </div>

            <div className="feed-controls">
                <input
                    className="search-input"
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search posts by title..."
                />

                <div className="sort-controls">
                    <label htmlFor="sort-posts">Sort by:</label>

                    <select
                        id="sort-posts"
                        value={sortBy}
                        onChange={(event) => setSortBy(event.target.value)}
                    >
                        <option value="newest">Newest</option>
                        <option value="upvotes">Most upvoted</option>
                    </select>
                </div>
            </div>

            <div className="feed-container">
                    {posts.length === 0 ? (
                        <p>No posts yet. Be the first to share!</p>
                        ) : filteredPosts.length === 0 ? (
                            <p>No posts match your search.</p>
                        ) : (
                            filteredPosts.map((post) => (
                                <Link
                                    key={post.id}
                                    className="post-details"
                                    to={`/posts/${post.id}`}
                                >
                                    <div key={post.id} className="post-card">
                                        <h2>{post.title}</h2>

                                        <p className="post-date">
                                            {new Date(post.created_at).toLocaleString()}
                                        </p>

                                        <div className="post-stats">
                                            <p className="upvote-count">
                                                ❤️ {post.upvotes ?? 0} upvotes
                                            </p>

                                            <p className="comment-count">
                                                💬 {post.comments?.length ?? 0}{" "}
                                                {post.comments?.length === 1 ? "comment" : "comments"}
                                            </p>
                                        </div>

                                    </div>
                                </Link>
                            ))
                        )
                    }

                        
            </div>
        </div>
    )
}

export default Feed