import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { saveAll, updateProduct } from "./ProductServer";

function ProductDialog({isOpen, isClose, data, setData,showToast, reLoad, brands, categorys}) {


    const handleChange = (e) => {
        setData(prev => ({
            ...prev,
            [e.target.name] : e.target.value,
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const result = data._id
        ? await updateProduct(data._id, data)
        : await saveAll(data);

        if(result){
            isClose(false);
            showToast(true);
            reLoad((prev) => !prev);
        }else{
            console.log("error");
        }
        setData({});
    }

    const handleCancel = () => {
        isClose(false);
        setData({});
    }

    return ( 
        <Dialog
            open={isOpen}
            fullWidth={true}
            maxWidth="md"
        >
            <form onSubmit={handleSubmit}>
                <Grid container alignItems={"center"} spacing={14}>
                    <Grid item xs={10}>
                        <DialogTitle sx={{fontSize: '2.4rem'}}>
                            Thêm sản phẩm mới
                        </DialogTitle>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={() => isClose(false)} color="error" sx={{fontSize: "2rem"}}>
                            <FontAwesomeIcon icon={faClose} />
                        </IconButton>
                    </Grid>
                </Grid>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={8} >
                            <TextField
                                size="small"
                                required
                                autoFocus
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                label="Tên sản phẩm"
                                name="name"
                                margin="dense" 
                                inputProps={{style: {fontSize: 14}}} 
                                InputLabelProps={{style: {fontSize: 14}}} 
                                value={data?.name || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4} >
                            <TextField
                                size="small"
                                required
                                autoFocus
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                label="Giá"
                                name="price"
                                margin="dense" 
                                inputProps={{style: {fontSize: 14}}} 
                                InputLabelProps={{style: {fontSize: 14}}} 
                                value={data?.price || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={8} >
                            <TextField
                                size="small"
                                required
                                autoFocus
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                label="Đường dẫn hình ảnh"
                                name="image"
                                margin="dense" 
                                inputProps={{style: {fontSize: 14}}} 
                                InputLabelProps={{style: {fontSize: 14}}} 
                                value={data?.image || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4} >
                            <TextField
                                size="small"
                                required
                                autoFocus
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                label="Giá sau giảm giá"
                                name="sale_price"
                                margin="dense" 
                                inputProps={{style: {fontSize: 14}}} 
                                InputLabelProps={{style: {fontSize: 14}}} 
                                value={data?.sale_price || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth size="small">
                                <InputLabel sx={{fontSize: 14}}>Nhãn hiệu</InputLabel>
                                <Select
                                    sx={{fontSize:14}}
                                    name="brand"
                                    value={data?.brand || ''}
                                    onChange={handleChange}
                                >
                                    {brands.map((brand) => (
                                        <MenuItem sx={{fontSize: 14}} key={brand._id} value={brand._id} >{brand.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth size="small">
                                <InputLabel sx={{fontSize: 14}}>Danh mục</InputLabel>
                                <Select
                                    sx={{fontSize:14}}
                                    name="category"
                                    value={data?.category || ''}
                                    onChange={handleChange}
                                >
                                    {categorys.map(category => (
                                        <MenuItem sx={{fontSize: 14}} key={category._id} value={category._id}>{category.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} >
                            <TextField
                                size="small"
                                required
                                autoFocus
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                label="Phần trăm giảm giá"
                                name="discount_value" 
                                inputProps={{style: {fontSize: 14}}} 
                                InputLabelProps={{style: {fontSize: 14}}} 
                                value={data?.discount_value || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                size="small"
                                required
                                autoFocus
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                label="Mô tả"
                                name="description"
                                margin="dense" 
                                inputProps={{style: {fontSize: 14}}} 
                                InputLabelProps={{style: {fontSize: 14}}} 
                                value={data?.description || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={"flex-end"} >
                                <Stack spacing={2} direction="row">
                                    <Button 
                                        variant="contained"
                                        size="meidum"
                                        color="error"
                                        sx={{fontSize: '1.3rem'}}
                                        onClick={handleCancel}
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        color="primary"  
                                        type="submit"                                        
                                        sx={{fontSize: '1.3rem'}}
                                    >
                                        Lưu
                                    </Button>
                                </Stack>
    
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </form>
        </Dialog>
     );
}

export default ProductDialog;