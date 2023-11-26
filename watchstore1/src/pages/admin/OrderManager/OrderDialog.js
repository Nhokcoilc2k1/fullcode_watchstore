import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { updateOrder } from "./OrderServer";

const status = ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao hàng','Đã giao hàng', 'Đã hủy']


function OrderDialog({isOpen, isClose, data, setData, showToast, reLoad}) {

    const handleChange = (e) => {
        setData(prev => ({
            ...prev,
            [e.target.name] : e.target.value,
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const result = await updateOrder(data._id, data);
        if(result){
            isClose(false);
            // showToast(true);
            reLoad((prev) => !prev);
        }else{
            console.log("error");
        }
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
                            Chi tiết đơn hàng
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
                        <Grid item xs={4} >
                            <TextField
                                size="small"
                                required
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                label="Tên khách hàng"
                                name="name"
                                margin="dense" 
                                inputProps={{style: {fontSize: 14}}} 
                                InputLabelProps={{style: {fontSize: 14}}} 
                                value={data?.name}
                            />
                        </Grid>
                        <Grid item xs={4} >
                            <TextField
                                size="small"
                                required
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                label="Số điện thoại"
                                name="price"
                                margin="dense" 
                                inputProps={{style: {fontSize: 14}}} 
                                InputLabelProps={{style: {fontSize: 14}}} 
                                value={data?.phone}
                            />
                        </Grid>
                        <Grid item xs={4} >
                            <TextField
                                size="small"
                                required
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                label="Tổng giá"
                                name="image"
                                margin="dense" 
                                inputProps={{style: {fontSize: 14}}} 
                                InputLabelProps={{style: {fontSize: 14}}} 
                                value={data?.totalPrice || ''}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                size="small"
                                required
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                label="Địa chỉ"
                                name="sale_price"
                                margin="dense" 
                                inputProps={{style: {fontSize: 14}}} 
                                InputLabelProps={{style: {fontSize: 14}}} 
                                value={data?.address}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                size="small"
                                required
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                label="Ghi chú đơn hàng"
                                name="sale_price"
                                margin="dense" 
                                inputProps={{style: {fontSize: 14}}} 
                                InputLabelProps={{style: {fontSize: 14}}} 
                                value={data?.note}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth size="small">
                                <InputLabel sx={{fontSize: 14}}>Trạng thái đơn hàng</InputLabel>
                                <Select
                                    sx={{fontSize:14}}
                                    name="status"
                                    autoFocus
                                    value={data?.status || ''}
                                    onChange={handleChange}
                                >
                                    {status.map((item, index) => (
                                        <MenuItem sx={{fontSize: 14}} key={index} value={item} >{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {
                            data.orderItems.map((item, index) => (
                                <Grid key={index} item xs={12} >
                                    <TextField
                                        size="small"
                                        required
                                        fullWidth
                                        id="outlined-basic"
                                        variant="outlined"
                                        label="Tên sản phẩm"
                                        name="description"
                                        margin="dense" 
                                        inputProps={{style: {fontSize: 14}}} 
                                        InputLabelProps={{style: {fontSize: 14}}} 
                                        value={item.name}
                                    />
                                </Grid>

                            ))
                        }
                        <Grid item xs={12}>
                            <Grid container justifyContent={"flex-end"} >
                                <Stack spacing={2} direction="row">
                                    <Button 
                                        variant="contained"
                                        size="meidum"
                                        color="error"
                                        sx={{fontSize: '1.3rem'}}
                                        onClick={() => isClose(false)}
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

export default OrderDialog;