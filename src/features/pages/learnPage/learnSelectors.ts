import {AppStateType} from "../../../app/store";

export const learnCardsSelector = (state: AppStateType) => state.learn.learnCards;
export const learnCardSelector = (state: AppStateType) => state.learn.learnCard;
