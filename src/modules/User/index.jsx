import { lazy } from 'react';
const Profile = lazy(() => import('./components/Profile'))
const ProfileSettings = lazy(() => import('./components/ProfileSettings'))
export { Profile, ProfileSettings };




