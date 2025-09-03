import { createSlice } from "@reduxjs/toolkit";

export const servicesSlice = createSlice({
  name: "services",
  initialState: {
    selectedServices: [],
    serviceCharges: {},
    totalCharges: 0, // For individual service charges
    totalCost: 0, // For overall total cost across all services
  },
  reducers: {
    addService: (state, action) => {
      if (
        !state.selectedServices.find(
          (service) => service.id === action.payload.id
        )
      ) {
        state.selectedServices.push(action.payload);
      }
    },
    // totalCost: totalCharges;
    setServiceCharge: (state, action) => {
      const { serviceId, charges, ServiceName, totalCharges } = action.payload;

      state.serviceCharges[serviceId] = {
        ...state.serviceCharges[serviceId],
        ...charges,
        ServiceName,
        totalCharges,
      };
    },
    setTotalCharges: (state, action) => {
      state.totalCost = action.payload;
    },
    // For paid services (similar logic to above)

    removeService: (state, action) => {
      const serviceId = action.payload;
      delete state.serviceCharges[serviceId];
      state.selectedServices = state.selectedServices.filter(
        (service) => service.id !== serviceId
      );

      // Update total charges for individual services
      state.totalCharges = Object.values(state.serviceCharges).reduce(
        (total, service) =>
          total +
          Object.values(service).reduce(
            (sum, amount) => (typeof amount === "number" ? sum + amount : sum),
            0
          ),
        0
      );

      // Update overall total cost across all services
      state.totalCost = state.totalCharges;
    },
  },
});

export const {
  addService,
  setServiceCharge,
  resetServiceCharges,
  setServiceChargePaid,
  removeService,
  setTotalCharges,
} = servicesSlice.actions;

export default servicesSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// export const servicesSlice = createSlice({
//   name: "services",
//   initialState: {
//     selectedServices: [],
//     serviceCharges: {},
//     totalCharges: 0,
//   },
//   reducers: {
//     addService: (state, action) => {
//       if (
//         !state.selectedServices.find(
//           (service) => service.id === action.payload.id
//         )
//       ) {
//         state.selectedServices.push(action.payload);
//       }
//     },
//     setServiceCharge: (state, action) => {
//       const { serviceId, charges, ServiceName, totalCharges } = action.payload;
//       state.serviceCharges[serviceId] = {
//         ...state.serviceCharges[serviceId],
//         ...charges,
//         ServiceName,
//         totalCharges,
//       };

//       // Update total charges
//       state.totalCharges = Object.values(state.serviceCharges).reduce(
//         (total, charges) =>
//           total +
//           Object.values(charges).reduce((sum, amount) => sum + amount, 0),
//         0
//       );
//     },
//     // ///////////////////For paid //////
//     setServiceChargePaid: (state, action) => {
//       const { serviceId, charges, ServiceName } = action.payload;
//       state.serviceCharges[serviceId] = {
//         ...state.serviceCharges[serviceId],
//         ...charges,
//         ServiceName,
//       };

//       // Update total charges
//       state.totalCharges = Object.values(state.serviceCharges).reduce(
//         (total, charges) =>
//           total +
//           Object.values(charges).reduce((sum, amount) => sum + amount, 0),
//         0
//       );
//     },
//     resetServiceCharges: (state) => {
//       state.serviceCharges = {};
//       state.totalCharges = 0;
//     },
//     removeService: (state, action) => {
//       const serviceId = action.payload;
//       delete state.serviceCharges[serviceId];
//       state.selectedServices = state.selectedServices.filter(
//         (service) => service.id !== serviceId
//       );
//     },
//   },
// });

// export const {
//   addService,
//   setServiceCharge,
//   resetServiceCharges,
//   setServiceChargePaid,
//   removeService,
// } = servicesSlice.actions;

// export default servicesSlice.reducer;
