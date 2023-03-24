import {instance} from 'app/instance'
import {NewPackResponseType, NewPackType, PacksParamsType, PacksResponseType, UpdatePackType} from "features/packs/packTypes";

export const packsApi = {
    getPacks(params: PacksParamsType) {
        return instance.get<PacksResponseType>('cards/pack', {params})
    },
    addPack(cardsPack: NewPackType) {
        return instance.post<NewPackResponseType>('cards/pack', {cardsPack})
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack/${id}`)
    },
    updatePack(cardsPack: UpdatePackType) {
        return instance.put<any>('cards/pack', {cardsPack})
    }
}


