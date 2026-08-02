import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PerfumeGallery.css'

import supabase from '../client.js'

const PerfumeGallery = () => {

    const [perfumes, setPerfumes] = useState([]) 

    useEffect( () => {
        const fetchPerfumes = async () => {
            const { data, error } = await supabase
                .from('perfumes')
                .select('*')
                .order('name', { ascending: true })

                console.log("Perfumes returned:", data)
                console.log("Number returned:", data?.length)
                console.log("Supabase error:", error)

                if (error ) {
                    console.error(error)
                    return
                }

                setPerfumes(data)
        }

        fetchPerfumes()
    }, [])

    return (
        <div className="perfume-gallery">
            <h1>Perfume Gallery</h1>
            
            <div className="perfume-list">
                {perfumes.length === 0 ? (
                    <p className="error">Loading perfumes...</p>
                ) : (
                    perfumes.map((perfume) => (
                        <div className="perfume-card" key={perfume.id}> 
                            <Link
                                className='perfume-details'
                                to={`/perfumes/${perfume.id}`}
                            >
                                <h2>{perfume.name}</h2>
                                <h3>{perfume.brand}</h3>
                                
                                {perfume.image_url && (
                                    <img 
                                        src={perfume.image_url} 
                                        alt={perfume.name} 
                                    />
                                )}
                            </Link>

                        </div>
                    ))
                )
                }

            </div>

        </div>
    )
}

export default PerfumeGallery