# Stream Overlay with OBS Browser Source Support

This stream overlay system is designed to work with OBS Browser Source and provides real-time data synchronization between the dashboard and overlay.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install server dependencies
cd server && npm install && cd ..

# Install React app dependencies
cd app && npm install && cd ..
```

### 2. Build and Start

```bash
# Build the React app
cd app && npm run build && cd ..

# Start the server
cd server && npm start
```

The server will run on `http://localhost:3001` with:

- 📊 Dashboard: `http://localhost:3001/dashboard`
- 🎬 Overlay: `http://localhost:3001/overlay`
- 📡 API: `http://localhost:3001/api/overlay-data`

## 🎬 OBS Browser Source Setup

### For the Overlay:

1. Add a **Browser Source** in OBS
2. Set URL to: `http://localhost:3001/overlay`
3. Set Width: `1920` Height: `1080` (or your resolution)
4. Check ✅ **Refresh browser when scene becomes active**
5. **Important**: The overlay will automatically poll for updates every 1 second

### For the Dashboard:

1. Open `http://localhost:3001/dashboard` in your regular browser
2. Make changes to colors, streamer info, or todos
3. Changes will appear in the OBS overlay within 1 second

## ✨ Features

### Real-time Synchronization

- ✅ **No localStorage dependency** - Works with OBS Browser Source
- ✅ **API-based data storage** - Data persists in `overlay-data.json`
- ✅ **Live polling** - Overlay updates every 1 second
- ✅ **Instant feedback** - Dashboard shows changes immediately

### Theme System

- 🎨 **13+ color properties** fully customizable
- 🌈 **Live preview** in dashboard
- 🎭 **CSS custom properties** for dynamic theming
- 📱 **Responsive design** for different screen sizes

### Content Management

- 👤 **Streamer information** (name, status, tagline, details)
- ✅ **Todo management** (add, edit, remove todos)
- 🔄 **Reset to defaults** functionality
- 💾 **Persistent storage** in JSON file

## 🔧 Development

### Development Mode

```bash
# Run server with auto-reload
cd server && npm run dev
```

### API Endpoints

| Method  | Endpoint                     | Description               |
| ------- | ---------------------------- | ------------------------- |
| `GET`   | `/api/overlay-data`          | Get all overlay data      |
| `POST`  | `/api/overlay-data`          | Update all overlay data   |
| `PATCH` | `/api/overlay-data/theme`    | Update theme only         |
| `PATCH` | `/api/overlay-data/streamer` | Update streamer info only |
| `PATCH` | `/api/overlay-data/todos`    | Update todos only         |
| `POST`  | `/api/overlay-data/reset`    | Reset to defaults         |

### Data Storage

- All data is stored in `server/overlay-data.json`
- The file is automatically created with default values on first run
- Changes persist between server restarts

## 🛠️ Production Deployment

### Option 1: Local Network

```bash
# Build and start on all network interfaces
npm run build
PORT=3001 npm start
```

Then use your computer's IP address in OBS: `http://192.168.1.xxx:3001/overlay`

### Option 2: Cloud Deployment

Deploy to services like:

- Heroku
- Vercel
- Digital Ocean
- AWS

## 🎯 OBS Browser Source Best Practices

1. **URL**: Always use the full URL with port: `http://localhost:3001/overlay`
2. **Dimensions**: Match your canvas resolution (usually 1920x1080)
3. **Refresh**: Enable "Refresh browser when scene becomes active"
4. **CSS**: The overlay is transparent by default for proper OBS integration
5. **Performance**: Polling is optimized to 1-second intervals for smooth updates

## 🐛 Troubleshooting

### Overlay not updating in OBS?

- Check that the server is running on port 3001
- Verify the URL in OBS Browser Source
- Enable "Refresh browser when scene becomes active"
- Check browser console for any errors

### Can't access from other devices?

- Make sure your firewall allows port 3001
- Use your computer's IP address instead of localhost
- Ensure all devices are on the same network

### Data not persisting?

- Check that `overlay-data.json` exists in the root directory
- Verify file permissions (server needs write access)
- Check server logs for any error messages

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
