import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
} from "@/shared/components/pagination";

interface PaginationWidgetProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export const PaginationWidget: React.FC<PaginationWidgetProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    className = "mt-6",
}) => {
    if (totalPages <= 1) return null;

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const shouldShowPage = (pageNum: number): boolean => {
        return (
            pageNum === 1 ||
            pageNum === totalPages ||
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
        );
    };

    const shouldShowEllipsis = (pageNum: number): boolean => {
        return pageNum === currentPage - 2 || pageNum === currentPage + 2;
    };

    return (
        <Pagination className={className}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={handlePrevious}
                        className={
                            currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                        }
                    />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => {
                        if (shouldShowPage(pageNum)) {
                            return (
                                <PaginationItem key={pageNum}>
                                    <PaginationLink
                                        onClick={() => onPageChange(pageNum)}
                                        isActive={currentPage === pageNum}
                                        className="cursor-pointer"
                                    >
                                        {pageNum}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        } else if (shouldShowEllipsis(pageNum)) {
                            return (
                                <PaginationItem key={pageNum}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }
                        return null;
                    },
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={handleNext}
                        className={
                            currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
