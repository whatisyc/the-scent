import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../client.js'
import './Feed.css'

const Feed = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*') 
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching posts:', error)
                return
            }

            setPosts(data)
        }

        fetchPosts()
    }, [])


    return (
        <div className="feed-page">
            <h1>What's New?</h1>
            <p>Check out the latest posts from our community!</p>

            <div className="feed-container">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                             <Link
                                className="post-details"
                                to={`/posts/${post.id}`}
                            >
                                <div key={post.id} className="post-card">
                                    <h2>{post.title}</h2>
                                    <p>{new Date(post.created_at).toLocaleString()}</p>
                                    <p className="upvote-count">
                                        ▲ {post.upvotes ?? 0} upvotes
                                    </p>

                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No posts yet. Be the first to share!</p>
                    )}
            </div>
        </div>
    )
}

export default Feed