import {CardPackType, packsApi, PacksResponseType} from "./packs-api";
import {RootThunkType} from "../../app/store";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {AxiosError, AxiosResponse} from "axios";
import {errorUtils} from "../../utils/error-utils";

const initialState = {
    cardPacks: [] as CardPackType[],
    cardPacksTotalCount: 14,
    // количество колод
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1, // выбранная страница
    pageCount: 4,
}
type InitialStateType = typeof initialState

export const packsReducer = (
    state: InitialStateType = initialState,
    action: PacksActionsType
): InitialStateType => {
    switch (action.type) {
        case "PACKS/GET-PACKS":
            debugger
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

export const getPacksTC = (user_id?: string): RootThunkType =>
        (dispatch: Dispatch) => {
            dispatch(setAppStatusAC('loading'))
            packsApi.getPacks(user_id)
                .then((res) => {
                    const {cardPacks} = res.data
                    dispatch(getPacksAC(cardPacks))
                    dispatch(setAppStatusAC('succeeded'))
                }).catch((err: AxiosError<{ error: string }>) => {
                errorUtils(err, dispatch);
            })
        }