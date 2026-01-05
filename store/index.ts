import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import propertySlice from "./slices/propertySlice";
import authSlice from "./slices/authSlice";

// Persist config for auth slice
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "userInfo", "isAuthenticated", "hasSeenOnboarding"],
};

// Create persisted auth reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

const store = configureStore({
  reducer: {
    property: propertySlice,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };



// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import propertySlice from "./slices/propertySlice";
// import authSlice from "./slices/authSlice";
// import { errorToastMiddleware } from "./middleware/errorToastMiddleware";

// // Persist config for auth slice...
// const authPersistConfig = {
//   key: "auth",
//   storage,
//   // Only persist these fields
//   whitelist: ["token", "userInfo", "isAuthenticated", "hasSeenOnboarding"],
// };

// // Create persisted auth reducer
// const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

// const store = configureStore({
//   reducer: {
//     property: propertySlice,
//     auth: persistedAuthReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           "persist/PERSIST",
//           "persist/REHYDRATE",
//           "persist/PURGE",
//           "persist/REGISTER",
//         ],
//       },
//     }).concat(errorToastMiddleware),
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export { store };
