import { X, Phone } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useCallStore } from "../store/useCallStore";
import { useEffect } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const { callUser } = useCallStore();

  const { listenIncomingCall } = useCallStore();

  useEffect(() => {
    listenIncomingCall();
  }, []);

  const handleCall = () => {
    if (!selectedUser?._id) return;
    callUser(selectedUser._id);
  };

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">

        {/* Left side */}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.jpg"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-7">
          {/* 📞 Voice call */}
          <button onClick={handleCall} className="btn btn-sm">
            <Phone className="w-4 h-4" />
          </button>

          {/* ❌ Close */}
          <button onClick={() => setSelectedUser(null)}>
            <X />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChatHeader;