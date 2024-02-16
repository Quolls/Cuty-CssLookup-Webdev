import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorToast, SuccessToast } from "../../Component/Toaster/Toaster";
import { ApiPost, ApiPostAuth } from "../../helpers/API/API_data";
import { encryptdata } from "../../helpers/Encrypt";
import Auth from "../../helpers/Auth";

let localData = localStorage.getItem("logindata");
const initialState = {
  patientProfileData: localData ? JSON.parse(localData) : null,
  isSignUp: false,
  isAuth: localData ? true : false,
  loading: false,
};

export const patientSignUp = createAsyncThunk(
  "patient/patientSignUp",
  async ({ data, navigate }) => {
    const encryptedSignupData = encryptdata(data);
    return ApiPostAuth("patient", { encryptedSignupData })
      .then((res) => {
        return res;
      })
      .catch((err) => err);
  }
);

export const patientSignIn = createAsyncThunk(
  "patient/patientSignIn",
  async (data) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    const encryptedLoginData = encryptdata(body);
    return ApiPostAuth("patient/login", { encryptedLoginData })
      .then((res) => {
        Auth.setAuthToken(res?.data?.data?.token);
        if (res.status === 200) {
          data?.redirect();
        }
        return res;
      })
      .catch((err) => err);
  }
);

const patientAuthSclice = createSlice({
  name: "patient",
  initialState,

  extraReducers: {
    [patientSignUp.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [patientSignUp.fulfilled]: (state, { payload }) => {
      if (payload?.status === 409) {
        ErrorToast(payload.message);
      } else {
        state.isSignUp = true;
        state.loading = false;
      }

    },
    [patientSignUp.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [patientSignIn.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [patientSignIn.fulfilled]: (state, { payload }) => {

      if (payload.status === 200) {
        localStorage.setItem("logindata", JSON.stringify(payload?.data?.data));
        localStorage.setItem("logindata", JSON.stringify(payload?.data?.data));
        state.patientProfileData = payload;
        state.isAuth = true;
        state.loading = false;
        SuccessToast(payload.data.message);
      } else {
        ErrorToast(payload.message);
      }
    },
    [patientSignIn.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export const { patientLogin } = patientAuthSclice.actions;
export const userProfile = (state) => state.patient;
export const patientProfileData = (state) => state.patientProfileData;
export default patientAuthSclice.reducer;
