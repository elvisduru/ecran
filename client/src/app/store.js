import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import requestsReducer from "../Scenes/Requests/requestsSlice";
import screensReducer from "../Scenes/Campaigns/screensSlice";
import atmsReducer from "../Scenes/Monitoring/atmsSlice";
import activitiesReducer from "../Scenes/Auditing/activitySlice";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  requests: requestsReducer,
  screens: screensReducer,
  atms: atmsReducer,
  activities: activitiesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
