import {AxiosError, AxiosRequestConfig} from "axios";
import { Dispatch } from "redux";
import { setAppStatusAC } from "../../../app/app-reducer";
import { RootThunkType } from "../../../app/store";
import { errorUtils } from "../../../utils/error-utils";
import {CardPackType, packsApi, PacksResponseType} from "../packs-api";


const initialState = {
    cardPacks: [] as CardPackType[],
    cardPacksTotalCount: 0,
    // количество колод
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0, // выбранная страница
    pageCount: 0,
}
type InitialStateType = typeof initialState

export const cardsReducer = (
    state: InitialStateType = initialState,
    action: CardsActionsType
): InitialStateType => {
    switch (action.type) {
        case "PACKS/GET-PACKS":
            return state
        case "PACKS/ADD-NEW-PACK":
            return state
        case "PACKS/DELETE-PACK":
            return state
        case "PACKS/UPDATE-PACK":
            return state
        default:
            return state
    }
}

export type CardsActionsType = GetCardsACType | AddNewCardACType | DeleteCardACType | UpdateCardACType
type GetCardsACType = ReturnType<typeof getCardsAC>
type AddNewCardACType = ReturnType<typeof addNewCardAC>
type DeleteCardACType = ReturnType<typeof deleteCardAC>
type UpdateCardACType = ReturnType<typeof updateCardAC>

export const getCardsAC = (data: PacksResponseType) => {
    return {
        type: 'PACKS/GET-PACKS',
        payload: {
            data
        }
    } as const
}
export const addNewCardAC = (data: PacksResponseType) => {
    return {
        type: 'PACKS/ADD-NEW-PACK',
        payload: {
            data
        }
    } as const
}
export const deleteCardAC = (id: string) => {
    return {
        type: 'PACKS/DELETE-PACK',
        payload: {
            id
        }
    } as const
}
export const updateCardAC = (_id: string, question?: string) => {
    return {
        type: 'PACKS/UPDATE-PACK',
        payload: {
            _id,
            question
        }
    } as const
}


export const getCardsTC = (cardAnswer?: string, cardQuestion?: string, cardsPack_id?: string, min?: string, max?: string,
                           sortCards?: string, page?: number, pageCount?: number): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsApi.getCards(cardAnswer, cardQuestion, cardsPack_id, min, max, sortCards, page, pageCount)
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

export const addCardTC = (cardsPack_id: string, question?: string, answer?: string, grade?: number, shots?: number, answerImg?: string,
                          questionImg?: string, questionVideo?: string, answerVideo?: string): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsApi.addCard(cardsPack_id, question, answer, grade, shots, answerImg, questionImg, questionVideo, answerVideo)
        console.log(res)
        dispatch(getCardsAC(res.data))
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
export const deleteCardTC = (id: AxiosRequestConfig<any>): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsApi.deleteCard(id)
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
export const updateCardTC = (_id: string, question?: string): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsApi.updateCard(_id, question)
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