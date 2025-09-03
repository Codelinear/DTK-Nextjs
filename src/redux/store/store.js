"use client";
import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "../action/serviceSlice";
import formReducer from "../action/formSlice";

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    form: formReducer,
  },
});
