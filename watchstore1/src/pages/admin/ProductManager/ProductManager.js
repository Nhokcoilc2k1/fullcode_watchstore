import classNames from 'classnames/bind';
import styles from '../admin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import {  useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import UpdateProduct from './UpdateProduct';
import {  formattedNumber, handleCompareDate } from '~/ultils/helpers';
import Swal from 'sweetalert2';
import { apiDeleteProduct, apiGetProducts } from '~/apis/product';
import { toast } from 'react-toastify';
import { faIntercom } from '@fortawesome/free-brands-svg-icons';
import CustomizeVarriant from './CustomizeVariant';
import ExportToExcel from '../components/ExportToExcel';
import { Pagination } from '~/Layout/components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function ProductManager() {
    const [productData, setProductData] = useState([]);
    const [reLoad, setReLoad] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [customizeVarriant, setCustomVarriant] = useState(null);
    const [queries, setQueries] = useState({
        q: ""
    })

    const [params] = useSearchParams();

    const fetchProduct = async(params) => {
        const response = await apiGetProducts({...params, limit : process.env.REACT_APP_LIMIT })
        console.log(response);
        if(response.success) setProductData(response)
    }

    
    const queriesDebounced = useDebounce(queries.q, 800);
    
    useEffect(() => {
        const queries= Object.fromEntries([...params])
         if(queriesDebounced){
            queries.q = queriesDebounced
            delete queries.page
         }
       fetchProduct(queries)
    },[queriesDebounced, params])

    const handleDelete = (pid) => {
        Swal.fire({
            title: 'Xóa sản phẩm',
            text: 'Bạn chắc chắn muốn xóa sản phẩm này', 
            icon: 'warning',
            showCancelButton: true,
        }).then(async(rs) => {
            if(rs.isConfirmed){
                const response = await apiDeleteProduct(pid);
                if(response.success){
                    toast.success(response.message)
                    setReLoad(prev => !prev)
                }
                else toast.error(response.message);
            }
        })
        
    }

    const handleInputSearch = (e) => {
        setQueries({...queries, q: e.target.value})
    }

   const render = useCallback(() => {
        setReLoad(!reLoad);
   },[reLoad]);

    return <div className={cx('wrapper')}>
        { editProduct && (
            <div className={cx('update')}>
                <UpdateProduct editProduct={editProduct} setEditProduct={setEditProduct} render={render} />
            </div>
        )
        }
         { customizeVarriant && (
            <div className={cx('update')}>
                <CustomizeVarriant customizeVarriant={customizeVarriant} setCustomVarriant={setCustomVarriant} setReLoad={setReLoad} />
            </div>
        )
        }
        <div className={cx('inner')}>
                <h2 className={cx('table-name')}>Danh sách sản phẩm</h2>
                <div className={cx('header')}>
                    <ExportToExcel />
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm sản phẩm tại đây..." value={queries.q} onChange={handleInputSearch} />
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </div>
                </div>
                <table className={cx('table')}>
                    <thead className={cx('t-header')}>
                        <tr>
                            <th> <p className={cx('title')}>Thao tác</p></th>
                            <th><p className={cx('title')}>Mã sản phẩm</p></th>
                            <th> <p className={cx('title')}>Tên sản phẩm</p></th>
                            <th><p className={cx('title')}>Hình ảnh</p></th>
                            <th><p className={cx('title')}>Nhãn hiệu</p> </th>
                            <th><p className={cx('title')}>Danh mục</p></th>
                            <th><p className={cx('title')}>Giá nhập</p></th>
                            <th> <p className={cx('title')}>Giá bán</p></th>
                            <th><p className={cx('title')}>Đã bán</p></th>
                            <th><p className={cx('title')}>Ngày tạo</p></th>
                            <th><p className={cx('title')}>Ngày sửa</p></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData?.products?.length !== 0 ?
                            productData?.products?.map((product,index) => (
                            <tr className={cx('row')} key={index}>
                            <td className={cx('cus-col2')}>
                                <div className={cx('action')}>
                                    <span onClick={() => setEditProduct(product)} className={cx('icon-btn')}><FontAwesomeIcon icon={faPen} /></span>
                                    <span onClick={() => handleDelete(product._id)}  className={cx('icon-btn')}><FontAwesomeIcon icon={faTrash} /></span>
                                    <span onClick={() => setCustomVarriant(product._id)} className={cx('icon-btn', 'varriant')}><FontAwesomeIcon icon={faIntercom} /></span>
                                </div>
                            </td>
                            <td className={cx('cus-col2')}><p className={cx('code')}>{product._id.slice(-6)}</p></td>
                            <td><p className={cx('name')}>{product.name}</p></td>
                            <td className={cx('cus-col1')}><p className={cx('product-img')}><img src={product.thumbnail} alt={product.description} /></p></td>
                            <td><p className={cx('cus-col2', 'custom')}>{product.brand}</p></td>
                            <td><p className={cx('cus-col2', 'custom')}>{product.category}</p></td>
                            <td><p className={cx('cus-col3', 'custom')}>{formattedNumber(product.price)}đ</p></td>
                            <td><p className={cx('cus-col3', 'custom')}>{formattedNumber(product.sale_price)}đ</p></td>
                            <td><p className={cx('cus-col2', 'custom')}>{product.sold}</p></td>
                            <td className={cx('cus-col3')}><p className={cx('date')}>{moment(product.createdAt).format("DD/MM/YYYY h:mm a")}</p></td>
                            <td className={cx('cus-col3')}><p className={cx('date')}>{handleCompareDate(product.updatedAt, product.createdAt)}</p></td>
                        </tr>
                        )): (<></>)}
                    </tbody>
                </table>
                
            </div>
            <div className={cx('pagination')}>
                <Pagination totalCount={productData?.pagination?.counts} />
            </div>
    </div>;
}

export default ProductManager;


// {showDialog && 
//     <ProductDialog 
//         isOpen={showDialog}
//         isClose={setShowDialog}
//         data={productById}
//         setData={setProductById}
//         reLoad={setReLoad}
//         brands={branData}
//         categorys={categoryData}
//     />
// }