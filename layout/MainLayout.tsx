import LeftSidebar from "@/components/LeftSidebar";
import { PlaybackControls } from "@/components/PlaybackControlrs";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/router"; // Import useRouter
import DummyControls from "@/components/DummyControls";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

const MainLayout = ({ children, className }: MainLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter(); // Get the current route

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check if the current route is `/show/[trackId]` or any path starting with `/show`
  const isShowPage = router.pathname.startsWith('/show');

  return (
    <div className={`h-screen bg-black text-white flex flex-col ${className || ""}`}>
      <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
        {/* Left Sidebar */}
        <ResizablePanel defaultSize={isMobile ? 20 : 25} minSize={isMobile ? 0 : 10} maxSize={50}>
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle className="w-1 bg-black rounded-lg transition-colors" />

        {/* Main Content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 75}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Conditionally render PlaybackControls based on the route */}
      {!isShowPage ? <PlaybackControls />: <DummyControls/>}
    </div>
  );
};

export default MainLayout;
