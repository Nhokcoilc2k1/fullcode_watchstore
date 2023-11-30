import {
    faAddressCard,
    faCartShopping,
    faCube,
    faHouse,
    faNewspaper,
    faPen,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const adminSidebar = [
    {
        id: 1,
        type: 'SINGLE',
        text: 'Trang chủ',
        path: '/',
        icon: <FontAwesomeIcon icon={faHouse} />
    },
    {
        id: 2,
        type: 'PARENT',
        text: 'Quản lí danh mục',
        icon: <FontAwesomeIcon icon={faNewspaper} />,
        submenu: [
            {
                text: 'Thêm sản danh mục mới',
                path: '/create-category'
            },
            {
                text: 'Quản lí danh mục',
                path: '/category',

            }
        ]
    },
    {
        id: 3,
        type: 'PARENT',
        text: 'Quản lí nhãn hiệu',
        icon: <FontAwesomeIcon icon={faNewspaper} />,
        submenu: [
            {
                text: 'Thêm sản nhãn hiệu mới',
                path: '/create-brand'
            },
            {
                text: 'Quản lí nhãn  hiệu',
                path: '/brand',
            }
        ]
    },
    {
        id: 4,
        type: 'PARENT',
        text: 'Quản lí sản phẩm',
        icon: <FontAwesomeIcon icon={faSpinner} />,
        submenu: [
            {
                text: 'Thêm sản phẩm mới',
                path: '/create-product'
            },
            {
                text: 'Quản lí sản phẩm',
                path: '/manager'
            }
        ]
    },
    {
        id: 5,
        type: 'PARENT',
        text: 'Quản lí khuyến mãi',
        icon:<FontAwesomeIcon icon={faCube} />,
        submenu: [
            {
                text: 'Thêm khuyến mãi mới',
                path: '/newpromotion'
            },
            {
                text: 'Quản lí khuyến mãi',
                path: '/promotion'
            }
        ]
    },
    {
        id: 6,
        type: 'PARENT',
        text: 'Quản lí bài viết',
        icon: <FontAwesomeIcon icon={faPen} /> ,
        submenu: [
            {
                text: 'Thêm bài viết mới',
                path: '/create-product'
            },
            {
                text: 'Quản lí bài viết',
                path: '/post'
            }
        ]
    },
    {
        id: 7,
        type: 'SINGLE',
        text: 'Quản lí đơn hàng',
        path: '/order',
        icon:<FontAwesomeIcon icon={faCartShopping} />
    },
    {
        id: 8,
        type: 'SINGLE',
        text: 'Quản lí tài khoản',
        path: '/account',
        icon:<FontAwesomeIcon icon={faAddressCard} /> 
    },
]