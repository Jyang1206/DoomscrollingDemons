import React, { useState } from 'react'

export default function VideoGeneratorOverlay({ isOpen, onClose }) {
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
          <view className="generator-content">
            <text className="generator-title">AI Video Generator</text>
            
            <text className="input-label">Describe your video:</text>
            <textInput
              className="prompt-input"
              value={prompt}
              onChangeText={setPrompt}
              placeholder="A cat playing with a ball in a garden..."
              multiline
            />

            <text className="input-label">Video Style:</text>
            <view className="style-options">
              {['dynamic', 'artistic', 'energetic'].map(style => (
                <touchableOpacity
                  key={style}
                  className={`style-option ${selectedStyle === style ? 'selected-style' : ''}`}
                  onPress={() => setSelectedStyle(style)}
                >
                  <text className="style-text">{style}</text>
                </touchableOpacity>
              ))}
            </view>

            <text className="input-label">Timeline Segments:</text>
            {timelineSegments.map((segment, index) => (
              <view key={index} className="timeline-segment">
                <textInput
                  className="timestamp-input"
                  value={segment.timestamp.toString()}
                  onChangeText={(text) => updateTimelineSegment(index, 'timestamp', parseInt(text) || 0)}
                  placeholder="0"
                  keyboardType="numeric"
                />
                <text className="timestamp-label">seconds</text>
                <textInput
                  className="description-input"
                  value={segment.description}
                  onChangeText={(text) => updateTimelineSegment(index, 'description', text)}
                  placeholder="Describe what happens at this time..."
                  multiline
                />
              </view>
            ))}
            
            <touchableOpacity className="add-segment-button" onPress={addTimelineSegment}>
              <text className="add-segment-text">+ Add Timeline Segment</text>
            </touchableOpacity>

            <touchableOpacity className="generate-button" onPress={generateVideo}>
              <text className="generate-button-text">🎬 Generate Video</text>
            </touchableOpacity>
          </view>
        )

      case 'generating':
        return (
          <view className="generating-content">
            <text className="generating-title">Generating Your Video...</text>
            <text className="generating-subtitle">This may take a few minutes</text>
            <view className="loading-spinner">
              <text className="spinner-text">⏳</text>
            </view>
          </view>
        )

      case 'options':
        return (
          <view className="options-content">
            <text className="options-title">Choose Your Video Style</text>
            <text className="options-subtitle">Select from 3 AI-generated variants</text>
            
            {['Dynamic', 'Artistic', 'Energetic'].map((style, index) => (
              <touchableOpacity
                key={style}
                className="video-option"
                onPress={() => selectVideo(style)}
              >
                <view className="video-option-preview">
                  <text className="video-option-text">🎬 {style} Style</text>
                </view>
                <text className="video-option-description">
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
          <view className="preview-content">
            <text className="preview-title">Your Generated Video</text>
            <text className="preview-subtitle">{selectedVideo} Style</text>
            
            <view className="video-preview">
              <text className="video-preview-text">🎬 Video Preview</text>
            </view>

            <text className="timeline-title">Timeline Summary:</text>
            {timelineSegments.map((segment, index) => (
              <view key={index} className="timeline-summary">
                <text className="timeline-time">{segment.timestamp}s</text>
                <text className="timeline-desc">{segment.description}</text>
              </view>
            ))}

            <view className="preview-actions">
              <touchableOpacity className="download-button">
                <text className="download-button-text">⬇️ Download</text>
              </touchableOpacity>
              <touchableOpacity className="share-button">
                <text className="share-button-text">📤 Share</text>
              </touchableOpacity>
            </view>
          </view>
        )

      default:
        return null
    }
  }

  return (
    <view className="overlay">
      <view className="overlay-content">
        <view className="overlay-header">
          <text className="overlay-title">AI Video Generator</text>
          <touchableOpacity className="close-button" onPress={onClose}>
            <text className="close-button-text">✕</text>
          </touchableOpacity>
        </view>
        
        {renderStep()}
      </view>
    </view>
  )
}
