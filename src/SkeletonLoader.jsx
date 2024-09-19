// SkeletonLoader.jsx
import React from 'react';

function SkeletonLoader({ width = 'w-full', height = 'h-6', borderRadius = 'rounded' }) {
    return (
        <div
            className={`bg-gray-300 ${width} ${height} ${borderRadius} animate-pulse`}
        ></div>
    );
}

export default SkeletonLoader;
