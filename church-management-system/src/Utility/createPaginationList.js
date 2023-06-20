export const createPageList = (totalPages, currentPage, maxVisiblePages) => {
    const visiblePages = [1];
    const upperBound = Math.min(totalPages, currentPage + Math.floor(maxVisiblePages / 2));
    const lowerBound = Math.max(2, upperBound - maxVisiblePages + 2);

    for (let i = lowerBound; i <= upperBound; i++) {
        visiblePages.push(i);
    }

    if (totalPages > upperBound) {
        visiblePages.push(totalPages);
    }

    return visiblePages;
};
