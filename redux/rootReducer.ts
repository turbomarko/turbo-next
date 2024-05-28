import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import api from './api';
import auth from './auth';
import ui from './ui';

export const config = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  timeout: 10000
};

const rootReducer = persistCombineReducers(config, {
  [api.reducerPath]: api.reducer,
  auth,
  ui,
});

export default rootReducer;
