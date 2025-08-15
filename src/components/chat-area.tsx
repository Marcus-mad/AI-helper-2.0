import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SuggestionCard } from "@/components/ui/suggestion-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface ChatAreaProps {
  mode: "chat" | "tutor" | "career";
  subMode?: "information" | "text" | null;
  onSubModeChange?: (subMode: "information" | "text") => void;
}
const suggestions = {
  chat: {
    information: ["Найди информацию о квантовой физике", "Расскажи про историю Древнего Рима", "Объясни принципы машинного обучения", "Что такое фотосинтез?"],
    text: ["Помоги написать эссе по литературе", "Проверь мой текст на ошибки", "Перефразируй этот абзац", "Составь план для курсовой работы"]
  },
  tutor: ["Объясни решение уравнения", "Помоги с домашним заданием по химии", "Разбери задачу по физике", "Подготовься к экзамену по математике"],
  career: ["Какие профессии подходят мне?", "Расскажи про карьеру в IT", "Как развиваться в маркетинге?", "Что изучать для работы дизайнером?"]
};
export function ChatArea({
  mode,
  subMode,
  onSubModeChange
}: ChatAreaProps) {
  const [message, setMessage] = useState("");
  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Отправка сообщения:", message);
      setMessage("");
    }
  };
  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };
  const getCurrentSuggestions = (): string[] => {
    if (mode === "chat" && subMode) {
      return suggestions.chat[subMode] || [];
    }
    const modeSuggestions = suggestions[mode];
    return Array.isArray(modeSuggestions) ? modeSuggestions : [];
  };
  const getHeaderText = () => {
    const modeLabels = {
      chat: "Болталка с ИИ",
      tutor: "Тьютор",
      career: "Профориентация"
    };
    return modeLabels[mode];
  };
  const getInitialMessage = () => {
    if (mode === "chat" && subMode === "information") {
      return "Привет! Я помогу тебе найти любую информацию. О чём хочешь узнать?";
    }
    if (mode === "chat" && subMode === "text") {
      return "Привет! Я помогу с работой над текстами. Что будем писать или редактировать?";
    }
    if (mode === "tutor") {
      return "Привет! Я твой персональный тьютор. По какому предмету нужна помощь?";
    }
    if (mode === "career") {
      return "Привет! Я помогу с профориентацией. Давай обсудим твои интересы и найдём подходящую карьеру!";
    }
    return "";
  };
  const handleSubModeCardClick = (selectedSubMode: "information" | "text") => {
    if (onSubModeChange) {
      onSubModeChange(selectedSubMode);
    }
  };
  return <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 bg-white/80 backdrop-blur-sm px-[21px] py-[6px] mx-[2px] my-0">
          <div className="flex items-center justify-between mx-[113px] py-px">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mx-0 px-px">{getHeaderText()}</h1>
              
            </div>
            {mode === "chat" && onSubModeChange && <div className="w-64">
                <Select value={subMode || ""} onValueChange={value => onSubModeChange(value as "information" | "text")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите режим работы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="information">Работа с информацией</SelectItem>
                    <SelectItem value="text">Работа с текстом</SelectItem>
                  </SelectContent>
                </Select>
              </div>}
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Chat mode submode selection */}
            {mode === "chat" && !subMode && <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-foreground mb-2">Выберите режим работы</h2>
                  <p className="text-muted-foreground">Что будем делать сегодня?</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <button onClick={() => handleSubModeCardClick("information")} className="p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-border hover:border-primary/30 shadow-card hover:shadow-soft transition-all duration-300 text-left group hover:scale-[1.02] active:scale-[0.98]">
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                        <span className="text-white text-xl">🔍</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        Работа с информацией
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Найдите любую информацию и получите подробные ответы
                      </p>
                    </div>
                  </button>
                  <button onClick={() => handleSubModeCardClick("text")} className="p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-border hover:border-primary/30 shadow-card hover:shadow-soft transition-all duration-300 text-left group hover:scale-[1.02] active:scale-[0.98]">
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                        <span className="text-white text-xl">✍️</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">Работа с контентом</h3>
                      <p className="text-sm text-muted-foreground">
                        Работайте с текстами: пишите, редактируйте, анализируйте
                      </p>
                    </div>
                  </button>
                </div>
              </div>}

            {getInitialMessage() && <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-card animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">AI</span>
                  </div>
                  <p className="text-foreground flex-1">{getInitialMessage()}</p>
                </div>
              </div>}
            {message.trim() && <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-card animate-fade-in ml-8">
                <p className="text-foreground">{message}</p>
              </div>}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-white/80 backdrop-blur-sm">
          {/* Suggestions */}
          {getCurrentSuggestions().length > 0 && <div className="p-6 pb-3 bg-gradient-subtle border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
                {getCurrentSuggestions().map((suggestion, index) => <SuggestionCard key={index} title={suggestion} onClick={() => handleSuggestionClick(suggestion)} />)}
              </div>
            </div>}
          
          <div className="p-6 py-[15px]">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Напишите ваш вопрос..." className="min-h-[60px] max-h-[120px] resize-none border-border/50 focus:border-primary" onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }} />
                </div>
                <Button onClick={handleSendMessage} disabled={!message.trim()} className="p-3 h-[60px] bg-gradient-primary hover:shadow-glow transition-all duration-300 mx-px py-0 px-[20px]">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}