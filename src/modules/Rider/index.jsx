import { lazy } from 'react';

const Riders = lazy(() => import('./components/DataList'));
// const CreateRider = lazy(() => import('./components/Create'));
// const EditRider = lazy(() => import('./components/Edit'));
// const RiderInformation = lazy(() => import('./components/profile/Information'));
// const RiderTable = lazy(() => import('./components/DataTable'));
// const Guardians = lazy(() => import('./components/Guardians'));

export { Riders };


