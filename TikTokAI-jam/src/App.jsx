import { useState } from '@lynx-js/react'
import './App.css'
import {
  VideoFeed,
  TopNavigation,
  BottomNavigation,
  CreateScreen,
  DiscoverScreen,
  InboxScreen,
  ProfileScreen,
  VideoGeneratorOverlay
} from './components'

export function App(props) {
  const [activeBottomTab, setActiveBottomTab] = useState('home')
  const [activeTopTab, setActiveTopTab] = useState('foryou')
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false)

  const renderContent = () => {
    switch (activeBottomTab) {
      case 'home':
        return <VideoFeed activeTab={activeTopTab} />
      case 'discover':
        return <DiscoverScreen />
      case 'create':
        return <CreateScreen onOpenGenerator={() => setIsGeneratorOpen(true)} />
      case 'inbox':
        return <InboxScreen />
      case 'profile':
        return <ProfileScreen />
      default:
        return <VideoFeed activeTab={activeTopTab} />
    }
  }

  return (
    <view className="container">
      {/* Show top navigation only on home tab */}
      {activeBottomTab === 'home' && (
        <TopNavigation 
          currentTab={activeTopTab} 
          onTabChange={setActiveTopTab} 
        />
      )}

      {/* Main content area */}
      <view className={`content ${activeBottomTab === 'home' ? 'with-top-nav' : ''}`}>
        {renderContent()}
      </view>

      {/* Bottom navigation */}
      <BottomNavigation 
        activeTab={activeBottomTab} 
        onTabChange={setActiveBottomTab} 
      />

      {/* Video Generator Overlay */}
      <VideoGeneratorOverlay 
        isOpen={isGeneratorOpen}
        onClose={() => {
          setIsGeneratorOpen(false)
          setActiveBottomTab('home')
        }}
      />
    </view>
  )
}
