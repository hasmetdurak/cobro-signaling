# CoBro Signaling Server

This is a simple `socket.io` based WebRTC signaling server for CoBro Broadcasting.

## 🌐 How to Deploy on Render

1. Go to https://render.com
2. Create a new Web Service
3. Connect your GitHub repo or upload this zip as a repo
4. Set:
   - Environment: Node
   - Start Command: `node server.js`
   - Port: 3000 (Render auto detects)
5. Wait for deployment. You’ll get a URL like:
   `https://cobro-signaling.onrender.com`

## ✅ STUN/TURN Configuration (for clients)

Use in your broadcaster/player clients:

```js
const pc = new RTCPeerConnection({
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelay123"
    }
  ]
});
```

## 🔐 CORS is enabled for all domains (demo).