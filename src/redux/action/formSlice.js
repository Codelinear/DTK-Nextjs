// src/redux/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyName: "",
  companySize: "",
  companyType: "",
  email: "",
  services: [], // array of selected services
  totalCost: 0,
  undercharging: 0,
  averagePrice: 0,
  overcharging: 0,
  ourCost: 0,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setField: (state, action) => {
      // action.payload = { key: "companyName", value: "ABC Corp" }
      state[action.payload.key] = action.payload.value;
    },
    addService: (state, action) => {
      state.services.push(action.payload); // {name, cost, ...}
    },
    setServices: (state, action) => {
      state.services = action.payload; // replace whole array
    },
  },
});

export const { setField, addService, setServices } = formSlice.actions;
export default formSlice.reducer;
