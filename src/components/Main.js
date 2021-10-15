import React from 'react'
import '../styles/Main.css'
import Navbar from './Navbar'
import Siderbar from './Siderbar'
import Feed  from './Feed'
import Widget from './Widget'
const Main = () => {
    return (
        <div className="main">
            <Navbar/>
            <div className="content">
                <Siderbar/>
                <Feed/>
                <Widget/>
            </div>
            
        </div>
    )
}
export default Main
