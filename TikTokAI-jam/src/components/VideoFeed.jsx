import React from 'react'

export default function VideoFeed({ activeTab }) {
  const videos = [
    { id: 1, username: '@user1', description: 'Amazing video! #trending', likes: '1.2K', comments: '234', shares: '45' },
    { id: 2, username: '@user2', description: 'Check this out! #viral', likes: '5.6K', comments: '1.2K', shares: '89' },
    { id: 3, username: '@user3', description: 'Incredible content! #fyp', likes: '3.4K', comments: '567', shares: '123' }
  ]

  return (
    <scrollView className="video-feed">
      {videos.map(video => (
        <view key={video.id} className="video-container">
          <view className="video-placeholder">
            <text className="video-text">Video {video.id}</text>
          </view>
          
          {/* Right side actions */}
          <view className="video-actions">
            <view className="action-button">
              <text className="action-icon">❤️</text>
              <text className="action-text">{video.likes}</text>
            </view>
            <view className="action-button">
              <text className="action-icon">💬</text>
              <text className="action-text">{video.comments}</text>
            </view>
            <view className="action-button">
              <text className="action-icon">↗️</text>
              <text className="action-text">{video.shares}</text>
            </view>
          </view>

          {/* Bottom video info */}
          <view className="video-info">
            <text className="username">{video.username}</text>
            <text className="description">{video.description}</text>
          </view>
        </view>
      ))}
    </scrollView>
  )
}
