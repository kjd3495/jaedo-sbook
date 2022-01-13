import React from 'react'
import '../styles/Main.css'
import Navbar from './Navbar'
import Siderbar from './Siderbar'
import Feed  from './Feed'
import Widget from './Widget'
import { Routes, Route } from 'react-router-dom'

const Main = () => {
    return (
        <div className="main">
            <Navbar/>
            <div className="content">
                <Siderbar/>
                <Routes>
                <Route path="/" element={<Feed/>}/>
                </Routes>
                <Widget/>
            </div>
            
        </div>
    )
}
export default Main
