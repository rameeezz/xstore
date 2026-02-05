import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/PaginationUiCss.css";

function Pagination({ items = [], itemsPerPage, renderItem }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Ensure items is an array
  const safeItems = Array.isArray(items) ? items : [];

  // Calculate pagination
  const totalPages = Math.ceil(safeItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = safeItems.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate which page numbers to show (max 3 at a time)
  const maxPagesToShow = 3;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const paginate = useCallback(
    (pageNumber) => {
      const pageNum = Math.max(1, Math.min(pageNumber, totalPages));
      setCurrentPage(pageNum);
    },
    [totalPages]
  );

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  // No items to show
  if (safeItems.length === 0) return null;

  return (
    <>
      {/* Items Grid */}
      {renderItem && currentItems.length > 0 && (
        <div className="row g-4 mt-3">
          {currentItems.map((item, index) => (
            <React.Fragment key={item?.id || `item-${index}`}>
              {renderItem(item)}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <>
          <nav className="mt-5" aria-label="Page navigation">
            <ul className="pagination justify-content-center gap-2 flex-wrap">
              {/* Previous Button */}
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link pagination-btn"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  ← Previous
                </button>
              </li>

              {/* First Page Button (if not visible) */}
              {startPage > 1 && (
                <>
                  <li className="page-item">
                    <button
                      className="page-link pagination-btn"
                      onClick={() => paginate(1)}
                      aria-label="Go to page 1"
                    >
                      1
                    </button>
                  </li>
                  {startPage > 2 && (
                    <li className="page-item disabled">
                      <span className="page-link pagination-btn">...</span>
                    </li>
                  )}
                </>
              )}

              {/* Page Numbers */}
              {pageNumbers.map((pageNum) => (
                <li
                  key={pageNum}
                  className={`page-item ${
                    currentPage === pageNum ? "active" : ""
                  }`}
                >
                  <button
                    className={`page-link pagination-btn ${
                      currentPage === pageNum ? "active-page" : ""
                    }`}
                    onClick={() => paginate(pageNum)}
                    aria-label={`Go to page ${pageNum}`}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                  >
                    {pageNum}
                  </button>
                </li>
              ))}

              {/* Last Page Button (if not visible) */}
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && (
                    <li className="page-item disabled">
                      <span className="page-link pagination-btn">...</span>
                    </li>
                  )}
                  <li className="page-item">
                    <button
                      className="page-link pagination-btn"
                      onClick={() => paginate(totalPages)}
                      aria-label={`Go to page ${totalPages}`}
                    >
                      {totalPages}
                    </button>
                  </li>
                </>
              )}

              {/* Next Button */}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link pagination-btn"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next →
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
}

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
};

export default Pagination;
