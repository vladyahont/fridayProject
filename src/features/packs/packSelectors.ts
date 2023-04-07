
import {AppStateType} from "../../app/store";

export const packsSelector = (state: AppStateType) => state.packs.cardPacks
export const minCardsCountSelector = (state: AppStateType) => state.packs.minCardsCount
export const maxCardsCountSelector =(state: AppStateType) => state.packs.maxCardsCount
export const cardPacksTotalCountSelector =(state: AppStateType) => state.packs.cardPacksTotalCount


export const packMinParamsSelector =(state: AppStateType) => state.packs.params.min;
export const packMaxParamsSelector =(state: AppStateType) => state.packs.params.max;
export const packPageCountParamsSelector =(state: AppStateType) => state.packs.params.pageCount;
export const packSortParamsSelector =(state: AppStateType) => state.packs.params.sortPacks;
export const packNameParamsSelector =(state: AppStateType) => state.packs.params.packName;
export const pageParamsSelector =(state: AppStateType) => state.packs.params.page;
export const userIdParamsSelector =(state: AppStateType) => state.packs.params.user_id;
