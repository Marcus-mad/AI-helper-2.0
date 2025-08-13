import { useState } from "react";
import { Send, Upload, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SuggestionCard } from "@/components/ui/suggestion-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
interface ChatAreaProps {
  mode: "chat" | "tutor" | "career" | "support";
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
  const [supportForm, setSupportForm] = useState({
    name: "Иван Петров",
    email: "ivan.petrov@example.com",
    topic: "",
    description: "",
    file: null as File | null
  });
  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Отправка сообщения:", message);
      setMessage("");
    }
  };
  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };
  const getCurrentSuggestions = () => {
    if (mode === "chat" && subMode) {
      return suggestions.chat[subMode] || [];
    }
    return suggestions[mode] || [];
  };
  const getHeaderText = () => {
    const modeLabels = {
      chat: "Болталка с ИИ",
      tutor: "Тьютор",
      career: "Профориентация",
      support: "Обратиться в поддержку"
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
  if (mode === "support") {
    return <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border bg-white/80 backdrop-blur-sm">
            <h1 className="text-2xl font-bold text-foreground">Обратиться в поддержку</h1>
            <p className="text-muted-foreground mt-1">
              Опишите вашу проблему, и мы поможем её решить
            </p>
          </div>

          {/* Support Form */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input id="name" value={supportForm.name} onChange={e => setSupportForm(prev => ({
                  ...prev,
                  name: e.target.value
                }))} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email для ответа</Label>
                  <Input id="email" type="email" value={supportForm.email} onChange={e => setSupportForm(prev => ({
                  ...prev,
                  email: e.target.value
                }))} className="mt-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="topic">Тема обращения</Label>
                <Select value={supportForm.topic} onValueChange={value => setSupportForm(prev => ({
                ...prev,
                topic: value
              }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Выберите тему" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="platform-error">Что-то не работает/не получается (ошибка в работе платформы)</SelectItem>
                    <SelectItem value="content-error">Вопрос по контенту (ошибка в контенте платформы)</SelectItem>
                    <SelectItem value="ai-error">Ошибки в ИИ функционале</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Описание проблемы</Label>
                <Textarea id="description" value={supportForm.description} onChange={e => setSupportForm(prev => ({
                ...prev,
                description: e.target.value
              }))} placeholder="Подробно опишите вашу проблему..." className="mt-1 min-h-[120px]" />
              </div>

              <div>
                <Label htmlFor="file">Прикрепить файл (скриншот, документ)</Label>
                <div className="mt-1 flex items-center gap-2">
                  <Input id="file" type="file" onChange={e => setSupportForm(prev => ({
                  ...prev,
                  file: e.target.files?.[0] || null
                }))} className="hidden" />
                  <Button variant="outline" onClick={() => document.getElementById('file')?.click()} className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Выбрать файл
                  </Button>
                  {supportForm.file && <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <File className="w-4 h-4" />
                      {supportForm.file.name}
                    </div>}
                </div>
              </div>

              <Button className="w-full md:w-auto" disabled={!supportForm.topic || !supportForm.description.trim()}>
                Отправить обращение
              </Button>
            </div>
          </div>
        </div>
      </div>;
  }
  return <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border bg-white/80 backdrop-blur-sm px-[21px] py-[6px] mx-[2px] my-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mx-0 px-px">{getHeaderText()}</h1>
              <p className="text-muted-foreground mt-1">
                {mode === "chat" && subMode === "information" && "Найдите любую информацию и получите подробные ответы"}
                {mode === "chat" && subMode === "text" && "Работайте с текстами: пишите, редактируйте, анализируйте"}
                {mode === "tutor" && "Персональный помощник для изучения любых предметов"}
                {mode === "career" && "Найдите свой путь в профессиональном развитии"}
              </p>
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
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        Работа с текстом
                      </h3>
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
          
          <div className="p-6">
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
                <Button onClick={handleSendMessage} disabled={!message.trim()} className="p-3 h-[60px] bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}