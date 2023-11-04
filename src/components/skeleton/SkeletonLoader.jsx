import React from 'react'
import "./style.css"

const SkeletonLoader = ({ count, width }) => {

    return (
        <div className="skeleton-card" style={{ height: `${count * 45}px`, width: `${width}px` }}>
            {generateSkeleton(count)}
        </div>
    )
}

export default SkeletonLoader

const generateSkeleton = (count) => {
    let hold = [];
    for (let i = 0; i < count; i++) {
        hold.push(<div className="skeleton"></div>)
    }
    return hold;
}