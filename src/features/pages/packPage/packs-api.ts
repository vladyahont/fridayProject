import {instance} from 'app/instance'
import {NewPackResponseType, NewPackType, PacksParamsType, PacksResponseType, UpdatePackType} from "./packTypes";

export const packsApi = {
    getPacks(params: PacksParamsType) {
        return instance.get<PacksResponseType>('cards/pack', {params})
    },
    addPack(cardsPack: NewPackType) {
        return instance.post<NewPackResponseType>('cards/pack', {cardsPack})
    },
    deletePack(id: string) {
        console.log(id)
        return instance.delete(`cards/pack/?id=${id}`)
    },
    updatePack(cardsPack: UpdatePackType) {
        return instance.put<any>('cards/pack', {cardsPack})
    }
}


