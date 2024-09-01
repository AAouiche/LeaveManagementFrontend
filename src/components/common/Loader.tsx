import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
            <CircularProgress />
        </Box>
    );
}