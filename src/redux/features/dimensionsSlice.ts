import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Dimension {
  id: string;
  name: string;
  type: 'row' | 'column';
  order: number;
}

interface DimensionsState {
  dimensions: Dimension[];
  activeRowDimensions: string[];
  activeColumnDimension: string | null;
}

const DEFAULT_COLUMN_DIMENSION: Dimension = {
  id: 'state',
  name: 'State',
  type: 'column',
  order: 1,
};

const initialState: DimensionsState = {
  dimensions: [DEFAULT_COLUMN_DIMENSION],
  activeRowDimensions: [],
  activeColumnDimension: 'state',
};

const dimensionsSlice = createSlice({
  name: 'dimensions',
  initialState,
  reducers: {
    addDimension: (state, action: PayloadAction<Dimension>) => {
      // If adding a column dimension and one already exists, remove the old one
      if (action.payload.type === 'column' && state.activeColumnDimension) {
        state.dimensions = state.dimensions.filter(
          d => d.id !== state.activeColumnDimension
        );
      }
      state.dimensions.push(action.payload);
      if (action.payload.type === 'column') {
        state.activeColumnDimension = action.payload.id;
      }
    },
    removeDimension: (state, action: PayloadAction<string>) => {
      const dimension = state.dimensions.find(d => d.id === action.payload);
      if (dimension?.type === 'column') {
        state.activeColumnDimension = null;
      }
      state.dimensions = state.dimensions.filter(d => d.id !== action.payload);
      state.activeRowDimensions = state.activeRowDimensions.filter(
        id => id !== action.payload
      );
    },
    setActiveRowDimensions: (state, action: PayloadAction<string[]>) => {
      state.activeRowDimensions = action.payload;
    },
    setActiveColumnDimension: (state, action: PayloadAction<string | null>) => {
      state.activeColumnDimension = action.payload;
    },
    updateDimension: (state, action: PayloadAction<Dimension>) => {
      const index = state.dimensions.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        // If updating to column type and another column exists, remove the old one
        if (
          action.payload.type === 'column' &&
          state.activeColumnDimension &&
          state.activeColumnDimension !== action.payload.id
        ) {
          state.dimensions = state.dimensions.filter(
            d => d.id !== state.activeColumnDimension
          );
          state.activeColumnDimension = action.payload.id;
        }
        state.dimensions[index] = action.payload;
      }
    },
  },
});

export const {
  addDimension,
  removeDimension,
  setActiveRowDimensions,
  setActiveColumnDimension,
  updateDimension,
} = dimensionsSlice.actions;

// Selectors
export const selectAllDimensions = (state: { dimensions: DimensionsState }) =>
  state.dimensions.dimensions;
export const selectRowDimensions = (state: { dimensions: DimensionsState }) =>
  state.dimensions.dimensions.filter(d => d.type === 'row');
export const selectColumnDimension = (state: { dimensions: DimensionsState }) =>
  state.dimensions.dimensions.find(
    d => d.id === state.dimensions.activeColumnDimension
  );
export const selectActiveRowDimensions = (state: {
  dimensions: DimensionsState;
}) => state.dimensions.activeRowDimensions;
export const selectActiveColumnDimension = (state: {
  dimensions: DimensionsState;
}) => state.dimensions.activeColumnDimension;
export const selectActiveDimensions = (state: {
  dimensions: DimensionsState;
}) => {
  const activeDimensions = [
    ...state.dimensions.activeRowDimensions,
    ...(state.dimensions.activeColumnDimension
      ? [state.dimensions.activeColumnDimension]
      : []),
  ];
  return state.dimensions.dimensions.filter(d =>
    activeDimensions.includes(d.id)
  );
};

export default dimensionsSlice;
