import {instance} from '../../app/instance'

export const packsApi = {
    getPacks(user_id?: string) {
        return instance.get('cards/pack', {
                params: {
                    user_id
                },}
        )},
}

export type CardPackType = {
    _id: string
    user_id: string
    user_name: string
    private?: boolean
    name: string
    path?: string
    grade?: number
    shots?: number
    deckCover?: string
    cardsCount: number
    type?: string
    rating?: number
    created: string
    updated: string
    more_id?: string
    __v?: number
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