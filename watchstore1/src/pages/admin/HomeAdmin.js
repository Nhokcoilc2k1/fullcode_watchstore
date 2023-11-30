import classNames from "classnames/bind";
import styles from './admin.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faElementor,  faFirstOrderAlt, faProductHunt, faStumbleuponCircle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { faCircleRadiation, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import {SalesChart, SalesPieChart, TopProductsChart} from "./Chart";
import { apiGetOrder, apiGetProducts } from "~/apis/product";
import { apiGetCategory } from "~/apis";
import { apiGetBrand } from "~/apis/brand";
import { apiGetPromotion } from "~/apis/promotion";
import { useEffect, useState } from "react";
import { apiGetUsers } from "~/apis/user";
import { apiGetPost } from "~/apis/post";

const cx = classNames.bind(styles);

function HomeAdmin() {
    const [product, setProduct] = useState([]);
    const [brand, setBrand] = useState([]);
    const [category, setCategory] = useState([]);
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState([]);
    const [post, setPost] = useState([]);

    const fetchApi = async() => {
        const product = await apiGetProducts();
        setProduct(product.products)
        const category = await apiGetCategory();
        setCategory(category.categorys)
        const brand = await apiGetBrand();
        setBrand(brand.brands)
        const user = await apiGetUsers()
        setUser(user.users);
        const order = await apiGetOrder();
        setOrder(order.orders);
        const post = await apiGetPost();
        setPost(post.posts)
    }

    const customer = user.filter(el => el.roles !== 'admin')

  

    useEffect(() => {
        fetchApi()
    }, [])

    const dataTop = [
        { product: 'Đồng Hồ Tissot 35mm Nữ T050.207.11.011.04', sales: 1 },
      { product: 'Đồng Hồ Olym Pianus 42mm Nam OP990-45ADGS-GL-X', sales: 1 },
      { product: 'Đồng Hồ Orient 41.7mm Nam RA-AA0B02R19B', sales: 1 },
    
      ];

      const dataCate = [
        { name: 'Đồng hồ nam', value: 2 },
        { name: 'Đồng hồ nữ', value: 1 },
      ];
      
      const databrand = [
        { name: 'PIANUS', value: 2 },
        { name: 'ORIENT', value: 1 },
        { name: 'TISSOT', value: 1 },
      ];
    
    const total = order.reduce((sum, el) => sum + el.totalPrice, 0)

    const databar = [
        { month: 'Tháng 12', sales: 50000 },
      ];
    

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('box-header')}>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'blue')}  icon={faProductHunt} />
                    <div className={cx('box-name')}>
                        <p>Tổng số sản phẩm</p>
                        <p className={cx('box-num')}>{product.length}</p>
                        <Link className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'brown')}  icon={faElementor} />
                    <div className={cx('box-name')}>
                        <p>Tổng số nhãn hiệu</p>
                        <p className={cx('box-num')}>{brand.length}</p>
                        <Link className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'violet')}  icon={faStumbleuponCircle} />
                    <div className={cx('box-name')}>
                        <p>Tổng số bài viết</p>
                        <p className={cx('box-num')}>{post.length}</p>
                        <Link className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
            </div>
            <div className={cx('box-header')}>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'green')}  icon={faFirstOrderAlt} />
                    <div className={cx('box-name')}>
                        <p>Tổng số đơn hàng</p>
                        <p className={cx('box-num')}>{order.length}</p>
                        <Link className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'red')}  icon={faUserCircle} />
                    <div className={cx('box-name')}>
                        <p>Tổng số người dùng</p>
                        <p className={cx('box-num')}>{customer.length}</p>
                        <Link className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'orange')}  icon={faCircleRadiation} />
                    <div className={cx('box-name')}>
                        <p>Tổng số danh mục</p>
                        <p className={cx('box-num')}>{category.length}</p>
                        <Link className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
            </div>
            <div className={cx('chart')}>
                <div className={cx('barchart')}>
                    <h2 className={cx('name-chart')}>Thống kê doanh số</h2>
                    <div className={cx('box-chart')}><SalesChart data={databar} /></div>
                </div>
                
                <div className={cx('piechart')}>
                    <h2 className={cx('name-chart')}>Số sản phẩm được bán theo danh mục</h2>
                    <SalesPieChart data={dataCate} />
                </div>
            </div>
            <div className={cx('chart')}>
                <div className={cx('piechart')}>
                    <h2 className={cx('name-chart')}>Số sản phẩm được bán theo nhãn hiệu</h2>
                    <SalesPieChart data={databrand} />
                </div>
                <div className={cx('barchart')}>
                    <h2 className={cx('name-chart')}>5 sản phẩm bán chạy nhất trong tháng</h2>
                    <TopProductsChart data={dataTop} />
                </div>
            </div>
        </div>
     );
}

export default HomeAdmin;