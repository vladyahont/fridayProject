import {CardsType} from "../packPage/packTypes";
import {RootThunkType} from "../../../app/store";
import {setAppStatusAC} from "../../../app/app-reducer";
import {errorUtils} from "../../../utils/error-utils";
import {learnAPI} from "./learn-api";
import {UpdateGradeRequestType} from "./learnType";
import {AxiosError} from "axios";

const initialState = {
  learnCards: [] as CardsType[],
  learnCard: {} as CardsType,
}

type InitialStateType = typeof initialState
export const learnReducer = (
  state: InitialStateType = initialState,
  action: LearnActionsType
): InitialStateType => {
  switch (action.type) {
    case 'LEARN/SET-LEARN-CARDS':
      return {...state, learnCards: {...action.payload.data}}
    case 'LEARN/SET-LEARN-CARD':
      return {...state, ...action.payload.data}
    default:
      return state
  }
}

export type LearnActionsType = SetLearnCardsAT | SetLearnCardAT

type SetLearnCardsAT = ReturnType<typeof setLearnCardsAC>
type SetLearnCardAT = ReturnType<typeof setLearnCardAC>
export const setLearnCardsAC = (data: CardsType[]) => ({type: 'LEARN/SET-LEARN-CARDS', payload: {data}} as const)
export const setLearnCardAC = (data: CardsType) => ({type: 'LEARN/SET-LEARN-CARD', payload: {data}} as const)
export const updateGradeTC = (data:UpdateGradeRequestType): RootThunkType => async (dispatch, getState) => {
  dispatch(setAppStatusAC('loading'))
  const learnCards = getState().learn.learnCards
  try {
    const res = await learnAPI.updateGrade({...data})
    //обновить grade текущей карты в колоде
    //задиспачить новую рандомную карту

    dispatch(setAppStatusAC('succeeded'))
  } catch (err: unknown) {
    dispatch(setAppStatusAC('failed'))
    if (err instanceof AxiosError) {
      if (err.response) {
        errorUtils(err.response.data.error, dispatch)
      }
    }
  }
}
