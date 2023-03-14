import {CardPackType, packsApi, PacksResponseType} from "./packs-api";
import {RootThunkType} from "../../app/store";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {AxiosError, AxiosRequestConfig} from "axios";
import {errorUtils} from "../../utils/error-utils";

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

export const packsReducer = (
    state: InitialStateType = initialState,
    action: PacksActionsType
): InitialStateType => {
    switch (action.type) {
        case "PACKS/GET-PACKS":
            return {...action.payload.data, cardPacks: action.payload.data.cardPacks}
        default:
            return state
    }
}

export type PacksActionsType = getPacksACType
type getPacksACType = ReturnType<typeof getPacksAC>

export const getPacksAC = (data: PacksResponseType) => {
    return {
        type: 'PACKS/GET-PACKS',
        payload: {
            data
        }
    } as const
}

export const getPacksTC = (user_id?: string, page?: number, pageCount?: number, packName?: string,
                           min?: number, max?: number,  sortPacks?: string): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsApi.getPacks(user_id, page, pageCount, packName, min, max, sortPacks)
        dispatch(getPacksAC(res.data))
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
export const addPackTC = (name: string): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsApi.addPack(name)
        console.log(res)
        dispatch(getPacksAC(res.data))
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
export const deletePackTC = (id: AxiosRequestConfig<any>): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsApi.deletePack(id)
        dispatch(getPacksAC(res.data))
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
export const updatePackTC = (_id: string): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsApi.updatePack(_id)
        dispatch(getPacksAC(res.data))
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



export const getCardsTC = (cardAnswer?: string, cardQuestion?: string, cardsPack_id?: string, min?: string, max?: string,
                           sortCards?: string, page?: number, pageCount?: number): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsApi.getCards(cardAnswer, cardQuestion, cardsPack_id, min, max, sortCards, page, pageCount)
        dispatch(getPacksAC(res.data))
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
        dispatch(getPacksAC(res.data))
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
        dispatch(getPacksAC(res.data))
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
        dispatch(getPacksAC(res.data))
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