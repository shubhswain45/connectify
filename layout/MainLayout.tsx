import LeftSidebar from "@/components/LeftSidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import { useEffect, useState, ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode; // Allows you to pass child components
  className?: string;   // Optional additional CSS class for layout customization
}

const MainLayout = ({ children, className }: MainLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={`h-screen bg-black text-white flex flex-col ${className || ""}`}>
      <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
        {/* Left Sidebar */}
        <ResizablePanel defaultSize={isMobile ? 20 : 25} minSize={isMobile ? 0 : 10} maxSize={50}>
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* Main Content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 75}>
          {children}
        </ResizablePanel>

  
      </ResizablePanelGroup>

      {/* <PlaybackControls /> */}
    </div>
  );
};

export default MainLayout;
