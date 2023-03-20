import {instance} from '../../app/instance'
import {AxiosRequestConfig} from "axios";

export const packsApi = {
    getPacks(params: PacksParamsType) {
        return instance.get<PacksResponseType>('cards/pack', {params}
        )
    },
    addPack(cardsPack: NewPackType) {
        return instance.post<NewPackResponseType>('cards/pack', {cardsPack})
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack/${id}`)

    },
    updatePack(cardsPack: UpdatePackType) {
        return instance.put<any>('cards/pack', {cardsPack})
    },


    getCards(cardAnswer?: string, cardQuestion?: string, cardsPack_id?: string, min?: string, max?: string,
             sortCards?: string, page?: number, pageCount?: number) {
        return instance.get('cards/card', {
            params: {
                cardAnswer,
                cardQuestion,
                cardsPack_id,
                min,
                max,
                sortCards,
                page,
                pageCount
            }
        })
    },
    addCard(cardsPack_id: string, question?: string, answer?: string, grade?: number, shots?: number,
            answerImg?: string, questionImg?: string, questionVideo?: string, answerVideo?: string) {
        return instance.post<any>('cards/card', {
            card: {
                cardsPack_id,
                question,
                answer,
                grade,
                shots,
                answerImg, questionImg, questionVideo, answerVideo
            }
        })
    },
    deleteCard(id?: AxiosRequestConfig<any>) {
        return instance.delete<any>('cards/card', id)

    },
    updateCard(_id: string, question?: string) {
        return instance.put<any>('cards/card', {
            card: {
                _id,
                question
            }
        })
    },

}

export type CardPackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
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
    packName: string
    user_id: string
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
