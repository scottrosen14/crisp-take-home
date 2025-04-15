import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PivotConfigState {
  activeRowConfigs: string[];
  activeColumnConfig: string | null;
}

const initialState: PivotConfigState = {
  activeRowConfigs: ['category', 'subCategory'],
  activeColumnConfig: 'state',
};

const pivotConfigSlice = createSlice({
  name: 'pivotConfig',
  initialState,
  reducers: {
    setActiveRowConfigs: (state, action: PayloadAction<string[]>) => {
      state.activeRowConfigs = action.payload;
    },
    setActiveColumnConfig: (state, action: PayloadAction<string | null>) => {
      state.activeColumnConfig = action.payload;
    },
  },
});

export const { setActiveRowConfigs, setActiveColumnConfig } =
  pivotConfigSlice.actions;

export default pivotConfigSlice;
