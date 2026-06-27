"use client";

import { useState } from "react";
import { Bot, Play, Save, TestTube, Upload, Mic, Check, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const VOICES = [
  { id: "v1", name: "Zeynep", lang: "tr-TR", style: "Profesyonel" },
  { id: "v2", name: "Ahmet", lang: "tr-TR", style: "Samimi" },
  { id: "v3", name: "Elif", lang: "tr-TR", style: "Enerjik" },
  { id: "v4", name: "Mert", lang: "tr-TR", style: "Sakin" },
  { id: "v5", name: "Sarah", lang: "en-US", style: "Professional" },
  { id: "v6", name: "James", lang: "en-US", style: "Friendly" },
];

const DEFAULT_PROMPT = `Sen VoiceSync şirketinin müşteri hizmetleri asistanısın. Müşterilere yardımcı, nazik ve profesyonel bir şekilde yaklaşırsın.

Görevlerin:
- Müşteri sorularını yanıtlamak
- Teknik sorunlarda yönlendirme yapmak
- Gerektiğinde ilgili departmana aktarmak

Unutma: Her zaman Türkçe konuş ve müşteri memnuniyetini ön planda tut.`;

export default function AgentsPage() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [greeting, setGreeting] = useState("Merhaba! VoiceSync asistanınım. Size nasıl yardımcı olabilirim?");
  const [selectedVoice, setSelectedVoice] = useState("v1");
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [speed, setSpeed] = useState(1.0);
  const [maxDuration, setMaxDuration] = useState(10);
  const [saved, setSaved] = useState(false);

  const charCount = prompt.length;
  const maxChars = 2000;

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handlePlay(id: string) {
    setPlayingVoice(id);
    setTimeout(() => setPlayingVoice(null), 2500);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Ajan Konfigürasyonu</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Asistanınızın davranış ve ses ayarları</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <TestTube className="w-3.5 h-3.5" /> Test Et
          </Button>
          <Button size="sm" className="gap-1.5 bg-primary hover:bg-primary/90" onClick={handleSave}>
            {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {saved ? "Kaydedildi" : "Kaydet"}
          </Button>
        </div>
      </div>

      {/* System Prompt */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-primary" />
          <h3 className="font-medium text-sm text-foreground">System Prompt</h3>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
          rows={8}
          maxLength={maxChars}
          placeholder="Asistanın nasıl davranmasını istediğinizi yazın..."
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Asistanın kişiliği, görevleri ve sınırlamalarını tanımlayın.</p>
          <span className={cn("text-xs", charCount > maxChars * 0.9 ? "text-amber-500" : "text-muted-foreground")}>
            {charCount}/{maxChars}
          </span>
        </div>
      </div>

      {/* Greeting */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <h3 className="font-medium text-sm text-foreground">Karşılama Mesajı</h3>
        <Input
          value={greeting}
          onChange={(e) => setGreeting(e.target.value)}
          placeholder="Çağrı başında söylenecek mesaj..."
          className="text-sm"
        />
        <p className="text-xs text-muted-foreground">Müşteri aramayı açtığında asistanın söyleyeceği ilk mesaj.</p>
      </div>

      {/* Voice Selection */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Mic className="w-4 h-4 text-primary" />
          <h3 className="font-medium text-sm text-foreground">Ses Seçimi</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {VOICES.map((voice) => (
            <div
              key={voice.id}
              onClick={() => setSelectedVoice(voice.id)}
              className={cn(
                "relative rounded-xl border p-3 cursor-pointer transition-all",
                selectedVoice === voice.id
                  ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                  : "border-border hover:border-foreground/20 hover:bg-muted/30"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{voice.name}</p>
                  <p className="text-xs text-muted-foreground">{voice.style}</p>
                </div>
                {selectedVoice === voice.id && (
                  <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{voice.lang}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePlay(voice.id); }}
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  {playingVoice === voice.id ? (
                    <div className="flex items-center gap-0.5 h-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-0.5 bg-primary rounded-full animate-pulse" style={{ height: `${4 + i * 2}px`, animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Voice Cloning */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-primary" />
            <h3 className="font-medium text-sm text-foreground">Özel Ses Klonlama</h3>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border rounded px-2 py-0.5">Beta</span>
        </div>
        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
            <Upload className="w-4 h-4 text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground">Ses örneği yükleyin</p>
          <p className="text-xs text-muted-foreground mt-1">15–30 saniye temiz ses kaydı · WAV veya MP3</p>
          <Button variant="outline" size="sm" className="mt-3">Dosya Seç</Button>
        </div>
      </div>

      {/* Behavior */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-5">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-primary" />
          <h3 className="font-medium text-sm text-foreground">Davranış Ayarları</h3>
        </div>
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-foreground">Konuşma Hızı</label>
              <span className="text-sm font-medium text-primary">{speed.toFixed(1)}x</span>
            </div>
            <input
              type="range" min={0.5} max={2.0} step={0.1} value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Yavaş</span><span>Normal</span><span>Hızlı</span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-foreground">Maks. Çağrı Süresi</label>
              <span className="text-sm font-medium text-primary">{maxDuration} dk</span>
            </div>
            <input
              type="range" min={2} max={30} step={1} value={maxDuration}
              onChange={(e) => setMaxDuration(parseInt(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <div className="flex items-center justify-between py-2 border-t border-border">
            <div>
              <p className="text-sm text-foreground">Dil Tercihi</p>
              <p className="text-xs text-muted-foreground mt-0.5">Asistan konuşma dili</p>
            </div>
            <select className="text-sm bg-muted border border-border rounded-lg px-2 py-1.5 text-foreground">
              <option value="tr">Türkçe (tr-TR)</option>
              <option value="en">English (en-US)</option>
              <option value="auto">Otomatik</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}