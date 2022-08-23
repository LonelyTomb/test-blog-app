import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

const Post = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const { slug } = params

    useEffect(() => {
        if (slug) {
            fetchPost(slug)
        }
    }, [slug])

    const fetchPost = async (slug) => {
        try {
            const response = await axios.get(`https://wp.newborntoolkit.org/wp-json/nest360/v1/news/${slug}`)
            if (response.data) {
                const { data } = response.data
                setPost(data)
            }
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div>
            <Link to={'/'}>Back</Link>
            {
                post && post.id ? (
                    <div>
                        <img src={post.image} alt={post.title} className={'post-card'}/>
                        <h1>{post.title}</h1>
                        <p>{post.category.title}</p>
                        <p>{post.date}</p>
                    </div>
                ) : (
                    <p>No Post Found</p>
                )
            }
        </div>
    )
}

export default Post