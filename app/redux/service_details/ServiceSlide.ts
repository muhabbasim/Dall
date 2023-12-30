'use client'

import api from "@/context/apiRequest";
import { createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "../store";

export interface serviceState {
  selectedService: any;
}

const initialState = {
  selectedService: null,
};


export const ServiceSlide = createSlice({
  name: 'service',
  initialState,
  reducers: {
    getService: (state, action) => {
      state.selectedService = action.payload;
    },
  }
})

export const { getService } = ServiceSlide.actions; 

export const fetchService = (id: number) => async (dispatch: AppDispatch) => {
  try {

    const res = await api.get(`/company/services/${id}/show`).then(res => {
      return res.data?.data;
    })
    dispatch(getService(res))

  } catch (error) {
    console.log(error);
  }
}

export default ServiceSlide.reducer;