import {string} from "yup";


export type  FieldInputProps = {
  name?: string ,
  checked?: boolean,
  onBlur?: () => void ,
  onChange?: (e: React.ChangeEvent<any>) => void ,
  value?: string,
  multiple?: boolean  ,

}
