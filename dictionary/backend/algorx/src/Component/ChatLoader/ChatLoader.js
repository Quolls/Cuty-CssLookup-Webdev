import React from 'react'
import FadeLoader from "react-spinners/FadeLoader";

function ChatLoader() {
    return (
        <FadeLoader
            color="#18181B"
            loading={true}
            cssOverride={''}
            size={150}
        />
    )
}

export default ChatLoader