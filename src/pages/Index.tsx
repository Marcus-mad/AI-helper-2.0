import { useState } from "react"
import { Sidebar, ChatMode, ChatSubMode } from "@/components/sidebar"
import { ChatArea } from "@/components/chat-area"

const Index = () => {
  const [currentMode, setCurrentMode] = useState<ChatMode>("chat")
  const [currentSubMode, setCurrentSubMode] = useState<ChatSubMode>(null)

  const handleModeChange = (mode: ChatMode, subMode?: ChatSubMode) => {
    setCurrentMode(mode)
    setCurrentSubMode(subMode || null)
  }

  const handleNewChat = () => {
    setCurrentMode("chat")
    setCurrentSubMode(null)
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex">
      <Sidebar
        currentMode={currentMode}
        currentSubMode={currentSubMode}
        onModeChange={handleModeChange}
        onNewChat={handleNewChat}
      />
      <div className="flex-1 flex flex-col">
        {/* Main Header */}
        <div className="p-6 bg-white/90 backdrop-blur-sm border-b border-border">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              AI-помощник для учебы
            </h1>
            <p className="text-lg text-muted-foreground">
              Решай задачи, пиши конспекты и проходи тесты — всё в одном месте
            </p>
          </div>
        </div>
        
        <ChatArea mode={currentMode} subMode={currentSubMode} />
      </div>
    </div>
  );
};

export default Index;
