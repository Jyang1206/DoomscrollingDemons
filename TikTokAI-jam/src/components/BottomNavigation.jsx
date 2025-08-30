import React from 'react'

export default function BottomNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'discover', icon: '🔍', label: 'Discover' },
    { id: 'create', icon: '➕', label: 'Create' },
    { id: 'inbox', icon: '📥', label: 'Inbox' },
    { id: 'profile', icon: '👤', label: 'Profile' }
  ]

  return (
    <view className="bottom-nav">
      {tabs.map(tab => (
        <touchableOpacity
          key={tab.id}
          className="bottom-nav-tab"
          onPress={() => onTabChange(tab.id)}
        >
          <text className="bottom-nav-icon">{tab.icon}</text>
          <text className={`bottom-nav-label ${activeTab === tab.id ? 'active-bottom-tab' : ''}`}>
            {tab.label}
          </text>
        </touchableOpacity>
      ))}
    </view>
  )
}
