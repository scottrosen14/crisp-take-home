import { useFetchOrders } from '../../hooks/useFetchOrders';
import PivotTable from '../PivotTable/PivotTable';

function App() {
  const { orders, loading, error } = useFetchOrders();

  if (loading) {
    return <div>Loading orders...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '15px', backgroundColor: '#e6e9f0' }}>
      <PivotTable data={orders} />
    </div>
  );
}

export default App;
