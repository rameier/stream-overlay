# Stream Overlay (1920×1080)

Ein auf 1920×1080 px festgelegtes Overlay für OBS-Browserquellen. Links bleiben 80 % der Fläche frei, sodass du dort deine IDE
oder Gameplay-Szene platzieren kannst. Rechts stapeln sich drei Fenster im Stil eines Desktop-Betriebssystems: Facecam, Streame
r-Infos und To-Dos.

## Dateien

- **`index.html`** – Markup mit Workspace-Spalte und drei Panels auf der rechten Seite.
- **`styles.css`** – Blau-graue UI im Fensterglas-Look, inklusive fester 1920×1080-Ausgabe.
- **`overlay.js`** – Minimaler Renderer für Streamer-Daten und To-Do-Liste, inklusive Live-Updates via `window.updateStreamOverla
y`.

## Layout im Überblick

- **Workspace (links, 80 %)**: Transparente Fläche für deine IDE oder Spielszenen. Ein dezenter Rahmen markiert die Kante.
- **Facecam (rechts oben)**: Fenster mit Fensterkontrollen und Rahmen, in das du in OBS deine Kamera-Quelle legen kannst.
- **Streamer Infos (rechts mitte)**: Zeigt Name, Status, Tagline und beliebige Faktenpaare (`label` + `value`).
- **To-Dos (rechts unten)**: Liste mit Aufgabenstatus, ideal für aktuelle Stream-Tasks.

## Lokal testen

```bash
python -m http.server 4000
```

Anschließend `http://localhost:4000/index.html` öffnen.

## In OBS verwenden

1. Neue Quelle vom Typ **Browser** anlegen.
2. URL auf die gehostete Datei oder den lokalen Server setzen.
3. **Breite 1920** und **Höhe 1080** eintragen, damit die Aufteilung exakt passt.
4. Eine separate Facecam-Quelle genau über das Panel „Facecam“ legen.

## Daten anpassen

Alle Inhalte kommen aus `defaultData` in `overlay.js`. Du kannst sie direkt anpassen oder zur Laufzeit mit Konfigurationsdaten ü
berschreiben:

```html
<script>
  window.streamOverlayConfig = {
    data: {
      streamer: {
        name: "Dein Name",
        status: "Live aus dem Makerspace",
        tagline: "Frontend & Chill",
        details: [
          { label: "Sprache", value: "Deutsch" },
          { label: "Projekt", value: "Twitch Bot" }
        ]
      },
      todos: [
        { title: "API Endpoint prüfen", status: "In Arbeit" },
        { title: "UI polishen", status: "Review", due: "Heute" }
      ]
    }
  };
</script>
<script src="overlay.js" defer></script>
```

Zur Laufzeit kannst du weitere Updates senden:

```js
window.updateStreamOverlay({ todos: [{ title: "Release vorbereiten", status: "Done" }] });
```

## Datenstruktur

- `streamer`
  - `name`, `status`, `tagline`
  - `details`: Array aus `{ label, value }`
- `todos`: Array aus `{ title, status?, assignee?, due? }`
- `theme`
  - `accentPrimary`, `accentSecondary` zur Anpassung der Akzentfarben

Nicht gesetzte Felder behalten ihren letzten Wert. Leere Arrays erhalten automatisch eine dezente Platzhaltermeldung.
