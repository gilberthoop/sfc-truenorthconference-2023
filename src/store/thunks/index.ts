import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_ENDPOINT_URL = "/api/registrations";

const fetchRegistrations = createAsyncThunk("registrations/fetch", async () => {
  try {
    const response = await axios.get(API_ENDPOINT_URL);
    return response.data.registrations;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const filterRegistrations = createAsyncThunk(
  "registrations/filter",
  async (queryParams: any = {}) => {
    try {
      const response = await axios.get(API_ENDPOINT_URL, {
        params: queryParams,
      });
      return response.data.registrations;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export { fetchRegistrations, filterRegistrations };
