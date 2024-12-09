import Link from "next/link";
import { GetServerSideProps } from "next";
import { createGraphqlClient } from "@/clients/api";
import { getFeedTracksQuery } from "@/graphql/query/track";
import { Track } from "@/gql/graphql";
import { parseCookies } from "nookies";  // Import nookies to parse cookies

import { ScrollArea } from "@/components/ui/scroll-area";
import MainLayout from "@/layout/MainLayout";
import Topbar from "@/components/Topbar";
import FeaturedSection from "@/components/FeaturedSection";
import SectionGrid from "@/components/SectionGrid";

interface HomePageProps {
  tracks: Track[] | null;
}

const HomePage = ({ tracks }: HomePageProps) => {
  return (
      <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-4 sm:p-6">
            {/* Greeting Section */}
            {tracks == null ? (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
                <h1 className="text-xl sm:text-2xl font-bold text-zinc-400">
                  Please login/signup
                </h1>
                <Link href="/login">
                  <div className="text-blue-500 hover:underline text-lg">
                    Go to Login
                  </div>
                </Link>
              </div>
            ) : (
              <>
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                  Good afternoon
                </h1>

                {/* Featured Songs Section */}
                <FeaturedSection />

                {/* Additional Sections */}
                <div className="space-y-8">
                  <SectionGrid tracks={tracks} />
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </main>
  );
};

// Server-side data fetching
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);  // Parse cookies from the context
  const token = cookies.__connectify_token_from_server;  // Get the token

  console.log("token", token);
  
  let tracks = null;

  if (token) {
    // If the token exists, consider the user as logged in
    const graphqlClient = createGraphqlClient(token);
    const { getFeedTracks } = await graphqlClient.request(getFeedTracksQuery);
    tracks = getFeedTracks;
  }

  return {
    props: {
      tracks,
    },
  };
};

export default HomePage;
