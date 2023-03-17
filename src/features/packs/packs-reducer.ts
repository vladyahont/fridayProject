import {CardPackType, packsApi, PacksResponseType} from "./packs-api";
import {RootThunkType} from "../../app/store";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {errorUtils} from "../../utils/error-utils";

const initialState = {
    page: 0, // выбранная страница
    pageCount: 0,
    cardPacks: [] as CardPackType[],
    cardPacksTotalCount: 0, // количество колод
    user_id: '',
    packName: '' as string | undefined,
    minCardsCount: 0,
    maxCardsCount: 10,
    sortPacks: '',
    token: "17068f10-c435-11ed-a069-451961f5e465",
    tokenDeathTime: 1679007581697

}
type InitialStateType = typeof initialState

export const packsReducer = (
    state: InitialStateType = initialState,
    action: PacksActionsType
): InitialStateType => {
    switch (action.type) {
        case "PACKS/GET-PACKS":
            return {...action.payload.data, user_id: action.payload.data.cardPacks[0].user_id,
                packName: action.payload.data.cardPacks[0].name, sortPacks: action.payload.data.cardPacks[0].created}
        case "PACKS/ADD-NEW-PACK":
            return {...state, ...action.payload.data}
        case "PACKS/DELETE-PACK":
            return {...state, cardPacks: state.cardPacks.filter(p => p._id !== action.payload.id)}
        case "PACKS/UPDATE-PACK":
            return {
                ...state, cardPacks: state.cardPacks.map(p => p._id === action.payload._id
                    ? {...p, name: action.payload.name} : p)
            }
        case "PACKS/SEARCH-PACK":
            return state
        default:
            return state
    }
}

export type PacksActionsType = GetPacksACType | AddNewPackACType | DeletePackACType | UpdatePackACType | SearchPackACType
type GetPacksACType = ReturnType<typeof getPacksAC>
type AddNewPackACType = ReturnType<typeof addNewPackAC>
type DeletePackACType = ReturnType<typeof deletePackAC>
type UpdatePackACType = ReturnType<typeof updatePackAC>
type SearchPackACType = ReturnType<typeof searchPackAC>

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
export const searchPackAC = (packName: string) => {
    return {
        type: 'PACKS/SEARCH-PACK',
        payload: {
            packName
        }
    } as const
}


export const getPacksTC = (myID?: string): RootThunkType => async (dispatch: Dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const params = getState().packs
        const res = await packsApi.getPacks({...params})
        console.log(res.data)
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
        // @ts-ignore
        dispatch(getPacksTC())
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
export const deletePackTC = (id: string): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await packsApi.deletePack(id)
        // @ts-ignore
        dispatch(getPacksTC())
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
        await packsApi.updatePack(_id, name)
        // @ts-ignore
        dispatch(getPacksTC())
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


