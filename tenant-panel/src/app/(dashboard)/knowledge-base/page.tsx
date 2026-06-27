"use client";

import { useState } from "react";
import { BookOpen, Upload, FileText, CheckCircle, Clock, Trash2, Eye, RefreshCw, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const docs = [
  { id: "1", name: "Ürün Kılavuzu v2.pdf", size: "2.4 MB", status: "processed", updated: "2 saat önce", chunks: 142 },
  { id: "2", name: "SSS - Sıkça Sorulan Sorular.docx", size: "890 KB", status: "processed", updated: "1 gün önce", chunks: 87 },
  { id: "3", name: "Fiyat Listesi Q2 2026.xlsx", size: "340 KB", status: "processing", updated: "Az önce", chunks: 0 },
  { id: "4", name: "İade ve Değişim Politikası.pdf", size: "156 KB", status: "processed", updated: "3 gün önce", chunks: 34 },
  { id: "5", name: "Teknik Destek Kılavuzu.pdf", size: "4.1 MB", status: "processed", updated: "1 hafta önce", chunks: 289 },
];

const statusConfig = {
  processed: { label: "İşlendi", icon: CheckCircle, className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  processing: { label: "İşleniyor", icon: Clock, className: "bg-amber-50 text-amber-700 border-amber-200" },
};

export default function KnowledgeBasePage() {
  const [query, setQuery] = useState("");
  const [queryResult, setQueryResult] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [newText, setNewText] = useState("");

  function handleQuery() {
    if (!query.trim()) return;
    setQueryResult(`Bu soruyla en alakalı 3 kaynak bulundu:\n\n1. "Ürün Kılavuzu v2.pdf" — Bölüm 4.2: Kurulum ve yapılandırma\n2. "Teknik Destek Kılavuzu.pdf" — Bölüm 8: Sorun giderme\n3. "SSS.docx" — Madde 23: Yazılım güncellemeleri`);
  }

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Bilgi Tabanı</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Asistanın başvurduğu kaynaklar</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setShowTextEditor(!showTextEditor)}>
            <Plus className="w-3.5 h-3.5" /> Metin Ekle
          </Button>
          <Button size="sm" className="gap-1.5 bg-primary hover:bg-primary/90">
            <Upload className="w-3.5 h-3.5" /> Yükle
          </Button>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); }}
        className={cn(
          "rounded-xl border-2 border-dashed p-8 text-center transition-all cursor-pointer",
          dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted/20"
        )}
      >
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <Upload className="w-5 h-5 text-primary" />
        </div>
        <p className="font-medium text-sm text-foreground">Dosyaları buraya sürükleyin</p>
        <p className="text-xs text-muted-foreground mt-1 mb-3">PDF, DOCX, TXT, XLSX desteklenir · Maks. 50 MB</p>
        <Button variant="outline" size="sm">Dosya Seç</Button>
      </div>

      {/* Inline text editor */}
      {showTextEditor && (
        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
          <p className="text-sm font-medium text-foreground">Metin Parçası Ekle</p>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            rows={4}
            placeholder="Asistanın bilmesini istediğiniz metni yazın..."
            className="w-full rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowTextEditor(false)}>İptal</Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">Kaydet</Button>
          </div>
        </div>
      )}

      {/* Document list */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Kaynaklar ({docs.length})</p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <BookOpen className="w-3 h-3" />
            {docs.reduce((a, d) => a + d.chunks, 0)} parça
          </div>
        </div>
        <div className="divide-y divide-border">
          {docs.map((doc) => {
            const cfg = statusConfig[doc.status as keyof typeof statusConfig];
            const Icon = cfg.icon;
            return (
              <div key={doc.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{doc.size}</span>
                    <span className="text-border text-xs">·</span>
                    <span className="text-xs text-muted-foreground">{doc.updated}</span>
                    {doc.chunks > 0 && (
                      <>
                        <span className="text-border text-xs">·</span>
                        <span className="text-xs text-muted-foreground">{doc.chunks} parça</span>
                      </>
                    )}
                  </div>
                </div>
                <Badge variant="outline" className={cn("text-xs gap-1 flex-shrink-0", cfg.className)}>
                  <Icon className="w-3 h-3" />
                  {cfg.label}
                </Badge>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="w-7 h-7"><Eye className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="w-7 h-7"><RefreshCw className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="w-7 h-7 text-red-500 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Test query */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          <h3 className="font-medium text-sm text-foreground">Test Sorgusu</h3>
          <span className="text-xs text-muted-foreground">— Asistanın ne getireceğini görün</span>
        </div>
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Örn: İade süresi kaç gün?"
            className="text-sm flex-1"
            onKeyDown={(e) => e.key === "Enter" && handleQuery()}
          />
          <Button size="sm" className="bg-primary hover:bg-primary/90 flex-shrink-0" onClick={handleQuery}>Sorgula</Button>
        </div>
        {queryResult && (
          <div className="rounded-lg bg-muted/50 border border-border px-4 py-3">
            <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Sonuç</p>
            <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">{queryResult}</pre>
          </div>
        )}
      </div>
    </div>
  );
}