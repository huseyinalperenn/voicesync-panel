"use client";

import { useState } from "react";
import { Shield, Bell, Globe, Key, Server, Check, Eye, EyeOff, Copy, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "general", label: "Genel", icon: Globe },
  { id: "security", label: "Güvenlik", icon: Shield },
  { id: "notifications", label: "Bildirimler", icon: Bell },
  { id: "api", label: "API & Entegrasyon", icon: Key },
  { id: "infrastructure", label: "Altyapı", icon: Server },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "relative w-10 h-5.5 rounded-full transition-colors flex-shrink-0",
        checked ? "bg-primary" : "bg-white/20"
      )}
    >
      <div className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform", checked ? "translate-x-5.5" : "translate-x-0.5")} />
    </button>
  );
}

export default function AdminSettingsPage() {
  const [tab, setTab] = useState("general");
  const [saved, setSaved] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const [notifications, setNotifications] = useState({
    newTenant: true, systemAlert: true, lowBalance: true, weeklyReport: true, securityAlert: true,
  });

  const [security, setSecurity] = useState({
    mfa: true, ipWhitelist: false, auditLog: true, sessionTimeout: true,
  });

  const apiKey = "vs_admin_sk_9876543210fedcba9876543210fedcba";

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
        <h2 className="text-xl font-semibold text-foreground">Platform Ayarları</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Admin panel ve platform yapılandırması</p>
      </div>

      <div className="flex gap-5">
        {/* Sidebar tabs */}
        <div className="w-48 flex-shrink-0 space-y-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                  tab === t.id
                    ? "bg-primary/15 text-primary border border-primary/20 font-medium"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 glass-card rounded-xl border border-white/10 p-5 space-y-5">
          {tab === "general" && (
            <>
              <h3 className="font-medium text-sm text-foreground border-b border-white/10 pb-3">Platform Genel Ayarlar</h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Platform Adı</label>
                  <Input defaultValue="VoiceSync" className="text-sm bg-white/5 border-white/10" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Destek E-posta</label>
                  <Input defaultValue="support@voicesync.com" type="email" className="text-sm bg-white/5 border-white/10" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Varsayılan Dil</label>
                  <select className="w-full text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground">
                    <option>Türkçe (tr-TR)</option>
                    <option>English (en-US)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Zaman Dilimi</label>
                  <select className="w-full text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground">
                    <option>Europe/Istanbul (UTC+3)</option>
                    <option>UTC</option>
                  </select>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground">Bakım Modu</p>
                    <p className="text-xs text-muted-foreground">Tüm tenant erişimini geçici olarak durdurur</p>
                  </div>
                  <Toggle checked={false} onChange={() => {}} />
                </div>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90 gap-1.5" onClick={handleSave}>
                {saved ? <Check className="w-3.5 h-3.5" /> : null}{saved ? "Kaydedildi" : "Kaydet"}
              </Button>
            </>
          )}

          {tab === "security" && (
            <>
              <h3 className="font-medium text-sm text-foreground border-b border-white/10 pb-3">Güvenlik Ayarları</h3>
              <div className="space-y-1">
                {[
                  { key: "mfa", label: "İki Faktörlü Doğrulama (2FA)", desc: "Admin girişlerinde zorunlu OTP" },
                  { key: "ipWhitelist", label: "IP Whitelist", desc: "Sadece tanımlı IP'lerden erişim" },
                  { key: "auditLog", label: "Denetim Günlüğü", desc: "Tüm admin aksiyonlarını kaydet" },
                  { key: "sessionTimeout", label: "Oturum Zaman Aşımı", desc: "30 dakika hareketsizlikte çıkış" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-white/8 last:border-0">
                    <div>
                      <p className="text-sm text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <Toggle
                      checked={security[key as keyof typeof security]}
                      onChange={(v) => setSecurity(prev => ({ ...prev, [key]: v }))}
                    />
                  </div>
                ))}
              </div>
              <div className="pt-2 space-y-1.5">
                <label className="text-xs font-medium text-foreground">IP Whitelist Listesi</label>
                <div className="space-y-2">
                  {["192.168.1.0/24", "10.0.0.1"].map((ip) => (
                    <div key={ip} className="flex items-center gap-2">
                      <Input readOnly value={ip} className="text-sm bg-white/5 border-white/10 font-mono" />
                      <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-red-500/10 hover:text-red-400 flex-shrink-0">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="border-white/10 gap-1.5 text-muted-foreground">
                    <Plus className="w-3.5 h-3.5" /> IP Ekle
                  </Button>
                </div>
              </div>
            </>
          )}

          {tab === "notifications" && (
            <>
              <h3 className="font-medium text-sm text-foreground border-b border-white/10 pb-3">Bildirim Tercihleri</h3>
              <div className="space-y-1">
                {[
                  { key: "newTenant", label: "Yeni Tenant Kaydı", desc: "Yeni tenant kayıt olduğunda bildir" },
                  { key: "systemAlert", label: "Sistem Uyarıları", desc: "CPU/RAM %90+ veya servis hatası" },
                  { key: "lowBalance", label: "Ödeme Uyarıları", desc: "Başarısız ödeme veya ödeme gecikmesi" },
                  { key: "weeklyReport", label: "Haftalık Özet", desc: "Pazartesi 09:00 platform raporu" },
                  { key: "securityAlert", label: "Güvenlik Olayları", desc: "Şüpheli giriş, brute-force vs." },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-white/8 last:border-0">
                    <div>
                      <p className="text-sm text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <Toggle
                      checked={notifications[key as keyof typeof notifications]}
                      onChange={(v) => setNotifications(prev => ({ ...prev, [key]: v }))}
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Bildirim E-postası</label>
                <Input defaultValue="admin@voicesync.com" type="email" className="text-sm bg-white/5 border-white/10" />
              </div>
            </>
          )}

          {tab === "api" && (
            <>
              <h3 className="font-medium text-sm text-foreground border-b border-white/10 pb-3">API & Entegrasyon</h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Admin API Anahtarı</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type={showApiKey ? "text" : "password"}
                        readOnly
                        value={apiKey}
                        className="text-sm font-mono pr-10 bg-white/5 border-white/10"
                      />
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5 border-white/10" onClick={handleCopy}>
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Kopyalandı" : "Kopyala"}
                    </Button>
                  </div>
                  <p className="text-xs text-amber-400/80">Bu anahtar tüm platform verilerine erişim sağlar. Güvende tutun.</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Webhook URL</label>
                  <Input defaultValue="https://hooks.voicesync.com/platform" className="text-sm bg-white/5 border-white/10" />
                  <p className="text-xs text-muted-foreground">Platform olayları bu adrese POST edilir</p>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-xs font-medium text-foreground mb-2">Örnek İstek</p>
                  <pre className="text-xs bg-black/30 rounded-lg p-3 overflow-x-auto border border-white/10 text-emerald-400/90">{`curl -X GET https://api.voicesync.com/v1/admin/tenants \\
  -H "X-Admin-Key: YOUR_ADMIN_KEY" \\
  -H "Content-Type: application/json"`}</pre>
                </div>
              </div>
            </>
          )}

          {tab === "infrastructure" && (
            <>
              <h3 className="font-medium text-sm text-foreground border-b border-white/10 pb-3">Altyapı Yapılandırması</h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">SIP Proxy Host</label>
                  <Input defaultValue="sip.voicesync.com:5060" className="text-sm bg-white/5 border-white/10 font-mono" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">RAG Servisi Endpoint</label>
                  <Input defaultValue="http://rag-service:8001" className="text-sm bg-white/5 border-white/10 font-mono" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Voice Engine URL</label>
                  <Input defaultValue="http://voice-engine:8002" className="text-sm bg-white/5 border-white/10 font-mono" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">LLM Modeli (Varsayılan)</label>
                  <select className="w-full text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground">
                    <option>GPT-4o (gpt-4o-2024-11-20)</option>
                    <option>GPT-4o Mini</option>
                    <option>Claude 3.5 Sonnet</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm text-foreground">Debug Modu</p>
                    <p className="text-xs text-muted-foreground">Ayrıntılı log çıktısı (performansı etkiler)</p>
                  </div>
                  <Toggle checked={false} onChange={() => {}} />
                </div>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90 gap-1.5" onClick={handleSave}>
                {saved ? <Check className="w-3.5 h-3.5" /> : null}{saved ? "Kaydedildi" : "Kaydet"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}