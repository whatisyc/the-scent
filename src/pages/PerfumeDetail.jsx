import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import supabase from "../client.js"

const PerfumeDetail = () => {

    const { id } = useParams()
    const [perfume, setPerfume] = useState(null)
    const [loading, setLoading] = useState(false)
    const [seasonVotes, setSeasonVotes] = useState({
        spring: 0,
        summer: 0,
        fall: 0,
        winter: 0
    })
    const [timeVotes, setTimeVotes] = useState({
        day: 0,
        night: 0
    })
    const [relatedPosts, setRelatedPosts] = useState([])

    useEffect(() => {

        const fetchPerfume = async () => {
            setLoading(true)

            const { data, error } = await supabase
                .from('perfumes')
                .select('*')
                .eq('id', id)
                .single()

            console.log('Perfume fetch id:', id)

            if (error) {
                console.log(error)
                setLoading(false)
                return
            }

            setPerfume(data)

            setSeasonVotes({
                spring: data.spring_votes || 0,
                summer: data.summer_votes || 0,
                fall: data.fall_votes || 0,
                winter: data.winter_votes || 0
            })

            setTimeVotes({
                day: data.day_votes || 0,
                night: data.night_votes || 0
            })

            setLoading(false)

        }
        fetchPerfume()

    }, [id])

    useEffect (() => {

        const fetchRelatedPosts = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('perfume_id', id)
                .order('created_at', { ascending: false })

            if (error) {
                console.error("Error fetching related posts:", error)
                return
            }

            setRelatedPosts(data ?? [])
        }

        fetchRelatedPosts()
    }, [id])

    const handleVote = async (category, option) => {
        
        if (category === 'season') {
            const newCount = seasonVotes[option] + 1

            await supabase 
                .from('perfumes')
                .update({ [`${option}_votes`]: newCount })
                .eq('id', perfume.id)

            setSeasonVotes((prev) => ({
                ...prev,
                [option]: newCount
            }))
        }

        if (category === 'time') {
            const newCount = timeVotes[option] + 1

            await supabase 
                .from('perfumes')
                .update({ [`${option}_votes`]: newCount })
                .eq('id', perfume.id)

            setTimeVotes((prev) => ({
                ...prev,
                [option]: newCount
            }))
        }
        
    }



    if (!perfume)
        return <p>Loading..</p>

    return(
        <div>
            <h1>{perfume.name}</h1>
            {perfume.image_url && <img src={perfume.image_url} alt={perfume.name} />}

            <div className="notesList">
                <p>Notes:</p>
                <ul>
                    {perfume.notes.split(',').map( (note) => (
                    <li key={note}>{note.trim().charAt(0).toUpperCase() + note.trim().slice(1)}</li>
                    ))}
                </ul>
            </div>

            <div className="vote">
                <p>Season to wear:</p>

                <button value="spring" onClick={() => handleVote('season', 'spring')}>
                    Spring {seasonVotes.spring}
                </button>

                <button value="summer" onClick={() => handleVote('season', 'summer')}>
                    Summer {seasonVotes.summer}
                </button>

                <button value="fall" onClick={() => handleVote('season', 'fall')}>
                    Fall {seasonVotes.fall}
                </button>

                <button value="winter" onClick={() => handleVote('season', 'winter')}>
                    Winter {seasonVotes.winter}
                </button>
            </div>

            <div className="vote">
                <p>Time to wear:</p>

                <button value='day' onClick={() => handleVote('time', 'day')}>
                    Day {timeVotes.day}
                </button>
                    
                <button value='night' onClick={() => handleVote('time', 'night')}>
                    Night {timeVotes.night}
                </button>
            </div>

            <div className='relatedPosts'>
                    <h2>RelatedPosts</h2>

                    {relatedPosts.length > 0 ? (
                        relatedPosts.map((post) => (
                            <Link
                                key={post.id}
                                to={`/posts/${post.id}`}
                            >
                                {post.title}
                            </Link>
                        ))
                    ) : (
                        <p>No related posts yet.</p>
                    )}
            </div>
        </div>
    )
}

export default PerfumeDetail