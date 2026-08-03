import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import supabase from '../client.js'
import './CreatePost.css'

const EditPost = () => {

    const { id } = useParams();
    const [post, setPost] = useState({ 
            title: "", 
            content: "",
            image_url: "",
            perfume_id: ""
        })

    const [perfumes, setPerfumes] = useState([])
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select("*")
                .eq("id", id)
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
        const fetchPerfumes = async () => {
        const { data, error } = await supabase
            .from("perfumes")
            .select("id, name")
            .order("name", { ascending: true })

        if (error) {
            console.error("Error fetching perfumes:", error)
            return
        }

        setPerfumes(data ?? [])
        }

        fetchPerfumes()
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target

        setPost( (prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault()
        setIsSaving(true)

        const updatedPost = {
            title: post.title.trim(),
            content: (post.content ?? "").trim(),
            image_url: (post.image_url ?? "").trim(),
            perfume_id: post.perfume_id
                ? Number(post.perfume_id)
                : null
        }

        const { data, error } = await supabase
            .from('posts')
            .update(updatedPost)
            .eq("id", id)

        if (error) {
            console.error(error)
            return
        }

        window.location.href="/"
    }


    return (
        <div className="create-page">
            <form className="create-form" onSubmit={updatePost}>
                <h1>Edit Post</h1>

                <label htmlFor="edit-title">Title</label>
                <input 
                    id="edit-title"
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="edit-content">Content</label>
                <textarea
                    id="edit-content"
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    placeholder="Add more details..."
                    rows="8"
                />

                <label htmlFor="edit-image">Image URL</label>
                <input
                    id="edit-image"
                    type="url"
                    name="image_url"
                    value={post.image_url}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                />

                <label htmlFor="edit-perfume">Related Perfume</label>
                <select
                    id="edit-perfume"
                    name="perfume_id"
                    value={post.perfume_id}
                    onChange={handleChange}
                >
                    <option value="">No perfume selected</option>

                    {perfumes.map((perfume) => (
                        <option key={perfume.id} value={perfume.id}>
                        {perfume.name}
                        </option>
                    ))}
                </select>

                <div className="edit-form-actions">
                    <button
                        className="submit-button"
                        type="submit"
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>

                    <Link
                        className="cancel-button"
                        to={`/posts/${id}`}
                    >
                        Cancel
                    </Link>
                </div>

            </form>

        </div>
    )
}

export default EditPost