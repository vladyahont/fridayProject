import {instance} from "app/instance";
import {CardParamsType, CardRequestType, CardsResponseType, UpdateCardType} from "features/packs/packTypes";

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