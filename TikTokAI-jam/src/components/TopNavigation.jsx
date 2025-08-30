import React from 'react'

export default function TopNavigation({ currentTab, onTabChange }) {
  return (
    <view className="top-nav">
      <view className="top-nav-content">
        <text className="top-nav-title">TikTok</text>
        <view className="top-nav-tabs">
          <touchableOpacity 
            className={`tab ${currentTab === 'foryou' ? 'active-tab' : ''}`}
            onPress={() => onTabChange('foryou')}
          >
            <text className={`tab-text ${currentTab === 'foryou' ? 'active-tab-text' : ''}`}>
              For You
            </text>
          </touchableOpacity>
          <touchableOpacity 
            className={`tab ${currentTab === 'following' ? 'active-tab' : ''}`}
            onPress={() => onTabChange('following')}
          >
            <text className={`tab-text ${currentTab === 'following' ? 'active-tab-text' : ''}`}>
              Following
            </text>
          </touchableOpacity>
        </view>
      </view>
    </view>
  )
}
