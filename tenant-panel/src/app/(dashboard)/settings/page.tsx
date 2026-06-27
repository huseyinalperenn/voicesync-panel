"use client";

import { useState } from "react";
import { User, Bell, Key, Globe, Phone, Check, Eye, EyeOff, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profil", icon: User },
  { id: "notifications", label: "Bildirimler", icon: Bell },
  { id: "sip", label: "SIP Ayarları", icon: Phone },
  { id: "api", label: "API Erişimi", icon: Key },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "relative w-10 h-5.5 rounded-full transition-colors flex-shrink-0",
        checked ? "bg-primary" : "bg-muted-foreground/30"
      )}
    >
      <div className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform", checked ? "translate-x-5.5" : "translate-x-0.5")} />
    </button>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [showSipPass, setShowSipPass] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const [notifs, setNotifs] = useState({
    callEnd: true, dailyReport: true, lowBalance: true, weeklyReport: false, newUser: false,
  });

  const apiKey = "vs_live_sk_1234567890abcdef1234567890abcdef";

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Ayarlar</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Hesap ve entegrasyon ayarları</p>
      </div>

      <div className="flex gap-5">
        {/* Sidebar tabs */}
        <div className="w-44 flex-shrink-0 space-y-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                  tab === t.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 rounded-xl border border-border bg-card p-5 space-y-5">
          {tab === "profile" && (
            <>
              <h3 className="font-medium text-sm text-foreground border-b border-border pb-3">Profil Bilgileri</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Firma Adı</label>
                  <Input defaultValue="ACME Corp" className="text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Sektör</label>
                  <Input defaultValue="E-Ticaret" className="text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">İletişim Kişisi</label>
                  <Input defaultValue="Ahmet Yılmaz" className="text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">E-posta</label>
                  <Input defaultValue="tenant@acme.com" className="text-sm" />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <label className="text-xs font-medium text-foreground">Telefon</label>
                  <Input defaultValue="+90 212 555 0000" className="text-sm" />
                </div>
              </div>
              <div className="pt-3 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-3">Tercihler</h4>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm text-foreground">Dil</p>
                    <p className="text-xs text-muted-foreground">Panel arayüz dili</p>
                  </div>
                  <select className="text-sm bg-muted border border-border rounded-lg px-2 py-1.5 text-foreground">
                    <option>Türkçe</option>
                    <option>English</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm text-foreground">Tema</p>
                    <p className="text-xs text-muted-foreground">Görsel tema tercihi</p>
                  </div>
                  <select className="text-sm bg-muted border border-border rounded-lg px-2 py-1.5 text-foreground">
                    <option>Sistem</option>
                    <option>Açık</option>
                    <option>Koyu</option>
                  </select>
                </div>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90 gap-1.5" onClick={handleSave}>
                {saved ? <Check className="w-3.5 h-3.5" /> : null} {saved ? "Kaydedildi" : "Kaydet"}
              </Button>
            </>
          )}

          {tab === "notifications" && (
            <>
              <h3 className="font-medium text-sm text-foreground border-b border-border pb-3">Bildirim Tercihleri</h3>
              <div className="space-y-1">
                {[
                  { key: "callEnd", label: "Çağrı tamamlandı", desc: "Her çağrı sonunda bildirim" },
                  { key: "dailyReport", label: "Günlük rapor", desc: "Her gün saat 08:00'de özet" },
                  { key: "lowBalance", label: "Düşük bakiye", desc: "%20 kaldığında uyar" },
                  { key: "weeklyReport", label: "Haftalık rapor", desc: "Pazartesi sabahları özet" },
                  { key: "newUser", label: "Yeni kullanıcı", desc: "Ekip üyesi eklendiğinde" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <Toggle
                      checked={notifs[key as keyof typeof notifs]}
                      onChange={(v) => setNotifs(prev => ({ ...prev, [key]: v }))}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "sip" && (
            <>
              <h3 className="font-medium text-sm text-foreground border-b border-border pb-3">SIP / Telefon Ayarları</h3>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs text-emerald-700 font-medium">SIP bağlantısı aktif — +90 212 555 0099</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">SIP Host</label>
                  <Input defaultValue="sip.voicesync.com" className="text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Kullanıcı Adı</label>
                  <Input defaultValue="acme_tenant" className="text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Şifre</label>
                  <div className="relative">
                    <Input type={showSipPass ? "text" : "password"} defaultValue="s3cur3p@ss!" className="text-sm pr-10" />
                    <button onClick={() => setShowSipPass(!showSipPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showSipPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Yönlendirme Numarası</label>
                  <Input defaultValue="+90 212 555 0100" className="text-sm" placeholder="Cevapsız çağrılar için..." />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">Bağlantı Test Et</Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={handleSave}>
                  {saved ? "Kaydedildi" : "Kaydet"}
                </Button>
              </div>
            </>
          )}

          {tab === "api" && (
            <>
              <h3 className="font-medium text-sm text-foreground border-b border-border pb-3">API Erişimi</h3>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">REST API ile VoiceSync'i kendi sistemlerinize entegre edin.</p>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">API Anahtarı</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type={showApiKey ? "text" : "password"}
                        readOnly
                        value={apiKey}
                        className="text-sm font-mono pr-10 bg-muted/50"
                      />
                      <button onClick={() => setShowApiKey(!showApiKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={handleCopy}>
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Kopyalandı" : "Kopyala"}
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5">
                  <p className="text-xs text-amber-700">API anahtarınızı güvende tutun. Paylaşmayın ve kaynak koduna eklemeyin.</p>
                </div>
                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">Anahtarı Yenile</Button>
              </div>
              <div className="pt-4 border-t border-border space-y-2">
                <p className="text-xs font-medium text-foreground">Hızlı Başlangıç</p>
                <pre className="text-xs bg-muted/50 rounded-lg p-3 overflow-x-auto border border-border text-foreground">{`curl -X GET https://api.voicesync.com/v1/calls \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</pre>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}