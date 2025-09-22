# Stream Overlay

Ein dunkles Streaming-Overlay im Look moderner Betriebssystem-Fenster. Es eignet sich als Browser-Quelle in OBS und legt den Fokus auf eine Facecam oben links, detaillierte Streamer-Infos darunter und eine Aufgabenliste unten rechts.

## Projektstruktur

- **`index.html`** – Markup des Overlays mit allen Fenster-Panels.
- **`styles.css`** – Styles für das Fenster-Layout in Blau/Grau, inklusive Responsive-Breakpoints.
- **`overlay.js`** – Rendert die Daten, erlaubt Live-Updates und optionales Dashboard-Polling.

## Vorschau lokal testen

1. Repository klonen oder herunterladen.
2. Innerhalb des Projektordners einen kleinen Webserver starten, z. B. mit Python:

   ```bash
   python -m http.server 4000
   ```

3. `http://localhost:4000/index.html` im Browser öffnen. Dort siehst du exakt dasselbe Overlay, das später in OBS eingebunden wird.

## Overlay in OBS verwenden

1. In OBS eine Quelle vom Typ **Browser** hinzufügen.
2. Als URL entweder den lokalen Webserver (`http://localhost:4000/index.html`) oder den absoluten Dateipfad (`file:///…/index.html`) wählen.
3. Die Größe auf deine Zielauflösung einstellen – empfohlen sind 1920×1080.
4. Die Facecam platzierst du in OBS über eine separate Quelle exakt über das Fenster „Facecam“.

## Layout-Highlights

- **Facecam-Fenster**: Oben links, ungefähr ein Fünftel der Gesamtbreite, mit 16:9-Rahmen.
- **Streamer-Infofenster**: Darunter mit Avatar, Status, frei konfigurierbaren Fakten und Link-Badges.
- **Stream-Übersicht**: Zeigt Titel, Kategorie und Laufzeit deines aktuellen Programms.
- **Aktivitätenfenster**: Kombiniert Abos und Unterstützungen in einem Dashboard.
- **Ziele & Nächster Stream**: Eigene Fenster mit Fortschrittsbalken und Social-Links.
- **Aufgabenboard**: Unten rechts für aktuelle Todos aus deinem Dashboard.

## Daten pflegen

Alle Inhalte stammen aus dem Objekt `defaultData` in `overlay.js`. Du kannst sie auf drei Arten anpassen:

### 1. Direkt im Code ändern

Passe `defaultData` an und lade das Overlay in OBS neu. Ideal für feste Overlays ohne externe Steuerung.

### 2. Daten vor dem Skript injizieren

Lege eine Datei `config.js` an und binde sie **vor** `overlay.js` ein. Dort kannst du `window.streamOverlayConfig` oder `window.streamOverlayData` setzen.

```html
<script>
  window.streamOverlayConfig = {
    data: {
      streamer: {
        name: "DeinName",
        status: "live aus dem Makerspace",
        tagline: "Build & Chill",
        info: [
          { label: "Sprache", value: "Deutsch" },
          { label: "Zeitplan", value: "Di & Do • 20:00" }
        ]
      },
      nowPlaying: {
        title: "Chatbot für Twitch",
        category: "Software & Technik",
        startedAt: "Seit 25 Min live"
      },
      tasks: [
        { title: "Dashboard deployen", status: "In Arbeit", due: "Heute" }
      ]
    }
  };
</script>
<script type="module" src="overlay.js"></script>
```

`window.streamOverlayData` funktioniert weiterhin – `streamOverlayConfig.data` ist jedoch die bevorzugte Variante, weil dort auch das Dashboard-Polling konfiguriert wird.

### 3. Automatisch über ein Dashboard aktualisieren

Hinterlege eine URL, die JSON liefert. Das Skript pollt sie in einem Intervall und merged die Daten live.

```html
<script>
  window.streamOverlayConfig = {
    dashboardUrl: "https://example.com/overlay.json",
    pollIntervalMs: 7000,
    data: {
      streamer: { name: "DeinName" }
    }
  };
</script>
<script type="module" src="overlay.js"></script>
```

Das erwartete JSON kann dieselbe Struktur wie `defaultData` nutzen. Nicht gesetzte Felder behalten ihre vorherigen Werte. Über `window.updateStreamOverlay(patch)` kannst du außerdem manuell Patches senden (z. B. via WebSocket oder OBS-Browser-Scripting).

## Datenstruktur im Überblick

- `streamer`
  - `name`, `status`, `tagline`, `tag`, `avatarUrl`
  - `info`: Array aus `{ label, value }`
  - `links`: Array aus `{ label, url }`
- `nowPlaying`
  - `label`, `title`, `category`, `startedAt`
- `latestSubscriptions`: Array aus `{ name, time }`
- `supporters`: Array aus `{ name, message, time }`
- `goals`: Array aus `{ label, current, target }`
- `callout`
  - `title`, `subtitle`, `socials` (`{ label, url }`)
- `tasks`: Array aus `{ title, status?, assignee?, due? }`
- `theme`
  - `accentOne`, `accentTwo` (steuern Verläufe und Akzentfarben)

Leere Arrays werden automatisch mit einem Hinweis versehen, sodass deine Panels nie komplett leer wirken.

Viel Spaß beim Streamen! 🎬
