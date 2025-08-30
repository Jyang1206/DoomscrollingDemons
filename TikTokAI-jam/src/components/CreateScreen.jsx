import React from 'react'

export default function CreateScreen({ onOpenGenerator }) {
  return (
    <view className="create-screen">
      <text className="create-title">Create Content</text>
      <touchableOpacity className="create-button" onPress={onOpenGenerator}>
        <text className="create-button-text">🎬 Generate AI Video</text>
      </touchableOpacity>
      <text className="create-subtitle">Create amazing videos with AI</text>
    </view>
  )
}
