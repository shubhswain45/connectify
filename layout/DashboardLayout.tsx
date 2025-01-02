import { useEffect } from "react";
import { useBackgroundStore } from "@/store/useBackgroundStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import Topbar from "@/components/_dashboard/Topbar";
import FeatureHeader from "@/components/_dashboard/FeatureHeader";
import { ReactNode } from "react";

interface DashboardLayoutProps {
    children: ReactNode;
    shouldShowFeatureHeader: boolean;
}

const DashboardLayout = ({ children, shouldShowFeatureHeader }: DashboardLayoutProps) => {
    const { bg, hydrateBg } = useBackgroundStore();

    useEffect(() => {
        // Hydrate background state from localStorage after hydration
        hydrateBg();
    }, [hydrateBg]);

    return (
        <main
            className="rounded-md overflow-hidden h-full"
            style={{
                backgroundImage: `linear-gradient(to bottom, ${bg}, #18181bcc, #121212)`,
            }}
        >
            <div className="relative">
                <Topbar />
            </div>
            <ScrollArea className="h-[calc(10vh-180px)] relative">
                {shouldShowFeatureHeader && <FeatureHeader />}
                {children}
            </ScrollArea>
        </main>
    );
};

export default DashboardLayout;
