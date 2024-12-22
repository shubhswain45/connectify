import Link from "next/link";
import { GetServerSideProps } from "next";
import { createGraphqlClient } from "@/clients/api";
import { getFeedTracksQuery } from "@/graphql/query/track";
import { Track } from "@/gql/graphql";
import { parseCookies } from "nookies";
import { ScrollArea } from "@/components/ui/scroll-area";
import Topbar from "@/components/Topbar";
import FeaturedSection from "@/components/FeaturedSection";
import SectionGrid from "@/components/SectionGrid";
import { useState } from "react";
import CreateTrackDialog from "@/components/CreateTrackDialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import FeatureHeader from "@/components/FeatureHeader";
import { useRouter } from "next/router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetCurrentTheme } from "@/hooks/theme";

interface HomePageProps {
  tracks: Track[] | null;
}

const HomePage = ({ tracks }: HomePageProps) => {
  const [theme] = useGetCurrentTheme()
  // const { data } = useCurrentUser();
  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const router = useRouter();
  const page = router.query.page ? parseInt(router.query.page as string, 10) : 1;

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <div className="relative">
        <Topbar />
      </div>

      <ScrollArea className="h-[calc(100vh-180px)] relative">
        <FeatureHeader />

        <div className="p-4 sm:p-6">
          {tracks === null ? (
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
          ) : tracks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
              <h1 className="text-lg sm:text-2xl font-bold text-zinc-400">
                Follow some users to see their Tracks
              </h1>
            </div>
          ) : (
            <>
              <FeaturedSection />
              <div className="space-y-8">
                <SectionGrid tracks={tracks} />
              </div>
            </>
          )}

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  aria-label="Previous Page"
                  className="hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                  onClick={() => router.push(`/dashboard?page=${Math.max(1, page - 1)}`)}
                >
                  <ChevronLeft />
                </PaginationLink>
              </PaginationItem>
              {[page, page + 1, page + 2].map((p, index) => (
                p > 0 && (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => {
                        if (p === page) {
                          return;
                        }
                        router.push(`/dashboard?page=${p}`);
                      }}
                      className={p === page ? "text-white hover:text-white" : "hover:bg-zinc-700 text-zinc-300 cursor-pointer"}
                      style={p === page ? { backgroundColor: theme as string } : {}}
                    >

                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() => router.push(`/dashboard?page=${page + 1}`)}
                  className="hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                >
                  <ChevronRight />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          
        </div>
      </ScrollArea>

      {songDialogOpen && (
        <CreateTrackDialog
          songDialogOpen={songDialogOpen}
          setSongDialogOpen={setSongDialogOpen}
        />
      )}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies.__connectify_token_from_server;
  const page = context.query.page ? parseInt(context.query.page as string, 10) : 1;

  let tracks = null;

  if (token) {
    const graphqlClient = createGraphqlClient(token);
    const { getFeedTracks } = await graphqlClient.request(getFeedTracksQuery, {
      page,
    });
    tracks = getFeedTracks;
  }

  return {
    props: {
      tracks,
    },
  };
};

export default HomePage;
