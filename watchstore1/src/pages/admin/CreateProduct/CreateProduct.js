import classNames from "classnames/bind";
import styles from './CreateProduct.module.scss';
import { useFormik} from 'formik';
import { useCallback, useEffect, useState } from "react";
import { getAllBrand } from "../BrandManager/BrandServer";
import { getAllCategory } from "../CategoryManager/CategoryServer";
import Button from "~/components/Button";
import { createProductValidation } from "~/components/Form/SignupValidation";
import MarkdownEditor from "./MarkdownEditor";
import { getBase64 } from "~/ultils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { saveAll } from "../ProductManager/ProductServer";
import { createProduct } from "~/Redux/Reducers/ProductSlice";
import { useDispatch } from "react-redux";
import { apiCreateProduct } from "~/apis/product";

const cx = classNames.bind(styles)

function CreateProduct() {
    // const dispatch = useDispatch();
    const [categoryData, setCategoryData] = useState([]);
    const [branData, setBrandData] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [images, setImages] = useState([]);
    const [payload, setPayload] = useState({
        description: ''
    })
    const [invalidFields, setInvalidFields] = useState([]);
    // const [preview, setPreview] = useState({
    //     thumb: null,
    //     images: [],
    // })

    // const [hoverElm, setHoverElm] = useState(null)

    // const handlePriviewThumd = async(file) => {
    //     const base64Thumb = await getBase64(file)
    //     setPreview(prev => ({...prev, thumb: base64Thumb}))
    // }

    // const handlePreviewImage = async(files) => {
    //     const imagesPreview = []
    //     for(let file of files){
    //         if(file.type !== 'image/png' && file.type !== 'image/jpeg' ) {
    //             alert('file not supported !');
    //             return;
    //         }
    //         const base64 = await getBase64(file)
    //         imagesPreview.push({name: file.name, path: base64});
    //     }

    //     if(imagesPreview.length > 0) setPreview(prev => ({...prev, images: imagesPreview}))
    // }

    // useEffect(() => {
    //     if(!thumbnail) return;
    //     handlePriviewThumd(thumbnail[0])
    // },[thumbnail])

    // useEffect(() => {
    //     if(!images) return;
    //     handlePreviewImage(images)
    // },[images])

    const changValue = useCallback((e) => {
        setPayload(e)
    }, [payload])

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
    },[]);

    const {values, errors, handleChange,handleSubmit, handleBlur, touched} = useFormik({
        initialValues: {
            name: '',
            price: '',
            sale_price: '',
            quantity: '',
            category: '',
            brand: '',
        },
        validationSchema: createProductValidation,
        // if(values.category) values.category = categoryData?.find(el => el._id === values.category)?.name
        // if(values.brand) values.brand = branData?.find(el => el._id === values.brand)?.name
        onSubmit : async() => {
            console.log({...values,...payload, thumbnail, images});
            const finalPayload = {...values,...payload, thumbnail, images};
            console.log(finalPayload);
            const formData = new FormData()
            for(let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
            if(finalPayload.thumbnail) formData.append('thumbnail', finalPayload.thumbnail[0])
            if(finalPayload.images){
                for(let image of finalPayload.images) formData.append('images', image)
            }

            const response =  await apiCreateProduct(formData);
            console.log(response);

        },
      });

    //   const handleRemoveImg = (name) => {
    //       if(preview.images?.some(el => el.name === name)) setPreview(prev => ({...prev, images: prev.images?.filter(el => el.name !== name)}))
    //   }

    return ( <div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <h2 className={cx('table-name')}>Thêm mới sản phẩm</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className={cx('form-group')}>
                        <label>Tên sản phẩm</label>
                        <input 
                            type="text"
                            placeholder="Tên sản của phẩm mới"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={cx(errors.name && touched.name ? 'input-error':'')}
                        />
                        {errors.name && touched.name && <span>{errors.name}</span>}
                    </div>
                    <div className={cx('box-input')}>
                        <div className={cx('form-group')}>
                            <label>Số lượng</label>
                            <input 
                                type="text"
                                placeholder="Số lượng của sản phẩm"
                                name="quantity"
                                value={values.quantity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.quantity && touched.quantity ? 'input-error':'')}
                            />
                            {errors.quantity && touched.quantity && <span>{errors.quantity}</span>}
                        </div>
                        <div className={cx('form-group')}>
                            <label>Giá gốc</label>
                            <input 
                                type="text"
                                placeholder="Giá gốc"
                                name="price"
                                value={values.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.price && touched.price ? 'input-error':'')}
                            />
                            {errors.price && touched.price && <span>{errors.price}</span>}
                        </div>
                        <div className={cx('form-group')}>
                            <label>Giá bán</label>
                            <input 
                                type="text"
                                placeholder="Giá bán"
                                name="sale_price"
                                value={values.sale_price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={cx(errors.sale_price && touched.sale_price ? 'input-error':'')}
                            />
                            {errors.sale_price && touched.sale_price && <span>{errors.sale_price}</span>}
                        </div>
                    </div>
                    <div className={cx('box-input')}>
                        <div className={cx('form-select')}>
                            <label htmlFor="category">Danh mục</label>
                            <select 
                                id="category" 
                                value={values.category} 
                                name="category"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="">--CHOOSE--</option>
                                {
                                    categoryData?.map(el => (
                                        <option key={el._id} value={el._id}>{el.name}</option>
                                    ))
                                }
                            </select>
                            {errors.category && touched.category && <span>{errors.category}</span>}
                        </div>
                        <div className={cx('form-select')}>
                            <label htmlFor="brand">Nhãn hiệu</label>
                            <select 
                                id="brand" 
                                value={values.brand} 
                                name="brand"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="">--CHOOSE--</option>
                                {
                                    branData?.map(el => (
                                        <option key={el._id} value={el._id}>{el.name}</option>
                                    ))
                                }
                            </select>
                            {errors.brand && touched.brand && <span>{errors.brand}</span>}
                        </div>
                    </div>
                    <MarkdownEditor 
                        name='description'
                        changValue={changValue}
                        label='Mô tả'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <div className={cx('upload')}>
                        <label htmlFor="thumb">Tải lên hình ảnh thu nhỏ</label>
                        <input 
                            id="thumb" 
                            type="file" 
                            onChange={e => setThumbnail(e.target.files)}
                        />
                        {/* {errors.thumbnail && touched.thumbnail && <span>{errors.thumbnail}</span>}       */}
                    </div>
                      {/* {preview.thumb && <div className={cx('thumb')}>
                            <img src={preview.thumb} alt="thumbnail" className={cx('thumb-img')} />
                        </div>}
                            */}
                    <div className={cx('upload')}>
                        <label htmlFor="products">Tải lên hình ảnh của sản phẩm</label>
                        <input 
                            id="products" 
                            type="file" 
                            multiple 
                            onChange={e => setImages(e.target.files)}
                        />
                        {/* {errors.images && touched.images && <span>{errors.images}</span>} */}
                    </div>{/*
                        {preview.images.length > 0 && <div className={cx('thumb')}>
                            {preview.images?.map((el, index) => (
                                <div 
                                    onMouseEnter={() => setHoverElm(el.name)} 
                                    key={index} 
                                    className={cx('preview-img')}
                                    onMouseLeave={() => setHoverElm(null)}
                                    >
                                    <img src={el.path} alt="product" className={cx('thumb-img')} />
                                    {hoverElm === el.name && <div className={cx('overlay')} onClick={() => handleRemoveImg(el.name)}>
                                            <FontAwesomeIcon icon={faTrashCan} className={cx('icon')} />
                                        </div>} 
                                </div>
                            ))}
                            </div>} */}
                    <div className={cx('ctrl-create')}>
                        <Button type="submit" className={cx('control-btn')}>
                            Tạo sản phẩm mới
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </div> );
}

export default CreateProduct;