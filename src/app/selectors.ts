/* //===========example=========


// примитивный селектор
const getItems = (state) => state.items

// только оплаченные элементы
// createSelector мемоизирующий метод
const paidItems = createSelector(
  getItems,
  items => items.filter(filters.onlyPaid)
)

// только оплаченная сумма
const paidAmount = createSelector(
  paidItems,
  items => items.reduce(reducers.total, 0)
)

// общая сумма покупок
const totalAmount = createSelector(
  getItems,
  items => items.reduce(reducers.total, 0)
)
*/
import { AppStateType } from './store'

/* --- App-reducer selectors --- */
export const appStatusSelector = (state: AppStateType) => state.app.appStatus
export const isInitializedSelector = (state: AppStateType) => state.app.isInitialized

/* --- Auth-reducer selectors --- */
export const isRegisteredSelector = (state: AppStateType) => state.auth.isRegistered
export const isLoggedInSelector = (state: AppStateType) => state.auth.isLoggedIn
export const userIdSelector = (state: AppStateType) => state.auth._id
export const userNameSelector = (state: AppStateType) => state.auth.name
export const userAvatarSelector = (state: AppStateType) => state.auth.avatar
export const userEmailSelector = (state: AppStateType) => state.auth.email
export const publicCardPacksCountSelector = (state: AppStateType) => state.auth.publicCardPacksCount
export const isAdminSelector = (state: AppStateType) => state.auth.isAdmin

/* --- Packs-reducer selector --- */
export const packsSelector = (state: AppStateType) => state.packs.cardPacks