import React,{useEffect, useState} from 'react'
import Box from './Box'
import '../styles/Feed.css'
import Post from './Post'

const Feed = () => {
    const [posts, setPosts]= useState([]);
    
    
    return (
        <div className="feed">
            <Box/>
            
        </div>
    )
}

export default Feed
