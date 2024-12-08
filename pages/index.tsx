import { useEffect } from "react";
import { useRouter } from "next/router";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainLayout from "@/layout/MainLayout";
import Topbar from "@/components/Topbar";
import FeaturedSection from "@/components/FeaturedSection";
import SectionGrid from "@/components/SectionGrid";
import { useCurrentUser } from "@/hooks/auth";
import { Loader } from "lucide-react";

const HomePage = () => {
  return (
    <MainLayout>
      <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
        {/* Topbar */}
        <Topbar />

        {/* Scrollable Content */}
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-4 sm:p-6">
            {/* Greeting Section */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good afternoon</h1>

            {/* Featured Songs Section */}
            <FeaturedSection />

            {/* Additional Sections */}
            <div className="space-y-8">
              <SectionGrid />
              <SectionGrid />
            </div>
          </div>
        </ScrollArea>
      </main>
    </MainLayout>
  );
};

export default HomePage;
