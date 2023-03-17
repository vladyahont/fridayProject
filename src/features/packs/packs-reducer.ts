import {CardPackType, GetPackParamType, packsApi, PacksResponseType} from "./packs-api";
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
        case "PACKS/ADD-NEW-PACK":
            return {...state, ...action.payload.data}
        case "PACKS/DELETE-PACK":
            return {...state, cardPacks: state.cardPacks.filter(p => p._id !== action.payload.id)}
       /* case "PACKS/UPDATE-PACK":
            return {...state, cardPacks: state.cardPacks.map(p => p._id === action.payload._id
                ? {...p, name: action.payload.name} : p)}*/
        default:
            return state
    }
}

export type PacksActionsType = GetPacksACType | AddNewPackACType | DeletePackACType | UpdatePackACType
type GetPacksACType = ReturnType<typeof getPacksAC>
type AddNewPackACType = ReturnType<typeof addNewPackAC>
type DeletePackACType = ReturnType<typeof deletePackAC>
type UpdatePackACType = ReturnType<typeof updatePackAC>

export const getPacksAC = (data: PacksResponseType) => {
    return {
        type: 'PACKS/GET-PACKS',
        payload: {
            data
        }
    } as const
}
export const addNewPackAC = (data: PacksResponseType) => {
    return {
        type: 'PACKS/ADD-NEW-PACK',
        payload: {
            data
        }
    } as const
}
export const deletePackAC = (id: string) => {
    return {
        type: 'PACKS/DELETE-PACK',
        payload: {
            id
        }
    } as const
}
export const updatePackAC = (_id: string, name?: string) => {
    return {
        type: 'PACKS/UPDATE-PACK',
        payload: {
            _id,
            name
        }
    } as const
}



export const getPacksTC = (params:GetPackParamType): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsApi.getPacks(params)
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
export const addPackTC = (name: string, deckCover?: string): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsApi.addPack(name, deckCover)
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
export const updatePackTC = (_id: string, name?: string): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsApi.updatePack(_id, name)
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
