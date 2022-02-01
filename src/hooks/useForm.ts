import { useState } from "react";

export function useForm<T>(initialState:T){

// }

// export const useForm=<T>(initialState={})=>{

    const [values, setValues] = useState(initialState);

    const reset=( newFormState=initialState )=>{
        setValues(newFormState);
    }

    const handleInputChange=({target}:React.ChangeEvent<HTMLInputElement>)=>{
        setValues({
            ...values,
            [target.name]:target.value
        });
    }
    return {values,handleInputChange,reset};
}