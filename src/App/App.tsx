import { useFetchOrders } from '../hooks/useFetchOrders';
import PivotTable from '../components/PivotTable/PivotTable';

function App() {
  const { orders, loading, error } = useFetchOrders();

  if (loading) {
    return <div>Loading orders...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <PivotTable data={orders} />
    </div>
  );
}

export default App;
