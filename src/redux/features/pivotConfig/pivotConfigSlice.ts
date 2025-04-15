import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PivotConfigState {
  activeRowConfigs: string[];
  activeColumnConfig: string | null;
}

const initialState: PivotConfigState = {
  activeRowConfigs: ['country', 'region'],
  activeColumnConfig: 'segment',
};

const pivotConfigSlice = createSlice({
  name: 'pivotConfig',
  initialState,
  reducers: {
    setActiveRowConfigs: (configState, action: PayloadAction<string[]>) => {
      configState.activeRowConfigs = action.payload;
    },
    setActiveColumnConfig: (
      configState,
      action: PayloadAction<string | null>
    ) => {
      configState.activeColumnConfig = action.payload;
    },
  },
});

export const { setActiveRowConfigs, setActiveColumnConfig } =
  pivotConfigSlice.actions;

export default pivotConfigSlice;
