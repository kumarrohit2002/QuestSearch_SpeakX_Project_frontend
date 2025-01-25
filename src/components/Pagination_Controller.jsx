const Pagination_Controller = ({ handlePageChange, page, totalPages }) => {
  const maxVisiblePages = 10; // Max number of page buttons to show
  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return (
    <nav aria-label="Page navigation" className="flex justify-center mt-4">
      <ul className="flex items-center space-x-1 bg-white p-2 rounded-lg shadow-md">
        
        {/* First Page Button */}
        <li>
          <button 
            onClick={() => handlePageChange(1)} 
            disabled={page === 1} 
            className="px-3 py-2 border rounded-l-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            First
          </button>
        </li>

        {/* Previous Page Button */}
        <li>
          <button 
            onClick={() => handlePageChange(page - 1)} 
            disabled={page === 1} 
            className="px-3 py-2 border bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            &lt;
          </button>
        </li>

        {/* Dynamic Page Numbers */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <li key={startPage + index}>
            <button
              onClick={() => handlePageChange(startPage + index)}
              className={`px-3 py-2 border hover:bg-gray-300 ${
                page === startPage + index ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {startPage + index}
            </button>
          </li>
        ))}

        {/* Next Page Button */}
        <li>
          <button 
            onClick={() => handlePageChange(page + 1)} 
            disabled={page === totalPages} 
            className="px-3 py-2 border bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            &gt;
          </button>
        </li>

        {/* Last Page Button */}
        <li>
          <button 
            onClick={() => handlePageChange(totalPages)} 
            disabled={page === totalPages} 
            className="px-3 py-2 border rounded-r-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Last
          </button>
        </li>

      </ul>
    </nav>
  );
};

export default Pagination_Controller;
