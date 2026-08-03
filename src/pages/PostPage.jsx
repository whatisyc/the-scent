import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import './PostPage.css'
import supabase from "../client"

const PostPage = () => {

    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [newComment, setNewComment] = useState("")
    const [comments, setComments] = useState([])

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


    useEffect(() => {
        const fetchComments = async () => {
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('post_id', id)
                .order('created_at', { ascending: true })

                if (error) {
                console.error(error)
                return
            }

            setComments(data ?? [])
        }

        fetchComments()
    }, [id])

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

    const handleComment = async (event) => {
            event.preventDefault()

            const cleanedComment = newComment.trim()

            if (!cleanedComment) {
                return
            }

            const { data, error } = await supabase
                .from('comments')
                .insert({
                    content: cleanedComment,
                    post_id: Number(id)
                })
                .select()
                .single()

                if (error) {
                    console.error("Error adding comment:", error)
                    return
                }

                setComments((prev) => {
                    return [...prev, data]
                })
                setNewComment("")

        }

    if (!post) {
        return <p>Loading...</p>
    }

    return (
        <div className="post-page">
            <h1>{post.title}</h1>

            <p className="post-date">
                {new Date(post.created_at).toLocaleString()}
            </p>

            {post.content && (
                <p className="post-content">{post.content}</p>
            )}

            {post.image_url && (
                <img 
                    className="post-image"
                    src={post.image_url} 
                    alt={post.title} />
            )}
            
            <button 
                className="upvote-button"
                type="button" 
                onClick={handleUpvote}
            >
                ▲ Upvote · {post.upvotes ?? 0}
            </button>

            <form className="comment-form" onSubmit={handleComment}>
                <label htmlFor="comment">Leave a Comment</label>

                <textarea 
                    id="comment"
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                    placeholder="Write a comment..."
                    rows={4}
                    required
                />

                <button type="submit">Send Comment</button>
                
            </form>

            <div className="comment-section">
                <h2>Comments</h2>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div className="comment" key={comment.id}>
                            <p className="comment-content">{comment.content}</p>

                            <p className="comment-date">
                                {new Date(comment.created_at).toLocaleString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>Be the first to comment</p>
                )}

            </div>
        </div>
    )
}

export default PostPage