import {
  calculateGrandTotals,
  getUniqueColumns,
  groupPivotRowData,
} from '../pivotUtils';
import { mockOrders } from '../../mocks/mockOrders';

describe('pivotUtils', () => {
  describe('getUniqueStates', () => {
    it('should handle empty data', () => {
      const result = getUniqueColumns([]);
      expect(result).toEqual([]);
    });

    it('should return unique states sorted alphabetically', () => {
      const result = getUniqueColumns(mockOrders);
      expect(result).toEqual(['California', 'Florida', 'Kentucky']);
    });
  });

  describe('groupDataForPivot', () => {
    it('should handle empty data', () => {
      const result = groupPivotRowData([]);
      expect(result).toEqual({});
    });

    it('should group data correctly by category, subcategory, and state', () => {
      const groupedRows = groupPivotRowData(mockOrders);

      expect(groupedRows).toEqual({
        Furniture: {
          Bookcases: { Kentucky: 261.96 },
          Chairs: { Kentucky: 731.94 },
          Tables: { Florida: 957.5775 },
          Furnishings: { California: 48.86 },
        },
        'Office Supplies': {
          Labels: { California: 14.62 },
          Storage: { Florida: 22.368 },
          Art: { California: 7.28 },
          Binders: { California: 18.504 },
          Appliances: { California: 114.9 },
        },
        Technology: { Phones: { California: 907.152 } },
      });
    });
  });

  describe('ultimateGrandTotal', () => {
    const expectedUltimateGrandTotal = 3085;
    const groupedRows = {
      Furniture: {
        Bookcases: { Kentucky: 261.96 },
        Chairs: { Kentucky: 731.94 },
        Tables: { Florida: 957.5775 },
        Furnishings: { California: 48.86 },
      },
      'Office Supplies': {
        Labels: { California: 14.62 },
        Storage: { Florida: 22.368 },
        Art: { California: 7.28 },
        Binders: { California: 18.504 },
        Appliances: { California: 114.9 },
      },
      Technology: { Phones: { California: 907.152 } },
    };
    const { ultimateGrandTotal } = calculateGrandTotals(groupedRows, [
      'California',
      'Florida',
      'Kentucky',
    ]);
    expect(ultimateGrandTotal).toEqual(expectedUltimateGrandTotal);
  });
});
