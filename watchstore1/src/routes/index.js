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

const publicRoutes = [
    { path: '/', component: Home, layout: LayoutHaveSlide },
    { path: '/products', component: Products },
    { path: '/products/:pid', component: DetailProduct },
    { path: '/cart/:id?', component: Cart },
    { path: '/contact', component: Contact },
    { path: '/pay', component: Payment },
    { path: '/account', component: Account },
    { path: '/don-hang', component: Order },
    { path: '/checkout', component: OrderDetail }, 
    { path: '/finalregister/:status', component: FinalRegister }, 
    { path: '/reset-password/:token', component: ResetPassword }, 
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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes, adminRoutes };