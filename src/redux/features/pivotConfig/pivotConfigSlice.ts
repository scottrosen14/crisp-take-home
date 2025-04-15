import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PivotConfig {
  id: string;
  name: string;
  type: 'row' | 'column';
  sequence: number;
}

export interface PivotConfigState {
  configs: PivotConfig[];
  activeRowConfigs: string[];
  activeColumnConfig: string | null;
}

const DEFAULT_COLUMN_CONFIG: PivotConfig = {
  id: 'state',
  name: 'State',
  type: 'column',
  sequence: 1,
};

const initialState: PivotConfigState = {
  configs: [DEFAULT_COLUMN_CONFIG],
  activeRowConfigs: [],
  activeColumnConfig: 'state',
};

const pivotConfigSlice = createSlice({
  name: 'pivotConfig',
  initialState,
  reducers: {
    addConfig: (state, action: PayloadAction<PivotConfig>) => {
      if (action.payload.type === 'column' && state.activeColumnConfig) {
        state.configs = state.configs.filter(
          d => d.id !== state.activeColumnConfig
        );
      }
      state.configs.push(action.payload);
      if (action.payload.type === 'column') {
        state.activeColumnConfig = action.payload.id;
      }
    },
    removeConfig: (state, action: PayloadAction<string>) => {
      const config = state.configs.find(d => d.id === action.payload);
      if (config?.type === 'column') {
        state.activeColumnConfig = null;
      }
      state.configs = state.configs.filter(d => d.id !== action.payload);
      state.activeRowConfigs = state.activeRowConfigs.filter(
        id => id !== action.payload
      );
    },
    setActiveRowConfigs: (state, action: PayloadAction<string[]>) => {
      state.activeRowConfigs = action.payload;
    },
    setActiveColumnConfig: (state, action: PayloadAction<string | null>) => {
      state.activeColumnConfig = action.payload;
    },
    updateConfig: (state, action: PayloadAction<PivotConfig>) => {
      const index = state.configs.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        // If updating to column type and another column exists, remove the old one
        if (
          action.payload.type === 'column' &&
          state.activeColumnConfig &&
          state.activeColumnConfig !== action.payload.id
        ) {
          state.configs = state.configs.filter(
            d => d.id !== state.activeColumnConfig
          );
          state.activeColumnConfig = action.payload.id;
        }
        state.configs[index] = action.payload;
      }
    },
  },
});

export const {
  addConfig,
  removeConfig,
  setActiveRowConfigs,
  setActiveColumnConfig,
  updateConfig,
} = pivotConfigSlice.actions;

export default pivotConfigSlice;
