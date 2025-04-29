import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../../constants/constants';

export interface PivotConfigState {
  activeRowConfigs: (keyof Order)[];
  activeColumnConfig: keyof Order | null;
}

const initialState: PivotConfigState = {
  activeRowConfigs: ['category', 'subCategory'],
  activeColumnConfig: 'state',
};

const pivotConfigSlice = createSlice({
  name: 'pivotConfig',
  initialState,
  reducers: {
    setActiveRowConfigs: (
      configState,
      action: PayloadAction<(keyof Order)[]>
    ) => {
      configState.activeRowConfigs = action.payload;
    },
    setActiveColumnConfig: (
      configState,
      action: PayloadAction<keyof Order | null>
    ) => {
      configState.activeColumnConfig = action.payload;
    },
  },
});

export const { setActiveRowConfigs, setActiveColumnConfig } =
  pivotConfigSlice.actions;

export default pivotConfigSlice;
