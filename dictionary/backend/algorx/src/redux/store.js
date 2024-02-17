import { configureStore } from '@reduxjs/toolkit'
import patientAuthSclice from './reducer/patientAuthSclice'


export const store = configureStore({
  reducer: {
    patient: patientAuthSclice,

  },

})