import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import supabase from "../client"

const PostPage = () => {

    const { id } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                console.error(error)
                return
            }

            setPost(data)
        }

        fetchPost()
    }, [id])

    if (!post) {
        return <p>Loading...</p>
    }

    const handleUpvote = async () => {
        const newUpvoteCount = (post.upvotes ?? 0) + 1

        const { data, error } = await supabase
            .from('posts')
            .update({ upvotes: newUpvoteCount })
            .eq('id', id)
            .single()

        if (error) {
            console.error("Error updating upvotes:", error)
            return
        }

        setPost((prev) => {
            return {
                ...prev,
                upvotes: newUpvoteCount
            }
        })
    }

    return (
        <div className="post-page">
            <h1>{post.title}</h1>

            <p>{new Date(post.created_at).toLocaleString()}</p>

            {post.content && (
                <p>{post.content}</p>
            )}

            {post.image_url && (
                <img src={post.image_url} alt={post.title} />
            )}
            
            <button type="button" onClick={handleUpvote}>
                ▲ Upvote · {post.upvotes ?? 0}
            </button>
            
        </div>
    )
}

export default PostPage