

import { combineReducers, configureStore } from "@reduxjs/toolkit"
import ServiceReducer from "./service_details/ServiceSlide"
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from 'react-redux';

export const store = configureStore(({
  reducer: {
    serviceReducer: ServiceReducer
  }
}))

const rootReducer = combineReducers({
  serviceReducer: ServiceReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;