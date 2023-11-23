import React from 'react'

function Bookmark({ myclass }) {
    let style = {
        "--stroke" : "black",
        "--stroke-hover" : "#6b006b",
        "--stroke_bg-hover" : "#fea5fe",
        "--fill" : "#fb74fb"
    }
    return (
        <svg className={`svg-img ${myclass}`}
            style={style}
            viewBox="0 0 24 24" strokeWidth={'2px'} fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 5H8.25C7.55964 5 7 5.58763 7 6.3125V19L12 15.5L17 19V6.3125C17 5.58763 16.4404 5 15.75 5Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default Bookmark