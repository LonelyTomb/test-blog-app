import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css';
import axios from 'axios'
function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://wp.newborntoolkit.org/wp-json/nest360/v1/news')
      if (response.data) {
        const { data } = response.data
        setPosts(data.posts)
        setLoading(false)
      }
    } catch (e) {
      console.log(e)
      setLoading(false)

    }

  }


  const PostCard = ({ post }) => {
    return (
      <Link to={`post/${post.slug}`}>
        <div className={'post-card'}>
          <img src={post.image} alt={post.title} className={'post-image'} />
          <h1>Title: {post.title}</h1>
          <p>Summary: {post.summary || 'N/A'}</p>
          <p>Date: {post.date}</p>
          <p>Category: {post.category.title}</p>
        </div>
      </Link>
    )
  }
  return (
    <div className="App">
      {
        loading ? 'Loading...'
          : (<div className='flex flex-wrap'>
            {
              posts.map(post => <PostCard post={post} />)
            }
          </div>)
      }
    </div>
  );
}

export default App;
