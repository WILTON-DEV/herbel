import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  editProperty,
  fetchProperties,
  fetchProperty,
  fetchPropertyContracts,
  fetchPropertyOwner,
} from "../actions/propertyActions";
import { Property, PropertyFilters, PropertyState } from "@/types/schemas";
const initialState: PropertyState = {
  properties: [],
  propertyContracts: [],
  currentProperty: {
    id: undefined,
    title: "",
    description: "",
    propertyType: "RESIDENTIAL",
    propertyCategory: "OTHER",
    otherPropertyType: "",
    leaseType: "FOR_RENT",
    propertySize: 0,
    rating: 0,
    price: 0,
    ownerId: "",
    latitude: 0,
    longitude: 0,
    country: "Uganda",
    district: "Kampala",
    city: "",
    street: "",
    address: "",
    images: [],
    video: undefined,
    documents: [],
    bedrooms: 0,
    bathrooms: 0,
    garage: false,
    kitchen: false,
    livingRoom: false,
    furnished: false,
    balcony: false,
    floorsStories: 0,
    pool: false,
    garden: false,
    internet: false,
    airConditioning: false,
    gym: false,
    security: false,
    elevator: false,
    electricity: false,
    water: false,
    maxTenants: 1,
    petsAllowed: false,
    smokingAllowed: false,
    wifi: false,
    status: "AVAILABLE", // matches PropertyStatusEnum
    servicesAllowed: false,
    rentManagement: false,
    ownershipDuration: "LONG_TERM",
    verified: false,
    location: undefined,
    isVerified: false,
    noOfUnits: 1,
    noOfAvailableUnits: 0,
    rentalPeriod: "MONTH",
    createdAt: undefined,
    updatedAt: undefined,
    otherRules: [],
    numberOfBedrooms: 0,
    numberOfBeds: 0,
    _count: {},
  },
  propertyOwnerDetails: null,
  isLoading: false,
  error: null,
  editSteps: "basic",
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  filters: {
    search: undefined,
    city: undefined,
    street: undefined,
    propertyType: undefined,
    propertyCategory: undefined,
    leaseType: undefined,
    propertySizeUnit: undefined,
    status: undefined,
    priceMin: undefined,
    priceMax: undefined,
    bedroomsMin: undefined,
    bedroomsMax: undefined,
    bathroomsMin: undefined,
    bathroomsMax: undefined,
    sizeMin: undefined,
    sizeMax: undefined,
    ratingMin: undefined,
    floorsMin: undefined,
    floorsMax: undefined,
    maxTenantsMin: undefined,
    maxTenantsMax: undefined,
    garage: undefined,
    kitchen: undefined,
    livingRoom: undefined,
    furnished: undefined,
    balcony: undefined,
    pool: undefined,
    garden: undefined,
    internet: undefined,
    airConditioning: undefined,
    gym: undefined,
    security: undefined,
    elevator: undefined,
    electricity: undefined,
    water: undefined,
    petsAllowed: undefined,
    smokingAllowed: undefined,
    wifi: undefined,
    verified: undefined,
    createdAfter: undefined,
    createdBefore: undefined,
    updatedAfter: undefined,
    updatedBefore: undefined,
  } as PropertyFilters,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setCurrentProperty: (state, action: PayloadAction<Property>) => {
      state.currentProperty = action.payload;
    },

    setEditStep: (state, action: PayloadAction<string>) => {
      state.editSteps = action.payload;
    },

    updateCurrentProperty: (
      state,
      action: PayloadAction<Partial<Property>>,
    ) => {
      if (state.currentProperty) {
        Object.entries(action.payload).forEach(([key, value]) => {
          if (value !== undefined) {
            (state.currentProperty as any)[key] = value;
          }
        });
      }
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<PropertyState["filters"]>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setPagination: (
      state,
      action: PayloadAction<Partial<PropertyState["pagination"]>>,
    ) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state) => {
        state.isLoading = false;
        // Error is set by errorToastMiddleware
      })
      //Single property
      .addCase(fetchProperty.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProperty = action.payload;
      })
      .addCase(fetchProperty.rejected, (state) => {
        state.isLoading = false;
        // Error is set by errorToastMiddleware
      })

      //editing property
      // .addCase(editApplication.fulfilled, (state, action) => {
      // state.isLoading = false;
      // state.error = null;
      // const updatedApp = action.payload.application || action.payload;

      // state.applications = Array.isArray(state.applications)
      //   ? state.applications.map((app) =>
      //       app.id === updatedApp.id ? updatedApp : app,
      //     )
      //   : [updatedApp]; // fallback just in case
      // })
      .addCase(editProperty.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle cases where backend might return { message, property } or just property
        const payload = action.payload as
          | { property?: unknown; message?: string }
          | unknown;
        if (
          payload &&
          (payload as { property?: Property }).property &&
          typeof (payload as { property?: Property }).property === "object"
        ) {
          state.currentProperty = (payload as { property?: Property })
            .property as unknown as Property;
        } else if (payload) {
          state.currentProperty = payload as unknown as Property;
        } else {
          state.currentProperty = null as unknown as Property;
        }
      })
      .addCase(editProperty.rejected, (state) => {
        state.isLoading = false;
        // Error is set by errorToastMiddleware
      })

      //fetch prperty User
      .addCase(fetchPropertyOwner.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPropertyOwner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.propertyOwnerDetails = action.payload;
      })
      .addCase(fetchPropertyOwner.rejected, (state) => {
        state.isLoading = false;
        // Error is set by errorToastMiddleware
      })

      //fetch prperty Contracts
      .addCase(fetchPropertyContracts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPropertyContracts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.propertyContracts = action.payload;
      })
      .addCase(fetchPropertyContracts.rejected, (state) => {
        state.isLoading = false;
        // Error is set by errorToastMiddleware
      });
  },
});

export const {
  setCurrentProperty,
  setError,
  clearError,
  setFilters,
  clearFilters,
  setPagination,
  updateCurrentProperty,
  setEditStep,
} = propertySlice.actions;
export default propertySlice.reducer;
