import { createStore } from 'redux'

import middlewares, { history, sagaMiddleware } from './middlewares'
import reducers from './reducers'
import sagas from './sagas'

const createStoreWithMiddlewares = createStore(
  reducers(history),
  middlewares
)

sagaMiddleware.run(sagas)

export type RootStore = ReturnType<typeof createStoreWithMiddlewares>

export default createStoreWithMiddlewares
