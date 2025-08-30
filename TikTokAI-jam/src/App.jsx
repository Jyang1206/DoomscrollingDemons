import { useState } from '@lynx-js/react'
import './App.css'

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
    <view style={styles.container}>
      {/* Show top navigation only on home tab */}
      {activeBottomTab === 'home' && (
        <TopNavigation 
          currentTab={activeTopTab} 
          onTabChange={setActiveTopTab} 
        />
      )}

      {/* Main content area */}
      <view style={[
        styles.content, 
        { paddingTop: activeBottomTab === 'home' ? 96 : 0 }
      ]}>
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

// Video Feed Component
function VideoFeed({ activeTab }) {
  const videos = [
    { id: 1, username: '@user1', description: 'Amazing video! #trending', likes: '1.2K', comments: '234', shares: '45' },
    { id: 2, username: '@user2', description: 'Check this out! #viral', likes: '5.6K', comments: '1.2K', shares: '89' },
    { id: 3, username: '@user3', description: 'Incredible content! #fyp', likes: '3.4K', comments: '567', shares: '123' }
  ]

  return (
    <scrollView style={styles.videoFeed}>
      {videos.map(video => (
        <view key={video.id} style={styles.videoContainer}>
          <view style={styles.videoPlaceholder}>
            <text style={styles.videoText}>Video {video.id}</text>
          </view>
          
          {/* Right side actions */}
          <view style={styles.videoActions}>
            <view style={styles.actionButton}>
              <text style={styles.actionIcon}>❤️</text>
              <text style={styles.actionText}>{video.likes}</text>
            </view>
            <view style={styles.actionButton}>
              <text style={styles.actionIcon}>💬</text>
              <text style={styles.actionText}>{video.comments}</text>
            </view>
            <view style={styles.actionButton}>
              <text style={styles.actionIcon}>↗️</text>
              <text style={styles.actionText}>{video.shares}</text>
            </view>
          </view>

          {/* Bottom video info */}
          <view style={styles.videoInfo}>
            <text style={styles.username}>{video.username}</text>
            <text style={styles.description}>{video.description}</text>
          </view>
        </view>
      ))}
    </scrollView>
  )
}

// Top Navigation Component
function TopNavigation({ currentTab, onTabChange }) {
  return (
    <view style={styles.topNav}>
      <view style={styles.topNavContent}>
        <text style={styles.topNavTitle}>TikTok</text>
        <view style={styles.topNavTabs}>
          <touchableOpacity 
            style={[styles.tab, currentTab === 'foryou' && styles.activeTab]}
            onPress={() => onTabChange('foryou')}
          >
            <text style={[styles.tabText, currentTab === 'foryou' && styles.activeTabText]}>
              For You
            </text>
          </touchableOpacity>
          <touchableOpacity 
            style={[styles.tab, currentTab === 'following' && styles.activeTab]}
            onPress={() => onTabChange('following')}
          >
            <text style={[styles.tabText, currentTab === 'following' && styles.activeTabText]}>
              Following
            </text>
          </touchableOpacity>
        </view>
      </view>
    </view>
  )
}

// Bottom Navigation Component
function BottomNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'discover', icon: '🔍', label: 'Discover' },
    { id: 'create', icon: '➕', label: 'Create' },
    { id: 'inbox', icon: '📥', label: 'Inbox' },
    { id: 'profile', icon: '👤', label: 'Profile' }
  ]

  return (
    <view style={styles.bottomNav}>
      {tabs.map(tab => (
        <touchableOpacity
          key={tab.id}
          style={styles.bottomNavTab}
          onPress={() => onTabChange(tab.id)}
        >
          <text style={styles.bottomNavIcon}>{tab.icon}</text>
          <text style={[
            styles.bottomNavLabel,
            activeTab === tab.id && styles.activeBottomTab
          ]}>
            {tab.label}
          </text>
        </touchableOpacity>
      ))}
    </view>
  )
}

// Create Screen Component
function CreateScreen({ onOpenGenerator }) {
  return (
    <view style={styles.createScreen}>
      <text style={styles.createTitle}>Create Content</text>
      <touchableOpacity style={styles.createButton} onPress={onOpenGenerator}>
        <text style={styles.createButtonText}>🎬 Generate AI Video</text>
      </touchableOpacity>
      <text style={styles.createSubtitle}>Create amazing videos with AI</text>
    </view>
  )
}

// Discover Screen Component
function DiscoverScreen() {
  return (
    <view style={styles.discoverScreen}>
      <text style={styles.discoverTitle}>Discover</text>
      <text style={styles.discoverSubtitle}>Find trending content</text>
    </view>
  )
}

// Inbox Screen Component
function InboxScreen() {
  return (
    <view style={styles.inboxScreen}>
      <text style={styles.inboxTitle}>Inbox</text>
      <text style={styles.inboxSubtitle}>Your notifications and messages</text>
    </view>
  )
}

// Profile Screen Component
function ProfileScreen() {
  return (
    <view style={styles.profileScreen}>
      <text style={styles.profileTitle}>Profile</text>
      <text style={styles.profileSubtitle}>Your profile and videos</text>
    </view>
  )
}

// Video Generator Overlay Component
function VideoGeneratorOverlay({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState('input')
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('dynamic')
  const [timelineSegments, setTimelineSegments] = useState([
    { timestamp: 0, description: '' }
  ])
  const [selectedVideo, setSelectedVideo] = useState(null)

  if (!isOpen) return null

  const addTimelineSegment = () => {
    setTimelineSegments([...timelineSegments, { 
      timestamp: timelineSegments.length * 5, 
      description: '' 
    }])
  }

  const updateTimelineSegment = (index, field, value) => {
    const newSegments = [...timelineSegments]
    newSegments[index][field] = value
    setTimelineSegments(newSegments)
  }

  const generateVideo = () => {
    setCurrentStep('generating')
    // Simulate generation
    setTimeout(() => {
      setCurrentStep('options')
    }, 3000)
  }

  const selectVideo = (style) => {
    setSelectedVideo(style)
    setCurrentStep('preview')
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'input':
        return (
          <view style={styles.generatorContent}>
            <text style={styles.generatorTitle}>AI Video Generator</text>
            
            <text style={styles.inputLabel}>Describe your video:</text>
            <textInput
              style={styles.promptInput}
              value={prompt}
              onChangeText={setPrompt}
              placeholder="A cat playing with a ball in a garden..."
              multiline
            />

            <text style={styles.inputLabel}>Video Style:</text>
            <view style={styles.styleOptions}>
              {['dynamic', 'artistic', 'energetic'].map(style => (
                <touchableOpacity
                  key={style}
                  style={[styles.styleOption, selectedStyle === style && styles.selectedStyle]}
                  onPress={() => setSelectedStyle(style)}
                >
                  <text style={styles.styleText}>{style}</text>
                </touchableOpacity>
              ))}
            </view>

            <text style={styles.inputLabel}>Timeline Segments:</text>
            {timelineSegments.map((segment, index) => (
              <view key={index} style={styles.timelineSegment}>
                <textInput
                  style={styles.timestampInput}
                  value={segment.timestamp.toString()}
                  onChangeText={(text) => updateTimelineSegment(index, 'timestamp', parseInt(text) || 0)}
                  placeholder="0"
                  keyboardType="numeric"
                />
                <text style={styles.timestampLabel}>seconds</text>
                <textInput
                  style={styles.descriptionInput}
                  value={segment.description}
                  onChangeText={(text) => updateTimelineSegment(index, 'description', text)}
                  placeholder="Describe what happens at this time..."
                  multiline
                />
              </view>
            ))}
            
            <touchableOpacity style={styles.addSegmentButton} onPress={addTimelineSegment}>
              <text style={styles.addSegmentText}>+ Add Timeline Segment</text>
            </touchableOpacity>

            <touchableOpacity style={styles.generateButton} onPress={generateVideo}>
              <text style={styles.generateButtonText}>🎬 Generate Video</text>
            </touchableOpacity>
          </view>
        )

      case 'generating':
        return (
          <view style={styles.generatingContent}>
            <text style={styles.generatingTitle}>Generating Your Video...</text>
            <text style={styles.generatingSubtitle}>This may take a few minutes</text>
            <view style={styles.loadingSpinner}>
              <text style={styles.spinnerText}>⏳</text>
            </view>
          </view>
        )

      case 'options':
        return (
          <view style={styles.optionsContent}>
            <text style={styles.optionsTitle}>Choose Your Video Style</text>
            <text style={styles.optionsSubtitle}>Select from 3 AI-generated variants</text>
            
            {['Dynamic', 'Artistic', 'Energetic'].map((style, index) => (
              <touchableOpacity
                key={style}
                style={styles.videoOption}
                onPress={() => selectVideo(style)}
              >
                <view style={styles.videoOptionPreview}>
                  <text style={styles.videoOptionText}>🎬 {style} Style</text>
                </view>
                <text style={styles.videoOptionDescription}>
                  {style === 'Dynamic' && 'Smooth camera movements and transitions'}
                  {style === 'Artistic' && 'Creative filters and visual effects'}
                  {style === 'Energetic' && 'Fast-paced editing and dynamic cuts'}
                </text>
              </touchableOpacity>
            ))}
          </view>
        )

      case 'preview':
        return (
          <view style={styles.previewContent}>
            <text style={styles.previewTitle}>Your Generated Video</text>
            <text style={styles.previewSubtitle}>{selectedVideo} Style</text>
            
            <view style={styles.videoPreview}>
              <text style={styles.videoPreviewText}>🎬 Video Preview</text>
            </view>

            <text style={styles.timelineTitle}>Timeline Summary:</text>
            {timelineSegments.map((segment, index) => (
              <view key={index} style={styles.timelineSummary}>
                <text style={styles.timelineTime}>{segment.timestamp}s</text>
                <text style={styles.timelineDesc}>{segment.description}</text>
              </view>
            ))}

            <view style={styles.previewActions}>
              <touchableOpacity style={styles.downloadButton}>
                <text style={styles.downloadButtonText}>⬇️ Download</text>
              </touchableOpacity>
              <touchableOpacity style={styles.shareButton}>
                <text style={styles.shareButtonText}>📤 Share</text>
              </touchableOpacity>
            </view>
          </view>
        )

      default:
        return null
    }
  }

  return (
    <view style={styles.overlay}>
      <view style={styles.overlayContent}>
        <view style={styles.overlayHeader}>
          <text style={styles.overlayTitle}>AI Video Generator</text>
          <touchableOpacity style={styles.closeButton} onPress={onClose}>
            <text style={styles.closeButtonText}>✕</text>
          </touchableOpacity>
        </view>
        
        {renderStep()}
      </view>
    </view>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    paddingBottom: 80,
  },
  videoFeed: {
    flex: 1,
  },
  videoContainer: {
    height: '100vh',
    position: 'relative',
  },
  videoPlaceholder: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  videoActions: {
    position: 'absolute',
    right: 16,
    bottom: 120,
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  videoInfo: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 80,
  },
  username: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
  },
  topNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: 44,
    paddingBottom: 16,
  },
  topNavContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  topNavTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topNavTabs: {
    flexDirection: 'row',
  },
  tab: {
    marginLeft: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#ffffff',
  },
  tabText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#000000',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 8,
    paddingBottom: 20,
  },
  bottomNavTab: {
    flex: 1,
    alignItems: 'center',
  },
  bottomNavIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  bottomNavLabel: {
    color: '#888888',
    fontSize: 10,
    fontWeight: '500',
  },
  activeBottomTab: {
    color: '#ffffff',
  },
  createScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  createTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#fe2c55',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 16,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createSubtitle: {
    color: '#888888',
    fontSize: 16,
    textAlign: 'center',
  },
  discoverScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discoverTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  discoverSubtitle: {
    color: '#888888',
    fontSize: 16,
  },
  inboxScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inboxTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inboxSubtitle: {
    color: '#888888',
    fontSize: 16,
  },
  profileScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileSubtitle: {
    color: '#888888',
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 1000,
  },
  overlayContent: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    marginTop: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  overlayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  overlayTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 24,
  },
  generatorContent: {
    padding: 20,
  },
  generatorTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  promptInput: {
    backgroundColor: '#333333',
    color: '#ffffff',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  styleOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  styleOption: {
    flex: 1,
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedStyle: {
    backgroundColor: '#fe2c55',
  },
  styleText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  timelineSegment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timestampInput: {
    backgroundColor: '#333333',
    color: '#ffffff',
    padding: 8,
    borderRadius: 8,
    width: 60,
    textAlign: 'center',
    marginRight: 8,
  },
  timestampLabel: {
    color: '#888888',
    fontSize: 14,
    marginRight: 12,
  },
  descriptionInput: {
    flex: 1,
    backgroundColor: '#333333',
    color: '#ffffff',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
  },
  addSegmentButton: {
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  addSegmentText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  generateButton: {
    backgroundColor: '#fe2c55',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  generatingContent: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  generatingTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  generatingSubtitle: {
    color: '#888888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  loadingSpinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fe2c55',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerText: {
    fontSize: 24,
  },
  optionsContent: {
    padding: 20,
  },
  optionsTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  optionsSubtitle: {
    color: '#888888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  videoOption: {
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  videoOptionPreview: {
    alignItems: 'center',
    marginBottom: 12,
  },
  videoOptionText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  videoOptionDescription: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  previewContent: {
    padding: 20,
  },
  previewTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  previewSubtitle: {
    color: '#888888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  videoPreview: {
    backgroundColor: '#333333',
    height: 200,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  videoPreviewText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timelineTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timelineSummary: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  timelineTime: {
    color: '#fe2c55',
    fontSize: 14,
    fontWeight: 'bold',
    width: 40,
  },
  timelineDesc: {
    color: '#ffffff',
    fontSize: 14,
    flex: 1,
    marginLeft: 12,
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  downloadButton: {
    backgroundColor: '#fe2c55',
    padding: 16,
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    backgroundColor: '#333333',
    padding: 16,
    borderRadius: 12,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}
