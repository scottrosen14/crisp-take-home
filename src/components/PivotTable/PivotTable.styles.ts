import { CSSProperties } from 'react';

export const containerStyles: CSSProperties = {
  padding: '5px',
  backgroundColor: 'white',
  borderRadius: '8px',
  width: '100%',
  overflowX: 'auto' as const,
};

export const tableStyles: CSSProperties = {
  borderCollapse: 'collapse' as const,
  width: '100%',
  fontFamily: 'Arial, sans-serif',
  padding: '8px',
  border: '1px solid #ddd',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
};
