import Link from "next/link";
import { GetServerSideProps } from "next";
import { createGraphqlClient } from "@/clients/api";
import { UserPlaylistsResponse } from "@/gql/graphql";
import { parseCookies } from "nookies"; // Import nookies to parse cookies

import { ScrollArea } from "@/components/ui/scroll-area";
import Topbar from "@/components/Topbar";
import FeaturedSection from "@/components/FeaturedSection";
import SectionGrid from "@/components/SectionGrid";
import { useCurrentUser } from "@/hooks/auth";
import { useState } from "react";
import CreateTrackDialog from "@/components/CreateTrackDialog";
import FeatureHeader from "@/components/FeatureHeader";
import { getFeedPlaylistsQuery } from "@/graphql/query/playlist";

interface HomePageProps {
  res: UserPlaylistsResponse | null;
}

const HomePage = ({ res }: HomePageProps) => {
  const { data } = useCurrentUser()
  console.log(data, "user");

  console.log(res, "res");
  
  const [songDialogOpen, setSongDialogOpen] = useState(false)

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      {/* Topbar with icons at the bottom */}
      <div className="relative">
        <Topbar />
      </div>

      {/* Content */}
      <ScrollArea className="h-[calc(100vh-180px)] relative">
        {/* Add search and create icons at the top left */}
       <FeatureHeader/>


        <div className="p-4 sm:p-6">
          {/* Greeting Section */}
          {res == null ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
              <h1 className="text-lg sm:text-2xl font-bold text-zinc-400">
                Please login/signup
              </h1>
              <Link href="/login">
                <div className="text-blue-500 hover:underline text-lg">
                  Go to Login
                </div>
              </Link>
            </div>
          ) : (
            res?.playlists?.length == 0 ? (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
                <h1 className="text-lg sm:text-2xl font-bold text-zinc-400">
                  Follow some users to see their Tracks
                </h1>
              </div>
            ) : (
              <>
                {/* Featured Songs Section */}
                <FeaturedSection />

                {/* Additional Sections */}
                <div className="space-y-8">
                  <SectionGrid playlists={res.playlists} />
                </div>
              </>
            )

          )}
        </div>
      </ScrollArea>
      {
        songDialogOpen && <CreateTrackDialog songDialogOpen={songDialogOpen} setSongDialogOpen={setSongDialogOpen} />
      }
    </main>
  );
};

// Server-side data fetching
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context); // Parse cookies from the context
  const token = cookies.__connectify_token_from_server; // Get the token

  console.log("token", token);

  let res = null;

  if (token) {
    // If the token exists, consider the user as logged in
    const graphqlClient = createGraphqlClient(token);
    const { getFeedPlaylists } = await graphqlClient.request(getFeedPlaylistsQuery);
    res = getFeedPlaylists;
  }

  return {
    props: {
      res,
    },
  };
};

export default HomePage;
