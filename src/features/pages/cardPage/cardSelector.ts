import {AppStateType} from "../../../app/store";
export const cardPackIDParamsSelector =(state: AppStateType) => state.cards.params.cardsPack_id;
export const cardSortParamsSelector =(state: AppStateType) => state.cards.params.sortCards;
export const cardPageCountParamsSelector =(state: AppStateType) => state.cards.params.pageCount;
export const cardPageParamsSelector =(state: AppStateType) => state.cards.params.page;
export const cardQuestionParamsSelector =(state: AppStateType) => state.cards.params.cardQuestion;
export const packUserIdSelector =(state: AppStateType) => state.cards.packUserId;
export const packNameSelector =(state: AppStateType) => state.cards.packName;
export const cardsSelector =(state: AppStateType) => state.cards.cards;
export const packDeckCoverSelector =(state: AppStateType) => state.cards.packDeckCover;
export const cardTotalCountSelector =(state: AppStateType) => state.cards.cardsTotalCount;
export const cardPageCountSelector =(state: AppStateType) => state.cards.pageCount;
export const cardPageSelector =(state: AppStateType) => state.cards.page;
