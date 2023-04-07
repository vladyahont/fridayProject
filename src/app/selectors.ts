import {AppStateType} from './store'

/* --- App-reducer selectors --- */
export const appStatusSelector = (state: AppStateType) => state.app.appStatus
export const isInitializedSelector = (state: AppStateType) => state.app.isInitialized
export const appErrorSelector = (state: AppStateType) => state.app.appError

/* --- Auth-reducer selectors --- */
export const isRegisteredSelector = (state: AppStateType) => state.auth.isRegistered
export const isSentInstructionSelector = (state: AppStateType) => state.auth.isSentInstruction
export const isLoggedInSelector = (state: AppStateType) => state.auth.isLoggedIn
export const userNameSelector = (state: AppStateType) => state.auth.name
export const userAvatarSelector = (state: AppStateType) => state.auth.avatar
export const userEmailSelector = (state: AppStateType) => state.auth.email
export const userIdSelector = (state: AppStateType) => state.auth._id

/* --- Packs-reducer selector --- */
export const packsSelector = (state: AppStateType) => state.packs.cardPacks
export const minCardsCountSelector = (state: AppStateType) => state.packs.minCardsCount
export const maxCardsCountSelector =(state: AppStateType) => state.packs.maxCardsCount
export const cardPacksTotalCountSelector =(state: AppStateType) => state.packs.cardPacksTotalCount


/* --- Params-Pack-selector --- */

export const getParamsSelector =(state: AppStateType) => state.packs.params;
export const getMinParamsSelector =(state: AppStateType) => state.packs.params.min;
export const getMaxParamsSelector =(state: AppStateType) => state.packs.params.max;
export const getPageCountParamsSelector =(state: AppStateType) => state.packs.params.pageCount;

export const getSortPacksParamsSelector =(state: AppStateType) => state.packs.params.sortPacks;
export const getPackNameParamsSelector =(state: AppStateType) => state.packs.params.packName;
export const getPageParamsSelector =(state: AppStateType) => state.packs.params.page;
export const getUserIdParamsSelector =(state: AppStateType) => state.packs.params.user_id;
/* --- Params-Cards-selector --- */
export const getCardsPack_idParamsSelector =(state: AppStateType) => state.cards.params.cardsPack_id;
export const getSortCardsParamsSelector =(state: AppStateType) => state.cards.params.sortCards;
export const getCardsPageCountParamsSelector =(state: AppStateType) => state.cards.params.pageCount;
export const getCardsPageParamsSelector =(state: AppStateType) => state.cards.params.page;
export const getCardQuestionParamsSelector =(state: AppStateType) => state.cards.params.cardQuestion;
/* --- Cards-selector --- */
export const packUserIdSelector =(state: AppStateType) => state.cards.packUserId;
export const packNameSelector =(state: AppStateType) => state.cards.packName;
export const cardsSelector =(state: AppStateType) => state.cards.cards;
export const cardsTotalCountSelector =(state: AppStateType) => state.cards.cardsTotalCount;
export const cardsPageCountSelector =(state: AppStateType) => state.cards.pageCount;
export const cardsPageSelector =(state: AppStateType) => state.cards.page;
