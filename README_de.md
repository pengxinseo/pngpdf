# PNG zu PDF Online-Konverter

Ein einfaches, schnelles und kostenloses Online-Tool zur Konvertierung von PNG-Bildern in PDF-Dokumente.

## 📝 Projektvorstellung

PNG zu PDF ist eine mit Next.js entwickelte Web-Anwendung, die es Benutzern ermöglicht, PNG-Bilder schnell und bequem in PDF-Dokumente umzuwandeln. Es ist kein Software-Download erforderlich, und die Konvertierungen können direkt in Ihrem Browser durchgeführt werden.

### Hauptmerkmale

- 🚀 **Vollständig kostenlos**: Alle Funktionen sind kostenlos und ohne Einschränkungen nutzbar
- 🔒 **Sicher und zuverlässig**: Alle Konvertierungen erfolgen im Browser ohne Server-Upload, was Ihre Privatsphäre schützt
- 📱 **Plattformübergreifende Unterstützung**: Funktioniert auf Computern, Tablets und Mobiltelefonen
- 🌐 **Mehrsprachige Unterstützung**: Bietet Benutzeroberflächen in über 12 Sprachen, um globale Benutzeranforderungen zu erfüllen
- 🖼️ **Batch-Konvertierung**: Unterstützt die Kombination mehrerer PNG-Bilder zu einem einzelnen PDF-Dokument
- ⚙️ **Anpassungsoptionen**: Ermöglicht die Auswahl von Papiergröße und Seitenrändern

## ✨ Funktionen

- Konvertierung von PNG-Bildern in PDF-Dokumente
- Unterstützung für Batch-Konvertierung (bis zu 30 Bilder)
- Anpassbare Papiergrößen (A4, A1, A2 und viele andere Standardgrößen)
- Einstellbare Seitenränder
- Drag-and-Drop zum Neuordnen von Bildern
- Ein-Klick-Download der Konvertierungsergebnisse

## 🛠️ Technologie-Stack

- Next.js 14.2.3
- React 18
- TypeScript
- jsPDF (für PDF-Generierung)
- @dnd-kit (für Drag-and-Drop-Funktionalität)
- Tailwind CSS
- next-intl (für Internationalisierung)

## 🚀 Schnellstart

1. Repository klonen:
```bash
git clone https://github.com/yourusername/pngpdf.git
cd pngpdf
```

2. Abhängigkeiten installieren:
```bash
npm install
```

3. Entwicklungsserver starten:
```bash
npm run dev
```

4. [http://localhost:3000](http://localhost:3000) im Browser öffnen

## 📖 Benutzerhandbuch

1. Klicken Sie auf die Upload-Schaltfläche oder ziehen Sie PNG-Bilder per Drag-and-Drop in den dafür vorgesehenen Bereich
2. Wählen Sie Papiergröße und Randeinstellungen (optional)
3. Für einzelne Bilder: Klicken Sie auf die Download-Schaltfläche unter dem entsprechenden Bild
4. Für mehrere Bilder: Klicken Sie auf die Schaltfläche "Zusammenführen", um alle Bilder zu einer PDF-Datei zu kombinieren
5. Laden Sie die generierte PDF-Datei herunter

## 🌐 Internationalisierungsunterstützung

Dieses Projekt unterstützt mehrere Sprachen, um die Bedürfnisse globaler Benutzer zu erfüllen:

| Sprachcode | Sprachname | Region |
|------------|------------|--------|
| 🇨🇳 `zh` | Chinesisch | Festlandchina |
| 🇺🇸 `en` | Englisch | Weltweit |
| 🇯🇵 `ja` | Japanisch | Japan |
| 🇰🇷 `ko` | Koreanisch | Korea |
| 🇫🇷 `fr` | Französisch | Frankreich |
| 🇩🇪 `de` | Deutsch | Deutschland |
| 🇪🇸 `es` | Spanisch | Spanien |
| 🇷🇺 `ru` | Russisch | Russland |
| 🇵🇹 `pt` | Portugiesisch | Portugal |
| 🇹🇼 `tw` | Traditionelles Chinesisch | Taiwan-Region |
| 🇻🇳 `vi` | Vietnamesisch | Vietnam |
| 🇮🇩 `id` | Indonesisch | Indonesien |
| 🇮🇳 `hi` | Hindi | Indien |
| 🇵🇭 `fil` | Philippinisch | Philippinen |
| 🇹🇷 `tr` | Türkisch | Türkei |
| 🇲🇾 `ms` | Malaiisch | Malaysia |
| 🇸🇦 `ar` | Arabisch | Arabische Länder |

## 📂 Projektstruktur

```
pngpdf/
├── content/                  # Blog-Inhaltsverzeichnis, nach Sprache organisiert
│   ├── zh/                   # Chinesische Inhalte
│   ├── en/                   # Englische Inhalte
│   ├── ...                   # Andere Sprachinhalte
│   └── *.json                # Exportierte Inhalts-JSON-Dateien
├── messages/                 # Internationalisierungs-Übersetzungsdateien
│   ├── zh.json               # Chinesische Übersetzungen
│   ├── en.json               # Englische Übersetzungen
│   └── ...                   # Andere Sprachübersetzungen
├── public/                   # Statische Ressourcen
├── scripts/                  # Dienstprogramm-Skripte
│   ├── exportPosts.js        # Inhaltsexport-Skript
│   ├── watchContent.js       # Inhaltsüberwachungs-Skript
│   ├── createMdx.js          # MDX-Dateierstellungs-Skript
│   └── deleteMdx.js          # MDX-Dateilöschungs-Skript
├── src/                      # Quellcode-Verzeichnis
│   ├── app/                  # Next.js-Anwendungsverzeichnis
│   │   └── [locale]/         # Internationalisierte Routen
│   │       └── [slug]/       # Dynamische Routen (Blog-Beiträge)
│   ├── components/           # React-Komponenten
│   │   ├── PngToPdf.tsx      # Kern-PNG-zu-PDF-Konvertierungskomponente
│   │   ├── ui/               # UI-Komponenten
│   │   └── markdown/         # Markdown-Rendering-Komponenten
│   ├── configs/              # Konfigurationsdateien
│   ├── lib/                  # Dienstprogramm-Bibliotheken
│   └── i18n.ts               # Internationalisierungskonfiguration
├── .next/                    # Next.js-Build-Verzeichnis
├── node_modules/             # Abhängigkeiten
├── package.json              # Projektkonfiguration
└── README.md                 # Projektdokumentation
```

### Verzeichniserklärung

- **content/**: Nach Sprache gespeicherte Blog-Inhalte zusammen mit exportierten JSON-Dateien
- **messages/**: Übersetzungsdateien für verschiedene Sprachen, die für die UI-Internationalisierung verwendet werden
- **scripts/**: Skripte im Zusammenhang mit der Inhaltsverwaltung
- **src/app/**: Hauptstruktur der Next.js-Anwendung, die internationalisierte Routen unterstützt
- **src/components/**: Verschiedene React-Komponenten, einschließlich der Kern-PngToPdf-Konvertierungskomponente
- **public/**: Statische Assets wie Bilder und Icons

## 📜 Skript-Nutzungsanleitung

Das Projekt enthält mehrere Dienstprogramm-Skripte für die Inhaltsverwaltung und Internationalisierungsunterstützung. Diese Skripte befinden sich im Verzeichnis `scripts/`:

### exportPosts.js
Exportiert Inhaltsdateien für alle Sprachen im JSON-Format für die Website-Inhaltsanzeige.

```bash
npm run export-posts
```

### watchContent.js
Überwacht Änderungen an Inhaltsdateien und aktualisiert automatisch die entsprechenden JSON-Dateien, wenn Inhalte geändert werden.

```bash
npm run content
```

### createMdx.js
Erstellt neue mehrsprachige Inhaltsdateien. Nach dem Ausführen des Skripts geben Sie ein Schlüsselwort ein, um entsprechende MDX-Dateien in allen Sprachverzeichnissen zu erstellen.

```bash
npm run mdx
```

### deleteMdx.js
Löscht mehrsprachige Inhaltsdateien für ein angegebenes Schlüsselwort. Nach dem Ausführen des Skripts geben Sie ein Schlüsselwort ein, um entsprechende MDX-Dateien in allen Sprachverzeichnissen zu löschen.

```bash
npm run del
```

### Inhaltsverwaltungs-Workflow

1. Verwenden Sie `npm run mdx`, um neue Inhaltsdateien zu erstellen
2. Bearbeiten Sie die Dateien `content/[Sprache]/[Schlüsselwort].mdx`
3. Inhaltsänderungen werden automatisch über `watchContent.js` in JSON-Dateien aktualisiert
4. Verwenden Sie `npm run del`, wenn Sie Inhalte löschen müssen

## 🔜 Zukünftige Pläne

- Entwicklung einer Browser-Plugin-Version
- Hinzufügen weiterer Anpassungsoptionen (Hintergrund, Wasserzeichen usw.)
- Unterstützung weiterer Bildformate (JPEG, GIF usw.)
- Optimierung der mobilen Erfahrung

## 👨‍💻 Beiträge

Issues und PRs sind willkommen, um dieses Projekt zu verbessern!

## 📄 Lizenz

Dieses Projekt ist unter der [MIT-Lizenz](LICENSE) lizenziert.

## 📝 Urheberrecht und Quellenangabe

© 2023-2024 PngPDF.net

### Wie man dieses Projekt zitiert

Wenn Sie dieses Projekt in Ihrem eigenen Projekt oder Artikel verwenden oder darauf verweisen, zitieren Sie es bitte wie folgt:

```
PNG zu PDF Konverter - Entwickelt von PngPDF.net
Projekt-URL: https://github.com/yourusername/pngpdf
```

### Lizenzhinweis

Der Code dieses Projekts ist Open Source unter der [MIT-Lizenz](LICENSE). Sie können ihn frei verwenden, modifizieren und verteilen, müssen jedoch den ursprünglichen Urheberrechtsvermerk und die Lizenzinformationen beibehalten. Die vollständigen Bedingungen finden Sie in der [LICENSE](LICENSE)-Datei. 