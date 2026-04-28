// store/useCallStore.js

import { create } from "zustand";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  query: { userId: JSON.parse(localStorage.getItem("authUser"))?._id },
});

export const useCallStore = create((set, get) => ({
  incomingCall: null,
  callAccepted: false,
  callEnded: false,

  peer: null,
  stream: null,

  // 🎧 Start audio stream
  startStream: async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    set({ stream });
    return stream;
  },

  // 📞 Call user
  callUser: async (userId) => {
    const stream = await get().startStream();

    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    socket.emit("call-user", {
      to: userId,
      offer,
    });

    // receive answer
    socket.on("call-accepted", async ({ answer }) => {
      await peer.setRemoteDescription(answer);
      set({ callAccepted: true });
    });

    // receive audio
    peer.ontrack = (event) => {
      const audio = new Audio();
      audio.srcObject = event.streams[0];
      audio.play();
    };

    // ICE
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          to: userId,
          candidate: event.candidate,
        });
      }
    };

    socket.on("ice-candidate", async ({ candidate }) => {
      await peer.addIceCandidate(candidate);
    });

    set({ peer });
  },

  // 📲 Listen incoming call
  listenIncomingCall: () => {
    socket.on("incoming-call", ({ from, offer }) => {
      set({ incomingCall: { from, offer } });
    });
  },

  // ✅ Accept call
  acceptCall: async () => {
    const { incomingCall } = get();
    const stream = await get().startStream();

    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });

    await peer.setRemoteDescription(incomingCall.offer);

    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    socket.emit("accept-call", {
      to: incomingCall.from,
      answer,
    });

    peer.ontrack = (event) => {
      const audio = new Audio();
      audio.srcObject = event.streams[0];
      audio.play();
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          to: incomingCall.from,
          candidate: event.candidate,
        });
      }
    };

    socket.on("ice-candidate", async ({ candidate }) => {
      await peer.addIceCandidate(candidate);
    });

    set({ callAccepted: true, peer });
  },

  // ❌ End call
  endCall: (userId) => {
    const { peer } = get();

    if (peer) peer.close();

    socket.emit("end-call", { to: userId });

    set({
      callEnded: true,
      incomingCall: null,
      callAccepted: false,
      peer: null,
    });
  },
}));