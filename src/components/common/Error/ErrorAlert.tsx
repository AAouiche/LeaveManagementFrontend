import { Alert } from "@mui/material"


interface ErrorAlertProps{
   error: string|null
}

export default function ErrorAlert(props:ErrorAlertProps){
  if (!props.error) return null;
  return (
    
    <Alert severity="error" sx={{ mb: 4 }}>
        {props.error}
    </Alert>
);
}