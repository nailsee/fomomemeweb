import React from 'react';

const IndexView = React.lazy(() => import('./home'));
const CreateView = React.lazy(() => import('./create'));
const ProfileView = React.lazy(() => import('./profile'));

export {
  IndexView,
  CreateView,
  ProfileView,
}