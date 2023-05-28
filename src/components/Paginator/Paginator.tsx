import { memo, useEffect, useState } from 'react';

interface PaginatorProps {
  pages: number[];
  currentPage: number;
  handleChangePage: (p: number) => void;
}

const Paginator: React.FC<PaginatorProps> = memo(
  ({ pages, currentPage, handleChangePage }) => {
    const [visiblePage, setVisiblePages] = useState<number[]>([]);

    const onPageClick = (p: number) => {
      if (p !== currentPage) {
        handleChangePage(p);
      }
    };

    useEffect(() => {
      if (pages.length > 10) {
        const startInd =
          pages.indexOf(currentPage - 5) > -1 ? currentPage - 5 : 0;
        setVisiblePages(
          pages.slice(
            startInd,
            startInd === 0
              ? 10
              : pages.indexOf(currentPage + 5) > -1
              ? currentPage + 5
              : pages.length,
          ),
        );
      } else {
        setVisiblePages(pages);
      }
    }, [currentPage, pages]);

    return (
      <div className='paginator'>
        {visiblePage.length > 0 && visiblePage[0] !== 1 && (
          <span className='paginator__span'>...</span>
        )}
        {visiblePage.map((i, id) => (
          <button
            key={id}
            className={`paginator__button${
              i === currentPage ? ' paginator__button_active' : ''
            }`}
            onClick={onPageClick.bind(null, i)}>
            {i}
          </button>
        ))}
        {visiblePage.length > 0 &&
          visiblePage[visiblePage.length - 1] !== pages[pages.length - 1] && (
            <span className='paginator__span'>...</span>
          )}
      </div>
    );
  },
);

export default Paginator;
