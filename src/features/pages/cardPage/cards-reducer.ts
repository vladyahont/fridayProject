import {AxiosError} from "axios";
import { setAppStatusAC } from "app/app-reducer";
import { RootThunkType } from "app/store";
import { errorUtils } from "utils/error-utils";
import {cardsApi} from "./cards-api";
import {CardParamsType, CardRequestType, CardsResponseType, CardsType, UpdateCardType} from "../packPage/packTypes";




const initialState = {
    cards: [] as CardsType[],
    params: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        sortCards: '0updated',
        page: 0,
        pageCount: 5,
    } as CardParamsType,
    cardsTotalCount: 3,
    maxGrade: 5,
    minGrade: 1,
    page: 1,
    pageCount: 4,
    packUserId: '',
    question: '',
    answer: '',
    packName: '',
    packDeckCover: '',
}
export type CardsInitialStateType = typeof initialState


export const cardsReducer = (
    state: CardsInitialStateType = initialState,
    action: CardsActionsType
): CardsInitialStateType => {
    switch (action.type) {
        case 'CARDS/GET-CARDS':
            return {...state, ...action.payload}
        case "CARDS/UPDATE-CARD":
            return state
        case "CARDS/SET-PARAMS":

          return {...state, params: {...state.params, ...action.payload}}
        default:
            return state
    }
}

export type CardsActionsType = GetCardsACType | UpdateCardACType|SetSearchParamsCardsACType
type GetCardsACType = ReturnType<typeof getCardsAC>
type UpdateCardACType = ReturnType<typeof updateCardAC>
type SetSearchParamsCardsACType = ReturnType<typeof searchCardsAC>
type ChangeCardParam = {
    cardAnswer?: string,
    cardQuestion?: string,
    cardsPack_id?: string,

    sortCards?: string,
    page?: number,
    pageCount?: number,
}

export const getCardsAC = (data: CardsResponseType ) => ({type: 'CARDS/GET-CARDS', payload: data} as const)
export const searchCardsAC = (data: ChangeCardParam ) => ({type: "CARDS/SET-PARAMS", payload: data} as const)
export const updateCardAC = () => ({type: 'CARDS/UPDATE-CARD', payload: {}}as const)


export const getCardsTC = ({cardsPack_id}:{cardsPack_id:string}): RootThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const params = getState().cards.params
        const res = await cardsApi.getCards({...params,cardsPack_id})
        dispatch(getCardsAC(res.data))
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

export const addCardTC = (card: CardRequestType): RootThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsApi.addCard(card)
        const cardsPack_id = getState().cards.params.cardsPack_id
        dispatch(getCardsTC({cardsPack_id}))
        dispatch(setAppStatusAC('succeeded'))
    } catch (err: unknown) {
        console.log(err)
        dispatch(setAppStatusAC('failed'))
        if (err instanceof AxiosError) {
            if (err.response) {
                errorUtils(err.response.data.error, dispatch)
            }
        }
    }
}
export const deleteCardTC = (id: string): RootThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsApi.deleteCard(id)

        const cardsPack_id = getState().cards.params.cardsPack_id
        dispatch(getCardsTC({cardsPack_id}))
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
export const updateCardTC = (card: UpdateCardType): RootThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsApi.updateCard(card)
        const cardsPack_id = getState().cards.params.cardsPack_id
        dispatch(getCardsTC({cardsPack_id}))
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