import React,{useEffect, useState} from 'react'
import Box from './Box'
import '../styles/Feed.css'
import Post from './Post'

const Feed = () => {
    const [posts, setPosts]= useState([]);
    
    
    return (
        <div className="feed">
            <Box/>
            {posts.map(({id,question})=>
            (
                <Post key={id} Id={id}
                image={question.imageUrl}
                question={question.question}
                timestamp={question.timestamp}
                QuestionUser={question.user}
                like={question.like}
                dislike={question.dislike}/>
            )
            )}
            
        </div>
    )
}

export default Feed
