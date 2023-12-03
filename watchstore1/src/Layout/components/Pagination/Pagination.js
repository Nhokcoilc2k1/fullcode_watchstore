import { usePagination } from "~/hooks";
import PagiItem from "./PagiItem";
import classNames from "classnames/bind";
import styles from './Pagination.module.scss'
import { useSearchParams } from "react-router-dom";

const cx = classNames.bind(styles)

function Pagination({totalCount}) {
    const [params] = useSearchParams();
    const pagination = usePagination(totalCount, params.get('page') || 1)

    const range = () => {
        const currentPage = +params.get('page');
        const pageSize = +process.env.REACT_APP_LIMIT || 10
        const start = Math.min(((currentPage - 1) * pageSize) + 1, totalCount)
        const end = Math.min(currentPage * pageSize, totalCount)
        return `${start} - ${end}`
    }

    return ( 
        <div className={cx('wrapper')}>
            {!+params.get('page') && <span>{`Hiển thị sản phẩm ${Math.min(totalCount, 1)} - ${Math.min(process.env.REACT_APP_LIMIT, totalCount)} trên ${totalCount}`}</span>}
            {+params.get('page') && <span>{`Hiển thị sản phẩm ${range()} trên ${totalCount}`}</span>}
            <div className={cx('box')}>
                {pagination?.map(el => (
                    <PagiItem key={el}>
                        {el}
                    </PagiItem>
                ))}
            </div>
        </div>
     );
}

export default Pagination;
