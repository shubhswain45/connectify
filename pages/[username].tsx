import { ScrollArea } from "@/components/ui/scroll-area";
import MainLayout from "@/layout/MainLayout";
import Topbar from "@/components/Topbar";
import { Edit2 } from "lucide-react"; // Lucide React icon for edit
import PlayButton from "@/components/PlayButton"; // Assuming PlayButton is a custom component
import FeaturedSection from "@/components/FeaturedSection";
import SectionGrid from "@/components/SectionGrid";

const UserPage = () => {
  return (
    <MainLayout>
      <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
        {/* Topbar */}
        <Topbar />

        {/* Scrollable Content */}
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-4 sm:p-6">
            {/* Greeting Section */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">Welcome to your profile</h1>

            {/* Profile Section */}
            <div className="bg-zinc-800 rounded-xl shadow-lg p-8 mb-8">
              <div className="flex flex-col items-center">
                {/* Avatar */}
                <img
                  src="https://via.placeholder.com/150"
                  alt="User Avatar"
                  className="w-36 h-36 rounded-full mb-4 border-4 border-teal-500"
                />
                {/* Username */}
                <h2 className="text-3xl font-semibold">User Name</h2>
                {/* Bio */}
                <p className="text-gray-400 mt-2">This is your bio. Tell us something about yourself!</p>
              </div>

              {/* Edit Profile Button */}
              <div className="flex justify-center mt-6">
                <button className="px-6 py-2 text-lg font-semibold text-teal-500 border border-teal-500 rounded-full hover:bg-teal-600 hover:text-white flex items-center">
                  <Edit2 size={18} className="mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>

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

export default UserPage;
