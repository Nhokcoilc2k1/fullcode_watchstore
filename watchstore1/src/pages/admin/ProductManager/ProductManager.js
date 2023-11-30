import classNames from 'classnames/bind';
import styles from '../admin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import {  useEffect, useState } from 'react';
import { getAllBrand } from '../BrandManager/BrandServer';
import { getAllCategory } from '../CategoryManager/CategoryServer';
import moment from 'moment';
import Pagination from '~/pages/components/Pagination';
import queryString from 'query-string';
import UpdateProduct from './UpdateProduct';
import { formattedNumber } from '~/ultils/helpers';
import Swal from 'sweetalert2';
import { apiDeleteProduct } from '~/apis/product';
import { toast } from 'react-toastify';
import { faIntercom } from '@fortawesome/free-brands-svg-icons';
import CustomizeVarriant from './CustomizeVariant';

const cx = classNames.bind(styles);

function ProductManager() {
    const [productData, setProductData] = useState([]);
    const [branData, setBrandData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    const [reLoad, setReLoad] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [customizeVarriant, setCustomVarriant] = useState(null);

    const [pagination, setPagination] = useState({})

    const [filters, setFilters] = useState({
        limit: 3,
        page: 1,
    })
    
    useEffect(() => {
        async function fetchProductLish() {
            try {
                const paramString = queryString.stringify(filters);
                const requestUrl = `http://localhost:5000/api/products?${paramString}`;
                const response = await fetch(requestUrl);
                const responseJson = await response.json();
                const {products,pagination} = responseJson;
                setProductData(products);
                setPagination(pagination);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductLish();
    },[ reLoad, filters])

    useEffect(() => {
        const fetchApi = async() => {
            try {
                const brand = await getAllBrand();
                const category = await getAllCategory();
                setCategoryData(category?.data.categorys);
                setBrandData(brand?.data.brands);
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi();
    },[reLoad]);

    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            page: newPage
        })
    }

    const handleCompareBrand = (brandId) => {
        const brand = branData.find(brand => brand._id === brandId);
        if(brand){
            return brand.name;
        }else{
            return;
        }
    }

    const handleCompareCategory = (categoryId) => {
        const category = categoryData.find(category => category._id === categoryId);
        if(category){
            return category.name;
        }else{
            return;
        }
    }

    const handleCompareDate = (updatedAt, createdAt) => {
        const update = createdAt === updatedAt ? '' : moment(updatedAt).format("DD/MM/YYYY h:mm a");
        return update;
    }

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


    return <div className={cx('wrapper')}>
        { editProduct && (
            <div className={cx('update')}>
                <UpdateProduct editProduct={editProduct} setEditProduct={setEditProduct} setReLoad={setReLoad} />
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
                    {/* <Button onClick={() => setShowDialog(true)} className={cx('btn')}>Thêm mới</Button> */}
                    {/* <Button className={cx('btn')}>Thêm thông số kĩ thuật</Button> */}
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm" />
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
                        {productData.length !== 0 ?
                            productData.map((product,index) => (
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
                            <td><p className={cx('cus-col2', 'custom')}>{handleCompareBrand(product.brand)}</p></td>
                            <td><p className={cx('cus-col2', 'custom')}>{handleCompareCategory(product.category)}</p></td>
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
                <Pagination pagination={pagination} onPageChange={handlePageChange}  />
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