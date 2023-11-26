import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { saveAll, updateCategory } from "./CategoryServer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function CategoryDialog({isOpen, isClose, data, setData,showToast, reLoad}) {

    const handleChange = (e) => {
        setData(prev => ({
            ...prev,
            status: false,
            [e.target.name]:e.target.value,
        }))
    }
    
    const handleCancel = () => {
        isClose(false);
        setData({});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const result = data._id 
        ? await updateCategory(data._id, data)
        : await saveAll(data)
        if(result){
            isClose(false);
            showToast(true);
            reLoad((prev) => !prev);
        }else{
            console.log('error');
        }
        setData({});
    }


    return ( 
        <Dialog
            open={isOpen}
            fullWidth={true}
            maxWidth="sm"
            >
            <form onSubmit={handleSubmit}>
                <Grid container alignItems={"center"} spacing={4}>
                    <Grid item xs={10}>
                        <DialogTitle sx={{fontSize: '2rem'}}>
                            Thêm danh mục mới
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
                        <Grid item xs={12} >
                            <TextField
                                size="small"
                                required
                                autoFocus
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                label="Tên danh mục"
                                name="name"
                                margin="dense" 
                                inputProps={{style: {fontSize: 14}}} 
                                InputLabelProps={{style: {fontSize: 14}}} 
                                value={data?.name || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                size="small"
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
                        <Grid item xs={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel sx={{fontSize: 14}}>Trạng thái</InputLabel>
                                <Select
                                    sx={{fontSize:14}}
                                    name="status"
                                    value={data?.status || false}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={false}>OFF</MenuItem>
                                    <MenuItem value={true}>ON</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                size="small"
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

export default CategoryDialog;