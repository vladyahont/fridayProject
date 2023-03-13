import {CardPackType, packsApi} from "./packs-api";
import {RootThunkType} from "../../app/store";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
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
            return {...state, cardPacks: action.payload.cardPacks}
        default:
            return state
    }
}

export type PacksActionsType = getPacksACType
type getPacksACType = ReturnType<typeof getPacksAC>

export const getPacksAC = (cardPacks: CardPackType[]) => {
    return {
        type: 'PACKS/GET-PACKS',
        payload: {
            cardPacks
        }
    } as const
}

export const getPacksTC = (user_id?: string): RootThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await packsApi.getPacks(user_id)
        console.log(res.data)
        const {cardPacks} = res.data
        console.log(cardPacks)
        dispatch(getPacksAC(cardPacks))
        dispatch(setAppStatusAC('succeeded'))
    } catch (err: unknown) {
        dispatch(setAppStatusAC('failed'))
        console.log(err)
        if (err instanceof AxiosError) {
            if (err.response) {
                errorUtils(err.response.data.error, dispatch)
            }
        }
    }
}