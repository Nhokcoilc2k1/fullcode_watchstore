import classNames from "classnames/bind";
import styles from './SearchItem.module.scss';
import { memo, useEffect, useState } from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";

const cx = classNames.bind(styles);

function SearchItem({dataBrand, dataCategory}) {
    const [checked, setChecked] = useState([]);
    const [selected, setSelected ] = useState([]);

    const [params] = useSearchParams();
    const navigate = useNavigate();
    const {category} = useParams();

    const handleCheck = (name) => {
        setChecked((prev) => {
            const isChecked = checked.includes(name);

            if (isChecked) {
                return checked.filter((el) => el !== name);
            } else {
                return [...prev, name];
            }
        });
    };

    const handleCheckCate = (name) => {
        setSelected((prev) => {
            const isChecked = selected.includes(name);

            if (isChecked) {
                return selected.filter((el) => el !== name);
            } else {
                return [...prev, name];
            }
        });
    };


    useEffect(() => {
        let param = []
        for(let i of params.entries()) param.push(i)
        const queries = {}
        for(let i of param) queries[i[0]] = i[1]
        if(checked.length > 0 ){
            queries.brand = checked.join(',') 
            queries.page = 1
        } else delete queries.brand
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString() 
        })

    },[checked])

    useEffect(() => {
        let param = []
        for(let i of params.entries()) param.push(i)
        const queries = {}
        for(let i of param) queries[i[0]] = i[1]
        if(selected.length > 0 ){
            queries.category = selected.join(',') 
        } else delete queries.category
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString() 
        })


        // if(selected.length > 0 ){
        //     let param = []
        //     for(let i of params.entries()) param.push(i)
        //     const queries = {}
        //     for(let i of param) queries[i[0]] = i[1]
        //     queries.category = selected.join(',') 
        //     queries.page = 1
        //     navigate({
        //         pathname: `/${category}`,
        //         search: createSearchParams().toString() 
        //     })
        // }else navigate(`/${category}`)

    },[selected])

    return ( 
        < >
            { dataBrand?.map((el) => (
                <div key={el._id} className={cx('group')}>
                    <input 
                        type="checkbox" 
                        checked={checked.includes(el.name)} 
                        onChange={() => handleCheck(el.name)} 
                        id={el._id}
                        value={el.name}
                     />
                    <label htmlFor={el._id}>{el.name}</label>
                </div>
            ))}
             { dataCategory?.map((el) => (
                <div key={el._id} className={cx('group')}>
                    <input 
                        type="checkbox" 
                        checked={selected.includes(el.name)} 
                        onChange={() => handleCheckCate(el.name)} 
                        id={el._id}
                        value={el.name}
                     />
                    <label htmlFor={el._id}>{el.name}</label>
                </div>
            ))}
        </>
     );
}

export default memo(SearchItem);