// Layout
import { LayoutHaveSlide } from '~/Layout';

// Pages
import Home from '~/pages/Home';
import Products from '~/pages/Products';
import DetailProduct from '~/pages/DetailProduct';
import Cart from '~/pages/Cart';
import Payment from '~/pages/Payment';
import Account from '~/pages/Account';
import Contact from '~/pages/Contact';
import HomeAdmin from '~/pages/admin/HomeAdmin';
import ProductManager from '~/pages/admin/ProductManager/ProductManager';
import BrandManager from '~/pages/admin/BrandManager/BrandManager';
import CategoryManager from '~/pages/admin/CategoryManager/CategoryManager';
import PromotionManager from '~/pages/admin/PromotionManager/PromotionManager';
import PostManager from '~/pages/admin/PostManager/PostManager';
import OrderManager from '~/pages/admin/OrderManager/OrderManager';
import AccountManager from '~/pages/admin/AccountManager/AccountManager';
import Order from '~/pages/Order';
import OrderDetail from '~/pages/OderDetail';
import CreateProduct from '~/pages/admin/CreateProduct/CreateProduct';
import FinalRegister from '~/components/FinalRegister/FinalRegister';
import ResetPassword from '~/components/ResetPassword/ResetPassword';
import CreatePromotion from '~/pages/admin/components/CreatePromotion/CreatePromotion';
import path from '~/ultils/path';
import CreateCategory from '~/pages/admin/components/CreateCategory/CreateCategory';
import CreateBrand from '~/pages/admin/components/CreateBrand/CreateBrand';
import Post from '~/pages/Post';
import PostItem from '~/pages/PostItem';

const publicRoutes = [
    { path: path.HOME, component: Home, layout: LayoutHaveSlide },
    { path: path.PRODUCTS, component: Products },
    { path: path.DETAILPRODUCT_CATEGORY_PID_TITLE, component: DetailProduct },
    { path: path.CART, component: Cart },
    { path: path.CONNTACT, component: Contact },
    { path: path.PAYMENT, component: Payment },
    { path: path.ACCOUNT, component: Account },
    { path: path.ORDER, component: Order },
    { path: path.ORDERDETAIL, component: OrderDetail }, 
    { path: path.FINALREGISTER, component: FinalRegister }, 
    { path: path.RESETPASSWORD, component: ResetPassword }, 
    { path: path.POST, component: Post }, 
    { path: path.POSTITEM, component: PostItem }, 
];

const adminRoutes = [
    { path: '/', component: HomeAdmin },
    { path: '/manager', component: ProductManager },
    { path: '/brand', component: BrandManager },
    { path: '/category', component: CategoryManager },
    { path: '/promotion', component: PromotionManager },
    { path: '/post', component: PostManager },
    { path: '/order', component: OrderManager },
    { path: '/account', component: AccountManager },
    { path: '/create-product', component: CreateProduct },
    { path: '/newpromotion', component: CreatePromotion },
    { path: '/create-category', component: CreateCategory },
    { path: '/create-brand', component: CreateBrand },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes, adminRoutes };
