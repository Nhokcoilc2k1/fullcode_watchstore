import classNames from "classnames/bind";
import styles from './admin.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faElementor,  faFirstOrderAlt, faProductHunt, faStumbleuponCircle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { faCircleRadiation, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import {SalesChart, SalesPieChart, TopProductsChart} from "./Chart";
import { apiGetOrder, apiGetOrderStatistical, apiGetProducts } from "~/apis/product";
import { useEffect, useState } from "react";
import { apiGetUsers } from "~/apis/user";
import { apiGetPosts } from "~/apis/post";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function HomeAdmin() {
    const [product, setProduct] = useState([]);
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState([]);
    const [post, setPost] = useState([]);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [filterData, setFilterData] = useState(null);
    const [sellTop, setSellTop] = useState([]);
    const [both, setBoth] = useState([]);

    const {categories} = useSelector(state => state.app);
    const {brands} = useSelector(state => state.brands);
    const today = new Date();
    
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const currentMonth = today.getMonth()

    const fetchApi = async() => {
        const product = await apiGetProducts();
        setProduct(product.products)
        const user = await apiGetUsers()
        setUser(user.users);
        const order = await apiGetOrder({createdAt: {gte: startOfMonth, lte: endOfMonth}});
        setOrder(order.orders);
        const post = await apiGetPosts();
        setPost(post.posts)
        const topSellProduct = await apiGetProducts({sort: '-sold', limit: 5, fields: 'sold name', createdAt: {gte: startOfMonth, lte: endOfMonth}})
        if(topSellProduct.success) setSellTop(topSellProduct.products)
        const dataBraCate = await apiGetOrderStatistical();
        if(dataBraCate.success) setBoth(dataBraCate.orders)
    }

    const customer = user.filter(el => el.roles !== 'admin');
    
    useEffect(() => {
        fetchApi()
    }, [])

    const handleSortPrice = async() => {
        const startSort = new Date(start)
        const endSort = new Date(end)
        if(start && end){
            const response = await apiGetOrder({ fields: 'totalPrice', createdAt: {gte: startSort, lte: endSort}})
            if(response.success) setFilterData(response.orders);
        }
    }

    let databar = []
    if(filterData){
        const saleSort = filterData.filter(el => el.status !== 'Đã hủy').reduce((sum, el) => sum + el.totalPrice, 0);
        databar = [
        { month: `${start} đến ${end}`, sales: saleSort},
    ];
    } else {
        const sales = order.filter(el => el.status !== 'Đã hủy').reduce((sum, el) => sum + el.totalPrice, 0);
        databar = [
            { month: `Tháng ${currentMonth + 1}`, sales: sales},
        ];
    }

    let filterBrand = [];
    let filterCategory = [];
    both?.forEach((el) => {
        el?.products?.forEach((item) => {
            filterBrand.push({name: item.product.brand, sold: item.quantity})
            filterCategory.push({name: item.product.category, sold: item.quantity})
        })
    })
    
    const databrand = Array.from(filterBrand.reduce((map, item) => {
    const { name, sold } = item;
    map.set(name, (map.get(name) || 0) + sold);
    return map;
    }, new Map()), ([name, sold]) => ({ name, sold }));

    const dataCate = Array.from(filterCategory.reduce((map, item) => {
    const { name, sold } = item;
    map.set(name, (map.get(name) || 0) + sold);
    return map;
    }, new Map()), ([name, sold]) => ({ name, sold }));
      
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('box-header')}>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'blue')}  icon={faProductHunt} />
                    <div className={cx('box-name')}>
                        <p>Tổng số sản phẩm</p>
                        <p className={cx('box-num')}>{product?.length}</p>
                        <Link to={'/manager'} className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'brown')}  icon={faElementor} />
                    <div className={cx('box-name')}>
                        <p>Tổng số nhãn hiệu</p>
                        <p className={cx('box-num')}>{brands.length}</p>
                        <Link to={'/brand'} className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'violet')}  icon={faStumbleuponCircle} />
                    <div className={cx('box-name')}>
                        <p>Tổng số bài viết</p>
                        <p className={cx('box-num')}>{post.length}</p>
                        <Link to={'/post'} className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
            </div>
            <div className={cx('box-header')}>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'green')}  icon={faFirstOrderAlt} />
                    <div className={cx('box-name')}>
                        <p>Tổng số đơn hàng</p>
                        <p className={cx('box-num')}>{order.length}</p>
                        <Link to={'/order'} className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'red')}  icon={faUserCircle} />
                    <div className={cx('box-name')}>
                        <p>Tổng số người dùng</p>
                        <p className={cx('box-num')}>{customer.length}</p>
                        <Link to={'/account'} className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
                <div className={cx('box-item')}>
                    <FontAwesomeIcon className={cx('box-icon', 'orange')}  icon={faCircleRadiation} />
                    <div className={cx('box-name')}>
                        <p>Tổng số danh mục</p>
                        <p className={cx('box-num')}>{categories.length}</p>
                        <Link to={'/category'} className={cx('box-btn')}>Xem chi tiết</Link>
                    </div>
                </div>
            </div>
            <div className={cx('chart')}>
                <div className={cx('barchart')}>
                    <h2 className={cx('name-chart')}>Thống kê doanh số</h2>
                    <div className={cx('box-chart')}>
                       <div className={cx('sort-order')}>
                            <input type="date" onChange={e => setStart(e.target.value)} />
                            <span>đến</span>
                            <input type="date" onChange={e => setEnd(e.target.value)} />
                            <button onClick={handleSortPrice} className={cx('sort')}>Lọc kết quả</button>
                       </div>
                        <SalesChart data={databar} />
                    </div>
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
                    <TopProductsChart data={sellTop} />
                </div>
            </div>
        </div>
     );
}

export default HomeAdmin;