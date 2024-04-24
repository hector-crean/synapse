import {
  useErrorListener,
  useLostConnectionListener,
} from "@/liveblocks-configs/audio-room.config";
import { useToast } from "../ui/use-toast";

export default function RoomErrors() {

  const { toast } = useToast()
  useErrorListener((error) => {
    console.log(error);
    switch (error.cause) {
      case -1:
        // Authentication error
        toast({ title: "You don't have access to this room" });
        break;

      case 4001:
        // Could not connect because you don't have access to this room
        toast({ title: "You don't have access to this room" });
        break;

      case 4005:
        // Could not connect because room was full
        toast({ title: "Could not connect because the room is full" });
        break;

      default:
        // Unexpected error
        toast({ title: "An unexpected error happenned" });
        break;
    }
  });

  useLostConnectionListener((event) => {
    switch (event) {
      case "lost":
        toast({ title: "Still trying to reconnect…" });
        break;

      case "restored":
        toast({ title: "Successfully reconnected again!" });
        break;

      case "failed":
        toast({ title: "Could not restore the connection" });
        break;
    }
  });

  return null;
}
