import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'

import {configureStore} from '@reduxjs/toolkit'

import {dataService} from './data-service.ts'

export const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(dataService.middleware),
    reducer: {
        [dataService.reducerPath]: dataService.reducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
