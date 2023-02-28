
const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState
type ActionsType = {type: string}
export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default: return state
    }
}
