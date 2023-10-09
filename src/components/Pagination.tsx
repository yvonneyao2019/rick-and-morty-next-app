import { useRouter } from 'next/router'; 
import React, { FC } from "react";
import styles from '@/styles/Pagination.module.css';

type PaginationProps = {
    currentPage: number,
    setCurrentPage: (page: number) => void,
    totalPage: number
  };

const Pagination: FC<PaginationProps> = ({ currentPage, setCurrentPage, totalPage }) => {
    const router = useRouter(); 

    const changePage = (page: number) => {
        setCurrentPage(page);
        router.push(`/?page=${page}`);
    }

    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (totalPage <= 7) {
            for (let i = 1; i <= totalPage; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        onClick={() => changePage(i)}
                        disabled={i === currentPage}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            if (currentPage < 5) {
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(
                        <button
                            key={i}
                            onClick={() => changePage(i)}
                            disabled={i === currentPage}
                        >
                            {i}
                        </button>
                    );
                }
                pageNumbers.push(<span key="ellipsis-start">...</span>);
                pageNumbers.push(
                    <button
                        key={totalPage}
                        onClick={() => changePage(totalPage)}
                        disabled={totalPage === currentPage}
                    >
                        {totalPage}
                    </button>
                );
            } else if (currentPage <= totalPage - 4 && currentPage >= 5) {
                pageNumbers.push(
                    <button
                        key={1}
                        onClick={() => changePage(1)}
                        disabled={1 === currentPage}
                    >
                        1
                    </button>
                );
                pageNumbers.push(<span key="ellipsis-start">...</span>);
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(
                        <button
                            key={i}
                            onClick={() => changePage(i)}
                            disabled={i === currentPage}
                        >
                            {i}
                        </button>
                    );
                }
                pageNumbers.push(<span key="ellipsis-end">...</span>);
                pageNumbers.push(
                    <button
                        key={totalPage}
                        onClick={() => changePage(totalPage)}
                        disabled={totalPage === currentPage}
                    >
                        {totalPage}
                    </button>
                );
            } else {
                pageNumbers.push(
                    <button
                        key={1}
                        onClick={() => changePage(1)}
                        disabled={1 === currentPage}
                    >
                        1
                    </button>
                );
                pageNumbers.push(<span key="ellipsis-start">...</span>);
                for (let i = totalPage - 4; i <= totalPage; i++) {
                    pageNumbers.push(
                        <button
                            key={i}
                            onClick={() => changePage(i)}
                            disabled={i === currentPage}
                        >
                            {i}
                        </button>
                    );
                }
            }
        }

        return pageNumbers;
    };

    const handlePrev = () => {
        changePage(Math.max(currentPage - 1, 1));
    }

    const handleNext = () => {
        changePage(Math.min(currentPage + 1, totalPage));
    }

    return (
        <div className={styles.pagination}>
            <button onClick={handlePrev} disabled={currentPage === 1}>
                Prev
            </button>
            {renderPageNumbers()}
            <button onClick={handleNext} disabled={currentPage === totalPage}>
                Next
            </button>
        </div>
    );
}

export default Pagination;
