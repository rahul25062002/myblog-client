import React from 'react'

function Upvote({ votes,myclass }) {
    let style = {
        "--stroke": "black",
        "--stroke-hover": "#00a100",
        "--stroke_bg-hover": "#a6ffa6",
        "--fill" : "#5fff5f"
    }
    // console.log(typeof votes);
    return (
        <div className='upvote' style={{
            display : 'flex',
            alignItems : "center",
            fontSize : 'var(--p)',
        }}>
        
        <svg className={`svg-img ${myclass}`} style={style}  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z"  fillRule="evenodd"></path></svg>
            {
                votes ? <span>{votes}</span> : <></>
            }
        </div>
    )
}

export default Upvote