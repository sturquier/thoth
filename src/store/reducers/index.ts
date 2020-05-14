import { combineReducers } from 'redux'

const createRootReducer = combineReducers({

})

export type RootState = ReturnType<typeof createRootReducer>

export default createRootReducer
