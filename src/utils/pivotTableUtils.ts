import { Order } from '../constants';

export interface GroupedData {
  [category: string]: {
    [subCategory: string]: {
      [state: string]: number;
    };
  };
}

export const getUniqueStates = (data: Order[]): string[] => {
  const stateSet = new Set(data.map(d => d.state));
  return Array.from(stateSet).sort();
};

export const groupDataForPivot = (data: Order[]): GroupedData => {
  const grouped: GroupedData = {};

  data.forEach(({ category, subCategory, state, sales }) => {
    if (!grouped[category]) {
      grouped[category] = {};
    }

    if (!grouped[category][subCategory]) {
      grouped[category][subCategory] = {};
    }

    if (!grouped[category][subCategory][state]) {
      grouped[category][subCategory][state] = 0;
    }

    grouped[category][subCategory][state] += sales;
  });

  return grouped;
}; 