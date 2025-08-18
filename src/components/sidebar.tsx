import { useState } from "react";
import { MessageSquare, GraduationCap, Compass, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export type ChatMode = "chat" | "tutor" | "career";
export type ChatSubMode = "information" | "text" | null;
interface ChatHistory {
  id: string;
  title: string;
  mode: ChatMode;
  subMode?: ChatSubMode;
  lastActivity: string;
}
interface SidebarProps {
  currentMode: ChatMode;
  currentSubMode: ChatSubMode;
  onModeChange: (mode: ChatMode, subMode?: ChatSubMode) => void;
  onNewChat: () => void;
}
const chatHistory: ChatHistory[] = [{
  id: "1",
  title: "Помощь с математикой",
  mode: "tutor",
  lastActivity: "2 часа назад"
}, {
  id: "2",
  title: "Анализ текста по литературе",
  mode: "chat",
  subMode: "text",
  lastActivity: "5 часов назад"
}, {
  id: "3",
  title: "Карьера в IT",
  mode: "career",
  lastActivity: "Вчера"
}, {
  id: "4",
  title: "Физика - законы Ньютона",
  mode: "tutor",
  lastActivity: "2 дня назад"
}, {
  id: "5",
  title: "Поиск информации о химии",
  mode: "chat",
  subMode: "information",
  lastActivity: "3 дня назад"
}];
const additionalHistory: ChatHistory[] = [{
  id: "6",
  title: "Подготовка к экзамену по истории",
  mode: "tutor",
  lastActivity: "4 дня назад"
}, {
  id: "7",
  title: "Создание презентации",
  mode: "chat",
  subMode: "text",
  lastActivity: "5 дней назад"
}, {
  id: "8",
  title: "Выбор специальности в университете",
  mode: "career",
  lastActivity: "1 неделю назад"
}, {
  id: "9",
  title: "Изучение английской грамматики",
  mode: "tutor",
  lastActivity: "1 неделю назад"
}, {
  id: "10",
  title: "Исследование о космосе",
  mode: "chat",
  subMode: "information",
  lastActivity: "2 недели назад"
}];
export function Sidebar({
  currentMode,
  currentSubMode,
  onModeChange,
  onNewChat
}: SidebarProps) {
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  const [isFromHistory, setIsFromHistory] = useState(false);
  const allHistory = [...chatHistory, ...additionalHistory];
  const visibleHistory = showAllHistory ? allHistory : chatHistory;
  const modeIcons = {
    chat: MessageSquare,
    tutor: GraduationCap,
    career: Compass
  };
  const modeLabels = {
    chat: "Болталка с ИИ",
    tutor: "Тьютор",
    career: "Профориентация"
  };
  const getModeIcon = (mode: ChatMode) => {
    const Icon = modeIcons[mode];
    return <Icon className="w-4 h-4" />;
  };
  const handleChatSubModeChange = (subMode: string) => {
    onModeChange("chat", subMode as ChatSubMode);
  };
  const handleHistoryClick = (item: ChatHistory) => {
    setSelectedHistoryId(item.id);
    setIsFromHistory(true);
    onModeChange(item.mode, item.subMode);
  };
  const handleModeChangeWrapper = (mode: ChatMode, subMode?: ChatSubMode) => {
    setIsFromHistory(false);
    setSelectedHistoryId(null);
    onModeChange(mode, subMode);
  };
  return <div className="w-80 bg-gradient-subtle border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border py-[15px]">
        <button onClick={onNewChat} className="w-full p-3 bg-gradient-primary text-primary-foreground rounded-2xl font-medium
                   hover:shadow-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          + Новый диалог
        </button>
      </div>

      {/* Modes */}
      <div className="p-4 space-y-2">
        {(["chat", "tutor", "career"] as ChatMode[]).map(mode => <div key={mode} className="space-y-2">
            <button onClick={() => handleModeChangeWrapper(mode)} className={cn("w-full p-3 rounded-xl flex items-center gap-3 text-left transition-all duration-200", currentMode === mode && !isFromHistory ? "bg-primary/10 text-primary border border-primary/20" : "hover:bg-secondary/50 text-foreground/70")}>
              {getModeIcon(mode)}
              <span className="font-medium">{modeLabels[mode]}</span>
            </button>
            
          </div>)}
      </div>

      {/* History */}
      <div className="flex-1 p-4 space-y-2 overflow-auto">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">История диалогов</span>
        </div>
        
        <div className="space-y-1">
          {visibleHistory.map(item => <button key={item.id} onClick={() => handleHistoryClick(item)} className={cn("w-full p-3 rounded-xl text-left transition-all duration-200 group", selectedHistoryId === item.id ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary/30")}>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground/80 truncate">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.lastActivity}
                </p>
              </div>
            </button>)}
        </div>

        <button onClick={() => setShowAllHistory(!showAllHistory)} className="w-full p-2 text-sm text-primary hover:text-primary/80 transition-colors">
          {showAllHistory ? "Скрыть" : "Посмотреть еще"}
        </button>
      </div>

    </div>;
}