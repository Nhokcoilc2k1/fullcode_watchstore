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
                path: '/create-post'
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

export const sorts = [
    {
        id: 1,
        value: '',
        text: 'Mặc định'
    },
    {
        id: 2,
        value: 'sale_price',
        text: 'Giá thấp đến cao'
    },
    {
        id: 3,
        value: '-sale_price',
        text: 'Giá cao đến thấp'
    },
    {
        id: 4,
        value: 'totalRating',
        text: 'Đánh giá cao'
    },
]

export const used = [
    {_id: 'Nam', name: 'đồng hồ nam'},
    {_id: "Nữ", name: 'đồng hồ nữ'},
];

export const filterPrice = [
    {_id: 1, name: 'dưới 3 triệu', value: [0,3000000]},
    {_id: 2, name: '3 - 6 triệu', value: [3000000,6000000]},
    {_id: 3, name: '6 - 12 triệu', value: [6000000, 12000000]},
    {_id: 4, name: '12 - 35 triệu', value: [12000000, 35000000]},
    {_id: 5, name: '35 - 100 triệu', value: [35000000, 100000000]},
];

// const urlImg = [
//     {url: 'https://wscdn.vn/upload/image/OP990-45ADGS-GL-T-1-1131812509-1619214585.jpg?size=500x500&fomat=webp'},
//     {url: 'https://wscdn.vn/upload/image/RA-AA0B02R19B-2081811590-287106387.jpg?size=500x500&fomat=webp'},
//     {url: 'https://wscdn.vn/upload/image/OP990-45ADGS-GL-T-1-1131812509-1619214585.jpg?size=500x500&fomat=webp'},
//     { url: 'https://wscdn.vn/upload/image/L2-1660492967-1835041053.jpg?size=800x800&fomat=webp'},
// ];