
import { lazy } from 'react';

const Fees = lazy(() => import('./components/DataList'));
const CreateFee = lazy(() => import('./components/Collection'));

export { CreateFee, Fees };

