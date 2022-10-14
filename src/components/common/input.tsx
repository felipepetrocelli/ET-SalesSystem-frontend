import { TextField } from "@mui/material";

interface AuthImputProps {
  label: string;
  value: any;
  type?: "text" | "email" | "password" | "number";
  required?: boolean;
  viseble?: boolean;
  onChange: (novoValor: any) => void;
  sx?: string
  error?: any
  error2?: any
  helperTouched?: any
  helperErrors?: any
  fullWidth:boolean
  size:"small" | "medium" | undefined
  variant:"standard" | "filled" | "outlined" | undefined
  id:string
  name:string
  autoComplete:string
  onBlur?: (e:any) => {}
}

export default function InputText(props: AuthImputProps) {
  return props.viseble ? null : (


    <TextField
    
    className={` p-1 `}
      size={props.size}
      variant={props.variant}
      onBlur={props.onBlur}
      margin="normal"
      fullWidth ={props.fullWidth}
      id={props.id}
      type={props.type}
      label={props.label}
      name={props.name}
      autoComplete={props.autoComplete}
      autoFocus
      onChange={props.onChange}
      value={props.value}
      error={props.error && Boolean(props.error2)}
      helperText={props.helperTouched && props.helperErrors}
    />
  );
}