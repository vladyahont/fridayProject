import {CardPackType, PacksParamsType, packsApi, PacksResponseType, NewPackType, UpdatePackType} from "./packs-api";
import {RootThunkType} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {errorUtils} from "../../utils/error-utils";

const initialState = {
    cardPacks: [] as CardPackType[],
    params: {
        packName: '',
        user_id: '' ,
        min: 0,
        max: 0,
        sortPacks: '',
        page: 1,
        pageCount: 10,
        block: false
    } as PacksParamsType,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 10,

}
type InitialStateType = typeof initialState

export const packsReducer = (
    state: InitialStateType = initialState,
    action: PacksActionsType
): InitialStateType => {
    switch (action.type) {
        case "PACKS/GET-PACKS":
            return {...state, ...action.payload.data}
        case "PACKS/SEARCH-PACK":
            return {...state, params: {...state.params, ...action.payload}}
        case "PACKS/CHANGE-MINMAX-PACK":
            return {...state, params: { ...state.params ,min: action.payload.minCardsCount, max: action.payload.maxCardsCount}}
        default:
            return state
    }
}

export type PacksActionsType = GetPacksACType | SearchPackACType
| ChangeMinMaxCount
type GetPacksACType = ReturnType<typeof getPacksAC>
type SearchPackACType = ReturnType<typeof searchPackAC>
type ChangeMinMaxCount = ReturnType<typeof changeMinMaxCountAC>
type ChangePackParam = {
    packName?: string,
    user_id?: string,
    page?: number,
    pageCount?: number
}

export const getPacksAC = (data: PacksResponseType) => ({type: 'PACKS/GET-PACKS', payload: {data}} as const)
export const searchPackAC = (param: ChangePackParam) => ({type: 'PACKS/SEARCH-PACK', payload: {...param}} as const)
export const changeMinMaxCountAC = (minCardsCount: number, maxCardsCount: number) => ({type: 'PACKS/CHANGE-MINMAX-PACK', payload: {minCardsCount, maxCardsCount}} as const)


export const getPacksTC = (): RootThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    const params = getState().packs.params
    try {
        const res = await packsApi.getPacks(params)
        dispatch(getPacksAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(getPacksAC(res.data))
    } catch (err: unknown) {
        dispatch(setAppStatusAC('failed'))
        if (err instanceof AxiosError) {
            if (err.response) {
                errorUtils(err.response.data.error, dispatch)
            }
        }
    }
}
// export const getPackssTC = (params:PacksParamsType): RootThunkType => async (dispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     try {
//         const res = await packsApi.getPacks(params)
//         dispatch(getPacksAC(res.data))
//         dispatch(setAppStatusAC('succeeded'))
//     } catch (err: unknown) {
//         dispatch(setAppStatusAC('failed'))
//         if (err instanceof AxiosError) {
//             if (err.response) {
//                 errorUtils(err.response.data.error, dispatch)
//             }
//         }
//     }
// }
export const addPackTC = (cardsPack: NewPackType): RootThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await packsApi.addPack(cardsPack)
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
export const deletePackTC = (id: string): RootThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await packsApi.deletePack(id)
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
export const updatePackTC = (cardsPack: UpdatePackType): RootThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await packsApi.updatePack(cardsPack)
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
