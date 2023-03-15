import {instance} from '../../app/instance'
import {AxiosRequestConfig} from "axios";

export const packsApi = {
    getPacks(user_id?: string, page: number = 1, pageCount: number = 100, packName?: string,
             min?: number, max?: number, sortPacks?: string) {
        return instance.get<PacksResponseType>('cards/pack', {
                params: {
                    user_id,
                    page,
                    pageCount,
                    packName,
                    min,
                    max,
                    sortPacks
                }
            }
        )
    },
    addPack(name: string, deckCover?: string) {
        return instance.post<any>('cards/pack', {
            cardsPack: {
                name,
                deckCover
            }
        })
    },
    deletePack(id?: AxiosRequestConfig<any>) {
        return instance.delete<any>('cards/pack', id)

    },
    updatePack(_id: string, name?: string) {
        return instance.put<any>('cards/pack', {
            cardsPack: {
                _id,
                name
            }
        })
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
// data:
//   newCardsPack:
//     cardsCount:0
//     created:"2023-03-15T18:33:58.275Z"
//     grade:0
//     more_id:"640a57dbb8230638104d84e5"
//     name:"$newPack$"
//     path:"/def"
//     private:false
//     rating:0
//     shots:0
//     type:"pack"
//     updated:"2023-03-15T18:33:58.275Z"
//     user_id:"640a57dbb8230638104d84e5"
//     user_name:"vlad"
//     __v:0
//     _id:"64120f96f979e2103b2aa822"
//
// token: "f2cf6160-c35f-11ed-9e9f-b5a360890d21"
// tokenDeathTime:1678916038134