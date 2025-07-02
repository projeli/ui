"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./button";
import { Card } from "./card";

interface PaginationProps {
    currentPage: number; // Current page number
    totalItems: number; // Total number of items
    pageSize: number; // Number of items per page
    totalPages: number; // Total number of pages
    showPageNumbers?: boolean; // Flag to toggle the display of page numbers (default is true)
    showPrevNext?: boolean; // Flag to toggle the display of Previous/Next buttons (default is true)
    showShowing?: boolean; // Flag to toggle the display of the "Showing x to y of z results" message (default is true)
}

const Pagination = ({
    currentPage,
    totalItems,
    pageSize,
    totalPages,
    showPageNumbers = true,
    showPrevNext = true,
    showShowing = true,
}: PaginationProps) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const onPageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        if (page) {
            params.set("page", page.toString());
        } else {
            params.delete("page");
        }
        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    // Handle page change
    const handlePageClick = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    // Handle next page click
    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(Math.min(totalPages, currentPage + 1));
        }
    };

    // Handle previous page click
    const handlePrevClick = () => {
        if (currentPage > 1) {
            onPageChange(Math.max(1, currentPage - 1));
        }
    };

    // Calculate page range to display (max 5 pages)
    const pageRange = () => {
        let start = Math.max(1, currentPage - 3); // Ensure a minimum of page 1
        const end = Math.min(totalPages, start + 6); // Ensure we don't exceed total pages

        // Adjust start if we're near the end to show 5 pages
        if (end === totalPages && totalPages > 7) {
            start = Math.max(1, totalPages - 6); // Show the last 5 pages if we're near the end
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <Card className="py-4 px-6 flex items-center gap-4 w-full">
            {showPrevNext && (
                <Button
                    onClick={handlePrevClick}
                    disabled={currentPage === 1}
                    variant="ghost"
                    className="md:block hidden"
                >
                    <span className="flex items-center gap-1">
                        <ChevronLeft />
                        Previous
                    </span>
                </Button>
            )}
            {showPageNumbers && (
                <div className="flex justify-center items-center sm:gap-1 grow">
                    <Button
                        onClick={() => handlePageClick(1)}
                        variant={currentPage === 1 ? "default" : "ghost"}
                        className="min-w-10"
                    >
                        1
                    </Button>
                    {totalPages > 7 && currentPage > 4 && (
                        <span className="text-lg">...</span>
                    )}
                    {totalPages > 2 && (
                        <Button
                            onClick={() =>
                                handlePageClick(
                                    totalPages > 7 && currentPage > 4
                                        ? currentPage < totalPages - 3
                                            ? currentPage - 2
                                            : totalPages - 5
                                        : 2
                                )
                            }
                            variant={
                                currentPage ===
                                (totalPages > 7 && currentPage > 4
                                    ? currentPage < totalPages - 3
                                        ? currentPage - 2
                                        : totalPages - 5
                                    : 2)
                                    ? "default"
                                    : "ghost"
                            }
                            className="min-w-10 sm:block hidden"
                        >
                            {totalPages > 7 && currentPage > 4
                                ? currentPage < totalPages - 3
                                    ? currentPage - 2
                                    : totalPages - 5
                                : 2}
                        </Button>
                    )}
                    {totalPages > 3 && (
                        <Button
                            onClick={() =>
                                handlePageClick(
                                    totalPages > 7 && currentPage > 4
                                        ? currentPage < totalPages - 3
                                            ? currentPage - 1
                                            : totalPages - 4
                                        : 3
                                )
                            }
                            variant={
                                currentPage ===
                                (totalPages > 7 && currentPage > 4
                                    ? currentPage < totalPages - 3
                                        ? currentPage - 1
                                        : totalPages - 4
                                    : 3)
                                    ? "default"
                                    : "ghost"
                            }
                            className="min-w-10"
                        >
                            {totalPages > 7 && currentPage > 4
                                ? currentPage < totalPages - 3
                                    ? currentPage - 1
                                    : totalPages - 4
                                : 3}
                        </Button>
                    )}
                    {totalPages > 4 && (
                        <Button
                            onClick={() =>
                                handlePageClick(
                                    totalPages > 7 && currentPage > 4
                                        ? currentPage < totalPages - 3
                                            ? currentPage
                                            : totalPages - 3
                                        : 4
                                )
                            }
                            variant={
                                currentPage ===
                                (totalPages > 7 && currentPage > 4
                                    ? currentPage < totalPages - 3
                                        ? currentPage
                                        : totalPages - 3
                                    : 4)
                                    ? "default"
                                    : "ghost"
                            }
                            className="min-w-10"
                        >
                            {totalPages > 7 && currentPage > 4
                                ? currentPage < totalPages - 3
                                    ? currentPage
                                    : totalPages - 3
                                : 4}
                        </Button>
                    )}
                    {totalPages > 5 && (
                        <Button
                            onClick={() =>
                                handlePageClick(
                                    totalPages > 7 && currentPage > 4
                                        ? currentPage < totalPages - 3
                                            ? currentPage + 1
                                            : totalPages - 2
                                        : 5
                                )
                            }
                            variant={
                                currentPage ===
                                (totalPages > 7 && currentPage > 4
                                    ? currentPage < totalPages - 3
                                        ? currentPage + 1
                                        : totalPages - 2
                                    : 5)
                                    ? "default"
                                    : "ghost"
                            }
                            className="min-w-10"
                        >
                            {totalPages > 7 && currentPage > 4
                                ? currentPage < totalPages - 3
                                    ? currentPage + 1
                                    : totalPages - 2
                                : 5}
                        </Button>
                    )}
                    {totalPages > 6 && (
                        <Button
                            onClick={() =>
                                handlePageClick(
                                    totalPages > 7 && currentPage > 4
                                        ? currentPage < totalPages - 3
                                            ? currentPage + 2
                                            : totalPages - 1
                                        : 6
                                )
                            }
                            variant={
                                currentPage ===
                                (totalPages > 7 && currentPage > 4
                                    ? currentPage < totalPages - 3
                                        ? currentPage + 2
                                        : totalPages - 1
                                    : 6)
                                    ? "default"
                                    : "ghost"
                            }
                            className="min-w-10 sm:block hidden"
                        >
                            {totalPages > 7 && currentPage > 4
                                ? currentPage < totalPages - 3
                                    ? currentPage + 2
                                    : totalPages - 1
                                : 6}
                        </Button>
                    )}
                    {totalPages > 7 && currentPage < totalPages - 3 && (
                        <span className="text-lg">...</span>
                    )}
                    {totalPages > 1 && (
                        <Button
                            onClick={() => handlePageClick(totalPages)}
                            variant={
                                currentPage === totalPages ? "default" : "ghost"
                            }
                            className="min-w-10"
                        >
                            {totalPages}
                        </Button>
                    )}
                </div>
            )}
            {showPrevNext && (
                <Button
                    onClick={handleNextClick}
                    disabled={currentPage === totalPages}
                    variant="ghost"
                    className="md:block hidden"
                >
                    <span className="flex items-center gap-1">
                        Next
                        <ChevronRight />
                    </span>
                </Button>
            )}
            {showShowing && (
                <span className="ml-4 hidden xl:block">
                    Showing {currentPage * pageSize - pageSize + 1}-
                    {Math.min(currentPage * pageSize, totalItems)} of{" "}
                    {totalItems} results
                </span>
            )}
        </Card>
    );
};

export default Pagination;
