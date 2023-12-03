import classNames from "classnames/bind";
import styles from './Pagination.module.scss'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";

const cx = classNames.bind(styles)

function PagiItem({children}) {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const localtion = useLocation()
    const handlePagination = () => {
        // let param = []
        // for(let i of params.entries()) param.push(i)
        // const queries = {}
        // for(let i of param) queries[i[0]] = i[1]
        const queries = Object.fromEntries([...params])
        if(Number(children)) queries.page = children
        navigate({
            pathname: localtion.pathname,
            search: createSearchParams(queries).toString()
        })
    }

    return ( 
        <button 
            onClick={handlePagination} 
            className={cx('pagiItem', !Number(children)  && 'no-hover' , +params.get('page') === +children && 'color-bg', !+params.get('page') && +children === 1 && 'color-bg'   )}
            type="button"
        >
            {children}
        </button>
     );
}

export default PagiItem;