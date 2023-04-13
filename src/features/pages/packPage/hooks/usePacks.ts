import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {addPackTC, deletePackTC, updatePackTC} from "../packs-reducer";
import {NewPackType, UpdatePackType} from "../packTypes";
import {packsSelector} from "../packSelectors";

export const usePacks = () => {
  const dispatch = useAppDispatch()
  const packs = useAppSelector(packsSelector)

  const removePack = (_id: string) => {
    return () => dispatch(deletePackTC(_id))
  }
  const editPack = (_id: string, deckCover?: string) => {
    return (data: UpdatePackType) => {
      dispatch(
        updatePackTC({...data, _id, deckCover}
        )
      )
    }
  }
  const addPack = (deckCover?: string) => {
    return (data: NewPackType) => {
      dispatch(
        addPackTC({...data, deckCover}
        )
      )
    }
  }
  return {
      packs,
      removePack,
      editPack,
      addPack,
    }
};
