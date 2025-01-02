import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { useGetCurrentTheme } from '@/hooks/theme';
import { toast } from 'sonner';

interface PaginationControllerProps {
    basePath: string;
    hasNextPage: boolean
}

const PaginationController: React.FC<PaginationControllerProps> = ({ basePath, hasNextPage }) => {
    const [theme] = useGetCurrentTheme();
    const router = useRouter();
    const currentPage = Number(router.query.page) || 1;

    // Calculate which page numbers to display
    const getVisiblePageNumbers = () => {
        if (currentPage === 1) {
            // If we're on page 1, show pages 1, 2, 3
            return [1, 2, 3];
        }

        // Otherwise show previous, current, and next page
        return [
            currentPage - 1,
            currentPage,
            currentPage + 1
        ];
    };

    // Handle page navigation
    const navigateToPage = (pageNum: number) => {
        if (pageNum === currentPage) return;
        if (pageNum > currentPage) {

            if (!hasNextPage) {
                toast.error("You have reached the last page of playlists.", {
                    position: "top-center"
                });
                return;
            }
        }
        router.push(`/${basePath}?page=${pageNum}`);
    };

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Page Button */}
                <PaginationItem>
                    <PaginationLink
                        aria-label="Previous Page"
                        className="hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                        onClick={() => navigateToPage(Math.max(1, currentPage - 1))}
                    >
                        <ChevronLeft />
                    </PaginationLink>
                </PaginationItem>

                {/* Page Numbers */}
                {getVisiblePageNumbers().map((pageNum) => (
                    <PaginationItem key={pageNum}>
                        <PaginationLink
                            onClick={() => navigateToPage(pageNum)}
                            className={pageNum === currentPage
                                ? "text-white hover:text-white"
                                : "hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                            }
                            style={pageNum === currentPage ? { backgroundColor: theme as string } : undefined}
                        >
                            {pageNum}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Ellipsis */}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>

                {/* Next Page Button */}
                <PaginationItem>
                    <PaginationLink
                        className="hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                        onClick={() => navigateToPage(currentPage + 1)}
                    >
                        <ChevronRight />
                    </PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationController;