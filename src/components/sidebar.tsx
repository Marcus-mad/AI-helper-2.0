import { useState } from "react"
import { MessageSquare, GraduationCap, Compass, HelpCircle, Clock, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type ChatMode = "chat" | "tutor" | "career" | "support"
export type ChatSubMode = "information" | "text" | null

interface ChatHistory {
  id: string
  title: string
  mode: ChatMode
  subMode?: ChatSubMode
  lastActivity: string
}

interface SidebarProps {
  currentMode: ChatMode
  currentSubMode: ChatSubMode
  onModeChange: (mode: ChatMode, subMode?: ChatSubMode) => void
  onNewChat: () => void
}

const chatHistory: ChatHistory[] = [
  {
    id: "1",
    title: "Помощь с математикой",
    mode: "tutor",
    lastActivity: "2 часа назад"
  },
  {
    id: "2", 
    title: "Анализ текста по литературе",
    mode: "chat",
    subMode: "text",
    lastActivity: "5 часов назад"
  },
  {
    id: "3",
    title: "Карьера в IT",
    mode: "career", 
    lastActivity: "Вчера"
  },
  {
    id: "4",
    title: "Физика - законы Ньютона",
    mode: "tutor",
    lastActivity: "2 дня назад"
  },
  {
    id: "5",
    title: "Поиск информации о химии",
    mode: "chat",
    subMode: "information", 
    lastActivity: "3 дня назад"
  }
]

export function Sidebar({ currentMode, currentSubMode, onModeChange, onNewChat }: SidebarProps) {
  const [showAllHistory, setShowAllHistory] = useState(false)
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null)
  
  const visibleHistory = showAllHistory ? chatHistory : chatHistory.slice(0, 5)

  const modeIcons = {
    chat: MessageSquare,
    tutor: GraduationCap,
    career: Compass,
    support: HelpCircle
  }

  const modeLabels = {
    chat: "Болталка с ИИ",
    tutor: "Тьютор",
    career: "Профориентация",
    support: "Обратиться в поддержку"
  }

  const getModeIcon = (mode: ChatMode) => {
    const Icon = modeIcons[mode]
    return <Icon className="w-4 h-4" />
  }

  const handleChatSubModeChange = (subMode: string) => {
    onModeChange("chat", subMode as ChatSubMode)
  }

  const handleHistoryClick = (item: ChatHistory) => {
    setSelectedHistoryId(item.id)
    onModeChange(item.mode, item.subMode)
  }

  return (
    <div className="w-80 bg-gradient-subtle border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <button
          onClick={onNewChat}
          className="w-full p-3 bg-gradient-primary text-primary-foreground rounded-2xl font-medium
                   hover:shadow-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          + Новый диалог
        </button>
      </div>

      {/* Modes */}
      <div className="p-4 space-y-2">
        {(["chat", "tutor", "career"] as ChatMode[]).map((mode) => (
          <div key={mode} className="space-y-2">
            <button
              onClick={() => mode !== "chat" && onModeChange(mode)}
              className={cn(
                "w-full p-3 rounded-xl flex items-center gap-3 text-left transition-all duration-200",
                currentMode === mode
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "hover:bg-secondary/50 text-foreground/70"
              )}
            >
              {getModeIcon(mode)}
              <span className="font-medium">{modeLabels[mode]}</span>
              {mode === "chat" && (
                <ChevronDown className={cn(
                  "w-4 h-4 ml-auto transition-transform",
                  currentMode === "chat" ? "rotate-180" : ""
                )} />
              )}
            </button>
            
            {mode === "chat" && currentMode === "chat" && (
              <div className="ml-6 animate-fade-in">
                <Select value={currentSubMode || ""} onValueChange={handleChatSubModeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите режим работы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="information">Работа с информацией</SelectItem>
                    <SelectItem value="text">Работа с текстом</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* History */}
      <div className="flex-1 p-4 space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">История диалогов</span>
        </div>
        
        <div className="space-y-1">
          {visibleHistory.map((item) => (
            <button
              key={item.id}
              onClick={() => handleHistoryClick(item)}
              className={cn(
                "w-full p-3 rounded-xl text-left transition-all duration-200 group",
                selectedHistoryId === item.id
                  ? "bg-primary/10 border border-primary/20"
                  : "hover:bg-secondary/30"
              )}
            >
              <div className="flex items-start gap-2">
                {getModeIcon(item.mode)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground/80 truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.lastActivity}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {chatHistory.length > 5 && (
          <button
            onClick={() => setShowAllHistory(!showAllHistory)}
            className="w-full p-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {showAllHistory ? "Скрыть" : "Показать еще"}
          </button>
        )}
      </div>

      {/* Support */}
      <div className="p-4 border-t border-border">
        <button
          onClick={() => onModeChange("support")}
          className={cn(
            "w-full p-3 rounded-xl flex items-center gap-3 text-left transition-all duration-200",
            currentMode === "support"
              ? "bg-primary/10 text-primary border border-primary/20"
              : "hover:bg-secondary/50 text-foreground/70"
          )}
        >
          {getModeIcon("support")}
          <span className="font-medium">{modeLabels.support}</span>
        </button>
      </div>
    </div>
  )
}