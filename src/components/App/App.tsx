import { useEffect } from 'react';
import { fetchOrdersThunk } from '../../redux/features/ordersSlice';
import PivotTable from '../PivotTable/PivotTable';
import { useAppDispatch, useAppSelector } from '../../redux/store';

function App() {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, [dispatch]);

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
