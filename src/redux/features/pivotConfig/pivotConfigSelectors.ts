import { PivotConfig, PivotConfigState } from './pivotConfigSlice';

export const selectAllConfigs = (state: { pivotConfig: PivotConfigState }) =>
  state.pivotConfig.configs;

export const selectRowConfigs = (state: { pivotConfig: PivotConfigState }) =>
  state.pivotConfig.configs.filter((d: PivotConfig) => d.type === 'row');

export const selectColumnConfig = (state: { pivotConfig: PivotConfigState }) =>
  state.pivotConfig.configs.find(
    (d: PivotConfig) => d.id === state.pivotConfig.activeColumnConfig
  );

export const selectActiveRowConfigs = (state: {
  pivotConfig: PivotConfigState;
}) => state.pivotConfig.activeRowConfigs;

export const selectActiveColumnConfig = (state: {
  pivotConfig: PivotConfigState;
}) => state.pivotConfig.activeColumnConfig;

export const selectActiveConfigs = (state: {
  pivotConfig: PivotConfigState;
}) => {
  const activeConfigs = [
    ...state.pivotConfig.activeRowConfigs,
    ...(state.pivotConfig.activeColumnConfig
      ? [state.pivotConfig.activeColumnConfig]
      : []),
  ];
  return state.pivotConfig.configs.filter((d: PivotConfig) =>
    activeConfigs.includes(d.id)
  );
};
