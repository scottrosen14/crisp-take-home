import { PivotConfigState } from './pivotConfigSlice';

export const selectActiveRowConfigs = (state: {
  pivotConfig: PivotConfigState;
}) => state.pivotConfig.activeRowConfigs;

export const selectActiveColumnConfig = (state: {
  pivotConfig: PivotConfigState;
}) => state.pivotConfig.activeColumnConfig;

export const selectActiveConfigs = (state: {
  pivotConfig: PivotConfigState;
}) => {
  return [
    ...state.pivotConfig.activeRowConfigs,
    ...(state.pivotConfig.activeColumnConfig
      ? [state.pivotConfig.activeColumnConfig]
      : []),
  ];
};
