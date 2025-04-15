import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './features/orders/ordersSlice';
import pivotConfigReducer from './features/pivotConfig/pivotConfigSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    ordersReducer: ordersReducer.reducer,
    pivotConfig: pivotConfigReducer.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
