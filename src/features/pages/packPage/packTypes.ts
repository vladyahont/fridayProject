
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
    packName: string
    user_id?: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    block: boolean;
}
export type NewPackType = {
    name?: string
    private?: boolean
    deckCover?: string
}
export type NewPackResponseType = {
    newCardsPack: NewPackType
    token: string
    tokenDeathTime?: number
}
export type UpdatePackType = {
    _id?: string
    name?: string
    deckCover?: string
}


// Cards types:
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
    packUserId: string,
    packDeckCover: string,
}
export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    questionImg:string,
    answerImg:string,
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