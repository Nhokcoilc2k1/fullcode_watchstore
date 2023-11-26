import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Stack, TextField } from "@mui/material";
import { saveAll, updatePromo } from "./PromotionServer";

function PromotionDialog({isOpen, isClose, data, setData,showToast, reLoad}) {

    
    const handleChange = (event) => {
        setData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const results = data._id
        ? await updatePromo(data._id, data)
        : await saveAll(data);
        if(results){
            isClose(false);
            showToast((prev) => !prev);
            reLoad((prev) => !prev)
        }else{
            console.log('error');
        }
    }

    const handleCancel = () => {
        isClose(false);
        setData({});
    }

    return ( 
    <Dialog
        fullWidth={true}
        open={isOpen}
        maxWidth="sm"
    >
        <form onSubmit={handleSubmit}>
            <Grid container alignItems={"center"} spacing={7}>
                <Grid item xs={10}>
                    <DialogTitle sx={{fontSize: '2rem'}}>
                        Thêm danh mục mới
                    </DialogTitle>
                </Grid>
                <Grid item xs={2}>
                    <IconButton onClick={() => isClose(false)} color="error" sx={{fontSize: "2.4rem"}}>
                        <FontAwesomeIcon icon={faClose} />
                    </IconButton>
                </Grid>
            </Grid>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField 
                            size="small"
                            required
                            autoFocus
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Tên khuyến mãi"
                            name="name"
                            inputProps={{style: {fontSize: 14}}} 
                            InputLabelProps={{style: {fontSize: 14}}} 
                            value={data?.name || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField 
                            size="small"
                            required
                            autoFocus
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Mã khuyến mãi"
                            name="coupon_code"
                            inputProps={{style: {fontSize: 14}}} 
                            InputLabelProps={{style: {fontSize: 14}}} 
                            value={data?.coupon_code || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField 
                            size="small"
                            required
                            autoFocus
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Loại khuyến mãi"
                            name="discount_type"
                            inputProps={{style: {fontSize: 14}}} 
                            InputLabelProps={{style: {fontSize: 14}}} 
                            value={data?.discount_type || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField 
                            size="small"
                            required
                            autoFocus
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Giá trị khuyến mãi"
                            name="discount_value"
                            inputProps={{style: {fontSize: 14}}} 
                            InputLabelProps={{style: {fontSize: 14}}} 
                            value={data?.discount_value || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField 
                            size="small"
                            required
                            autoFocus
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Giá trị khuyến mãi tối đa"
                            name="max_discount_value"
                            inputProps={{style: {fontSize: 14}}} 
                            InputLabelProps={{style: {fontSize: 14}}}
                            value={data?.max_discount_value || ''}
                            onChange={handleChange} 
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField 
                            size="small"
                            type="date"
                            required
                            autoFocus
                            fullWidth
                            focused 
                            id="outlined-basic"
                            variant="outlined"
                            label="Ngày hết hạn"
                            name="expired_at"
                            inputProps={{style: {fontSize: 14}}} 
                            InputLabelProps={{style: {fontSize: 14}}} 
                            value={data?.expired_at || ''}
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
    </Dialog> );
}

export default PromotionDialog;