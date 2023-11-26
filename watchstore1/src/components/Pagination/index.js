import { Pagination, Stack } from "@mui/material";


function PaginationRouned() {
    return ( 
        <Stack>
            <Pagination  count={3} size="large"  shape="rounded" />
        </Stack>
     );
}

export default PaginationRouned;