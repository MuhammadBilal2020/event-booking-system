import React from 'react'

const Loading = () => {
    return (
        <div className="flex items-center gap-2 justify-center min-h-screen bg-white">
            loading

            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )
}

export default Loading