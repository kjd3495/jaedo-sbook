import React from 'react'
import '../styles/Widget.css'
import WidgetOptions from './WidgetOptions'
const Widget = () => {
    return (
        <div className="widget">
            <div className="widget_header">
                <h5>광고입니다.</h5>
            </div>
            <div className="widget_contents">
            <WidgetOptions/>
            </div>
        </div>
    )
}

export default Widget
