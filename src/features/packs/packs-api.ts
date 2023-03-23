import {instance} from 'app/instance'

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




export type CardPackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string | undefined
    path: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}
export type PacksResponseType = {
    cardPacks: CardPackType[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
    tokenDeathTime: number;
}
export type PacksParamsType = {
    packName?: string
    user_id?: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    block: boolean;
}
export type NewPackType = {
    name: string
    private: boolean
    deckCover?: string
}
export type NewPackResponseType = {
    newCardsPack: NewPackType
    token: string
    tokenDeathTime?: number
}
export type UpdatePackType = {
    _id: string
    name: string
}
