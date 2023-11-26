import { Button, Dialog, DialogContent, DialogTitle, Grid, Stack, Typography } from "@mui/material";

function DialogDelete({isOpen, isClose, data,showToast, reLoad, tittle, message, fcDelete}) {

    const handleDelete = async() => {
        try {
            const result = await fcDelete(data);
            if(result){
                isClose(false);
                showToast((prev) => !prev);
                reLoad((prev) => !prev);
            }
        } catch (error) {
            console.log(error);
        }
        
        
    }

    return ( 
        <Dialog
            open={isOpen}
            fullWidth={true}
            maxWidth="xs"
        >
            <DialogTitle sx={{fontSize: '2rem'}}>{tittle}</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography sx={{fontSize: '1.6rem', marginBottom: '16px'}}>{message}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent={"flex-end"}>
                            <Stack direction="row" spacing={1}>
                                <Button 
                                    variant="contained"
                                    size="medium"
                                    color="error"
                                    sx={{fontSize: '1.3rem'}}
                                    onClick={() => isClose(false)}
                                >
                                    Không
                                </Button>
                                <Button
                                    variant="contained"
                                    size="medium"
                                    color="primary"
                                    sx={{fontSize: '1.3rem'}}
                                    onClick={handleDelete}
                                >
                                    Đồng ý
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
     );
}

export default DialogDelete;