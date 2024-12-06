import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const PlayButton = () => {
  return (
    <Button
      size={"icon"}
      className="absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all opacity-100"
    >
      <Play className="size-5 text-black" />
    </Button>
  );
};

export default PlayButton;
