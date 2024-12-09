import { ScrollArea } from "@/components/ui/scroll-area";
import Topbar from "@/components/Topbar";
import { Edit2 } from "lucide-react"; // Lucide React icon for edit
import FeaturedSection from "@/components/FeaturedSection";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies"; // Used for parsing cookies
import { createGraphqlClient } from "@/clients/api";
import { getUserProfileQuery, getUserTracksQuery } from "@/graphql/query/user";
import { GetUserProfileResponse, Track } from "@/gql/graphql";
import SectionGrid from "@/components/SectionGrid";


interface UserPageProps {
  user: GetUserProfileResponse | null
  userTracks: Track[] | null
}

const UserPage = ({ user, userTracks }: UserPageProps) => {
  if (!user) {
    return <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
      <h1 className="text-xl sm:text-2xl font-bold text-zinc-400">
        Soory, user does not exists 404 ☹️
      </h1>
    </div>
  }

  return (
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
                src={user?.profileImageURL || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="w-36 h-36 rounded-full mb-4 border-4 border-teal-500"
              />
              {/* Username */}
              <h2 className="text-3xl font-semibold">{user?.username}</h2>
              {/* Bio */}
              <p className="text-gray-400 mt-2">{user?.bio}</p>
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
          {
            !userTracks ? (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
                <h1 className="text-xl sm:text-2xl font-bold text-zinc-400">
                  No Tracks yet ☹️
                </h1>
              </div>
            ) : (
              <div className="space-y-8">
                <SectionGrid tracks={userTracks} />
              </div>
            )
          }
        </div>
      </ScrollArea>
    </main>
  );
};

// Server-side data fetching for SSR     
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { username } = context.params as { username: string };
  const cookies = parseCookies(context);  // Parse cookies from the context
  const token = cookies.__connectify_token_from_server;  // Get the token
  let user = null
  let userTracks = null

    const graphqlClient = createGraphqlClient(token);
    const { getUserProfile } = await graphqlClient.request(getUserProfileQuery, { username })
    if (getUserProfile) {
      const { getUserTracks } = await graphqlClient.request(getUserTracksQuery, { username })
      user = getUserProfile
      userTracks = getUserTracks
    }
  console.log("user", user);

  return {
    props: {
      user,
      userTracks
    },
  };
};

export default UserPage;
