import { useParams } from 'react-router';
import { useExpense } from '../hooks/queries';
import ProcessEdit from './ProcessEdit';

const Edit = () => {
  const { id } = useParams();
  const { data: expenseData, isLoading } = useExpense(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (

    <ProcessEdit selectedData={expenseData?.data} />
  );
};



export default Edit;

