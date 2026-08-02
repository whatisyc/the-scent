import { useState, useEffect } from "react"
import supabase from "../client"
import './CreatePost.css'

const CreatePost = () => {

    const [post, setPost] = useState({ 
        title: "", 
        content: "",
        image_url: "",
        perfume_id: ""
    })

    const [perfumes, setPerfumes] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)


    useEffect(() => {
        const fetchPerfumes = async () => {
            const { data, error } = await supabase
                .from("perfumes")
                .select("id, name")
                .order("name", { ascending: true })

            if (error) {
                console.error("Error fetching perfumes:", error)
                return
            }
            
            setPerfumes(data)
        }
        
        fetchPerfumes()
    }, [])

    const handleChange = (event) => {
        const { name, value} = event.target

        setPost( (prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault()
        setIsSubmitting(true)

        const newPost = {
            title: post.title.trim(),
            content: post.content.trim(),
            image_url: post.image_url.trim() || null,
            perfume_id: post.perfume_id
                ? Number(post.perfume_id)
                : null
        }

        const { data, error } = await supabase
            .from('posts')
            .insert([newPost])
            .select()

        setIsSubmitting(false)

        if (error) {
            console.error("Error creating post:", error)
            return
        }

        console.log(data)

        window.location.href="/"
    }

    return(
        <div className="create-page">
            <form className="create-form" onSubmit={createPost}>
            <h1>Create a Post</h1>

            <label htmlFor="title">Title</label>
            <input 
                type="text"
                id="title"
                name="title"
                value={post.title}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
                required
            />

            <label htmlFor="content">Content</label>
            <textarea 
                id="content"
                name="content"
                value={post.content}
                onChange={handleChange}
                placeholder="Share your thought, question, or review..."
                rows="8"
                required
            />

            <label htmlFor="image_url">Image URL</label>
            <input
                id="image_url"
                type="url"
                name="image_url"
                value={post.image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
            />

            <label htmlFor="perfume_id">Related Perfume</label>
            <select
                id="perfume_id"
                name="perfume_id"
                value={post.perfume_id}
                onChange={handleChange}
            >
                <option value="">No perfume seleected</option>
                {perfumes.map((perfume) => (
                    <option key={perfume.id} value={perfume.id}>
                        {perfume.name}
                    </option>
                ))}
            </select>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Post"}
                </button>

            </form>
        
        </div>
    )
}

export default CreatePost