import {configureStore} from "@reduxjs/toolkit";

import appReducer from "./appSlice"

const reHydrateStore = () => {
    if (localStorage.getItem('applicationState') !== null) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return JSON.parse(localStorage.getItem('applicationState')); // re-hydrate the store
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const localStorageMiddleware = ({getState}: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (next: any) => (action: any) => {
        const result = next(action);
        localStorage.setItem('applicationState', JSON.stringify(getState()));
        return result;
    };
};
export const store = configureStore({
    reducer: {
        appState: appReducer
    },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware)
})

export type RootState = ReturnType<typeof store.getState>;