import {
  calculateGrandTotals,
  getUniqueColumns,
  groupPivotRowData,
} from '../pivotUtils';
import { mockOrders } from '../../mocks/mockOrders';

describe('pivotUtils', () => {
  describe('getUniqueColumns', () => {
    it('should handle empty data', () => {
      const result = getUniqueColumns([], 'state');
      expect(result).toEqual([]);
    });

    it('should return unique states sorted alphabetically', () => {
      const result = getUniqueColumns(mockOrders, 'state');
      expect(result).toEqual(['California', 'Florida', 'Kentucky']);
    });

    it('should return unique categories sorted alphabetically', () => {
      const result = getUniqueColumns(mockOrders, 'category');
      expect(result).toEqual(['Furniture', 'Office Supplies', 'Technology']);
    });

    it('should return unique segments sorted alphabetically', () => {
      const result = getUniqueColumns(mockOrders, 'segment');
      expect(result).toEqual(['Consumer', 'Corporate']);
    });

    it('should return unique ship modes sorted alphabetically', () => {
      const result = getUniqueColumns(mockOrders, 'shipMode');
      expect(result).toEqual(['Second Class', 'Standard Class']);
    });

    it('should return unique regions sorted alphabetically', () => {
      const result = getUniqueColumns(mockOrders, 'region');
      expect(result).toEqual(['South', 'West']);
    });

    it('should handle columns with all the same values', () => {
      const result = getUniqueColumns(mockOrders, 'country');
      expect(result).toEqual(['United States']);
    });
  });

  describe('groupPivotRowData', () => {
    it('should handle empty data', () => {
      const result = groupPivotRowData([], 'state', ['category']);
      expect(result).toEqual({});
    });

    it('should group by single level (category) with state columns', () => {
      const result = groupPivotRowData(mockOrders, 'state', ['category']);

      // Verify the structure
      expect(result).toHaveProperty('Furniture');
      expect(result).toHaveProperty('Office Supplies');
      expect(result).toHaveProperty('Technology');

      // Verify some specific values
      expect(result['Furniture']['Kentucky']).toBeCloseTo(993.9); // 261.96 + 731.94
      expect(result['Office Supplies']['California']).toBeCloseTo(62.27); // 14.62 + 7.28 + 18.504 + 22.87
      expect(result['Technology']['California']).toBeCloseTo(907.15);
    });

    it('should group by multiple levels (category -> segment) with state columns', () => {
      const result = groupPivotRowData(mockOrders, 'state', [
        'category',
        'segment',
      ]);

      // Verify the nested structure
      expect(result).toHaveProperty('Furniture');
      expect(result['Furniture']).toHaveProperty('Consumer');
      expect(result['Furniture']).toHaveProperty('Corporate');

      // Verify some specific values
      expect(result['Furniture']['Consumer']['Kentucky']).toBeCloseTo(993.9);
      expect(result['Office Supplies']['Consumer']['California']).toBeCloseTo(
        62.27
      );
      expect(result['Technology']['Consumer']['California']).toBeCloseTo(
        907.15
      );
    });

    it('should round sales values to 2 decimal places', () => {
      const result = groupPivotRowData(mockOrders, 'state', ['category']);
      const furnitureSales = result['Furniture']['Kentucky'];
      expect(furnitureSales).toBeCloseTo(993.9, 2);
    });
  });
});
