import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Pagination({ pagination, onPageChange }) {
    const { page, limit, counts } = pagination;

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(counts / +limit);

    const handlePageChange = (newPage) => {
        if (onPageChange) {
            onPageChange(newPage);
            setCurrentPage(newPage)
        }
    };
    return (
        <div className={cx('wrapper')}>
            <button className={cx('btn')} disabled={page <= 1} onClick={() => handlePageChange(page - 1)}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className={cx('pagenumber')}>{currentPage}</span>
            <button className={cx('btn')} disabled={page >= totalPages} onClick={() => handlePageChange(page + 1)}>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
}

export default Pagination;
