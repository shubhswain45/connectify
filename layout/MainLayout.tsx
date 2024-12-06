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
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
          {/* <LeftSidebar /> */}
          left side
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* Main Content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          {children}
        </ResizablePanel>

        {!isMobile && (
          <>
            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

            {/* Right Sidebar */}
            <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
              {/* Placeholder for a right sidebar */}
              <div>Right Sidebar Content</div>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      {/* <PlaybackControls /> */}
    </div>
  );
};

export default MainLayout;
