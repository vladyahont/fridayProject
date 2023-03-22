import {instance} from "../../../app/instance";

export const cardsApi = {
    getCards(params: CardParamsType) {
        return instance.get<CardsResponseType>('cards/card', {params})
    },
    addCard(card: CardRequestType) {
        return instance.post('cards/card', {card})
    },
    deleteCard(id: string) {
        return instance.delete(`cards/card/${id}`)
    },
    updateCard(card: UpdateCardType) {
        return instance.put<any>('cards/card', {card})
    }
}

export type CardParamsType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
    sortCards: string
    page: number
    pageCount: number
}
export type CardsResponseType = {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}
export type CardRequestType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}
export type UpdateCardType = {
    _id: string
    question?: string
}