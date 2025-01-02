import { ScrollArea } from "@/components/ui/scroll-area";
import { Play } from "lucide-react"; // Lucide React icon for edit
import Topbar from "../../../components/_dashboard/Topbar";
import PlaylistSongs from "@/components/_dashboard/_playlist/PlaylistSongs";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { createGraphqlClient } from "@/clients/api";
import { getUserLikedSongsQuery } from "@/graphql/query/user";
import { Track } from "@/gql/graphql";
import DashboardLayout from "@/layout/DashboardLayout";

function truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

const LikePage = ({likedTracks}: {likedTracks: Track[] | null}) => {
    
    if(!likedTracks){
        return <h1>no tracks to show</h1>
    }

    return (
        <DashboardLayout shouldShowFeatureHeader={false}>
                <div className="p-4 sm:p-6">
                    {/* Liked Songs Section */}
                    <div className="mb-8">
                        {/* Replace Avatar and Title Section with "Liked Songs" */}
                        <h2 className="text-4xl font-bold text-white mb-4">Liked Songs</h2>

                        {/* Play Button */}
                        {/* <PlayButton /> */}
                    </div>

                    {/* Song List Section */}
                    <PlaylistSongs id="" createdBy="shubh" tracks={likedTracks} />
                </div>
        </DashboardLayout>
           
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = parseCookies(context);  // Parse cookies from the context
    const token = cookies.__connectify_token_from_server;  // Get the token

    let likedTracks = null

    if (token) {
        // If the token exists, consider the user as logged in
        const graphqlClient = createGraphqlClient(token);
        const {  getUserLikedSongs} = await graphqlClient.request(getUserLikedSongsQuery);
        likedTracks = getUserLikedSongs
    }

    return {
        props: {
           likedTracks
        },
    };
};

export default LikePage;