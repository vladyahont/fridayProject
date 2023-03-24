import React from 'react';
// import {BasicModal} from "./BasicModal";
// import {useAppDispatch} from "app/store";
//
//
// type PropsType = {
//     id: string
//     name: string
// }
//
// export const EditModal = (props: PropsType) => {
//
//     const dispatch = useAppDispatch()
//
//     const [name, setName] = useState(props.name)
//
//     const editPackHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         setName(e.currentTarget.value)
//     }
//
//     return (
//         <BasicModal childrenTitle={<h4>Edit pack</h4>}>
//             {(cb) => (
//                 const cardsPack: UpdatePackType = {props._id, name}
//                 dispatch(updatePackTC(cardsPack))
//                         cb()
//                                 <InputLabel>Name pack</InputLabel>
//                                 <Input className={auth.input} name="name"
//                                        value={name} onChange={editPackHandler}/>
//                                 <FormControlLabel className={auth.remMe} label={'Private pack'} name="private"
//                                                   control={<Checkbox/>}/>
//                                 <Button type={'submit'} variant={'contained'} color={'primary'}>Save</Button>
//                     )}
//                 )}
//         </BasicModal>
//
//     );
// }
//
