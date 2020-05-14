import { createStore } from 'redux'

import middlewares, { sagaMiddleware } from './middlewares'
import reducers from './reducers'
import sagas from './sagas'

const createStoreWithMiddlewares = createStore(
  reducers,
  middlewares
)

sagaMiddleware.run(sagas)

export type RootStore = ReturnType<typeof createStoreWithMiddlewares>

export default createStoreWithMiddlewares
