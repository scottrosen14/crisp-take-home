import { useEffect } from 'react';
import {
  fetchOrdersThunk,
  selectLoading,
  selectError,
} from '../../redux/features/ordersSlice';
import PivotTable from '../PivotTable/PivotTable';
import { useAppDispatch, useAppSelector } from '../../redux/store';

function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

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
      <PivotTable />
    </div>
  );
}

export default App;
