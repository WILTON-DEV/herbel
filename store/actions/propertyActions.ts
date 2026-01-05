
// import { CreatePropertyDto, Property } from "@/types/schemas";
import { createAsyncThunk } from "@reduxjs/toolkit";

// type UpdatePropertyDto = Partial<Omit<Property, "id">>;

export const fetchProperties = createAsyncThunk(
  "property/fetchProperties",()=>{}
  // async () => {
  //   const data = await API.get("/property");
  //   return data.data;
  // },
);

export const fetchProperty = createAsyncThunk(
  "property/fetchProperty", ()=>{}// fixed name
  // async (id: number | string) => {
  //   const data = await API.get(`/property/admin/${id}`);
  //   return data.data;
  // },
);

export const fetchPropertyOwner = createAsyncThunk(
  "property/fetchPropertyOwner", ()=>{}// fixed name
  // async (id: number | string) => {
  //   const data = await API.get(`/users/${id}`);
  //   return data.data;
  // },
);

export const fetchPropertyContracts = createAsyncThunk(
  "property/fetchPropertyContracts", ()=>{}// fixed name
  // async () => {
  //   const data = await API.get(`/contracts`);
  //   return data.data;
  // },
);

export const createProperty = createAsyncThunk(
  "property/createProperty",()=>{}
  // async (property: CreatePropertyDto, { rejectWithValue }) => {
  //   try {
  //     const response = await API.post(`/property`, property);
  //     return response.data;
  //   } catch (error: unknown) {
  //     const axiosError = error as {
  //       response?: { data?: unknown };
  //       message?: string;
  //     };
  //     const message =
  //       (typeof axiosError?.response?.data === "string"
  //         ? axiosError.response.data
  //         : undefined) ||
  //       axiosError?.message ||
  //       "Failed to create property";
  //     return rejectWithValue(message);
  //   }
  // },
);

export const editProperty = createAsyncThunk(
  "property/editProperty",()=>{}
  // async ({
  //   id,
  //   property,
  // }: {
  //   id: number | string;
  //   property: UpdatePropertyDto;
  // }) => {
  //   try {
  //     const {
  //       title,
  //       address,
  //       airConditioning,
  //       balcony,
  //       bathrooms,
  //       bedrooms,
  //       city,
  //       country,
  //       createdAt,
  //       description,
  //       district,
  //       documents,
  //       electricity,
  //       elevator,
  //       floorsStories,
  //       furnished,
  //       garage,
  //       garden,
  //       gym,
  //       images,
  //       internet,
  //       kitchen,
  //       latitude,
  //       leaseType,
  //       livingRoom,
  //       longitude,
  //       maxTenants,
  //       noOfAvailableUnits,
  //       noOfUnits,
  //       numberOfBeds,
  //       otherPropertyType,
  //       otherRules,
  //       ownerId,
  //       ownershipDuration,
  //       petsAllowed,
  //       pool,
  //       price,
  //       propertyCategory,
  //       propertySize,
  //       propertySizeUnit,
  //       propertyType,
  //       rating,
  //       rentManagement,
  //       rentalPeriod,
  //       security,
  //       servicesAllowed,
  //       smokingAllowed,
  //       status,
  //       street,
  //       updatedAt,
  //       verified,
  //       video,
  //       water,
  //       wifi,
  //     } = property;

  //     const newProperty = {
  //       title,
  //       address,
  //       airConditioning,
  //       balcony,
  //       bathrooms,
  //       bedrooms,
  //       city,
  //       country,
  //       createdAt,
  //       description,
  //       district,
  //       documents,
  //       electricity,
  //       elevator,
  //       floorsStories,
  //       furnished,
  //       garage,
  //       garden,
  //       gym,
  //       images,
  //       internet,
  //       kitchen,
  //       latitude,
  //       leaseType,
  //       livingRoom,
  //       longitude,
  //       maxTenants,
  //       noOfAvailableUnits,
  //       noOfUnits,
  //       numberOfBeds,
  //       otherPropertyType,
  //       otherRules,
  //       ownerId,
  //       ownershipDuration,
  //       petsAllowed,
  //       pool,
  //       price,
  //       propertyCategory,
  //       propertySize,
  //       propertySizeUnit,
  //       propertyType,
  //       rating,
  //       rentManagement,
  //       rentalPeriod,
  //       security,
  //       servicesAllowed,
  //       smokingAllowed,
  //       status,
  //       street,
  //       updatedAt,
  //       verified,
  //       video,
  //       water,
  //       wifi,
  //     };
  //     const response = await API.patch(`/property/${id}`, newProperty);
  //     return {
  //       message: "successfully edited property",
  //       property: response.data,
  //     };
  //   } catch (error: unknown) {
  //     console.log("Error occurred on editing property:", error);
  //     throw error;
  //   }
  // },
);

export const verifyProperty = createAsyncThunk(
  "property/verifyProperty",()=>{}
  // async (id: number | string, { rejectWithValue }) => {
  //   try {
  //     const response = await API.patch(`/property/${id}`, { verified: true });
  //     return {
  //       message: "Property verified successfully",
  //       property: response.data,
  //     };
  //   } catch (error: unknown) {
  //     const axiosError = error as {
  //       response?: { data?: unknown };
  //       message?: string;
  //     };
  //     const message =
  //       (typeof axiosError?.response?.data === "string"
  //         ? axiosError.response.data
  //         : undefined) ||
  //       axiosError?.message ||
  //       "Failed to verify property";
  //     return rejectWithValue(message);
  //   }
  // },
);

export const unlistProperty = createAsyncThunk(
  "property/unlistProperty",()=>{}
  // async (id: number | string, { rejectWithValue }) => {
  //   try {
  //     // Change status to RENTED or SOLD (unlisting)
  //     const response = await API.patch(`/property/${id}`, { status: "SOLD" });
  //     return {
  //       message: "Property unlisted successfully",
  //       property: response.data,
  //     };
  //   } catch (error: unknown) {
  //     const axiosError = error as {
  //       response?: { data?: unknown };
  //       message?: string;
  //     };
  //     const message =
  //       (typeof axiosError?.response?.data === "string"
  //         ? axiosError.response.data
  //         : undefined) ||
  //       axiosError?.message ||
  //       "Failed to unlist property";
  //     return rejectWithValue(message);
  //   }
  // },
);
