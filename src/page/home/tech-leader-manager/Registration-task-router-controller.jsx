import React from 'react';

// 子路由
import RegistrationTaskAssignTech from '@/page/home/tech-leader-manager/Registration-task-assign-tech-controller.jsx';
import RegistrationTaskProfile from '@/page/home/tech-leader-manager/Registration-task-profile-controller';

// 路由
import { useRouteMatch } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';

export default props => {
  const homeRegistrationTaskAssignTech = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_TASK_ASSIGN_TECH.path,
    exact: true
  });
  const homeRegistrationTaskProfile = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_TASK_PROFILE.path,
    exact: true
  });

  return (
    <>
      {homeRegistrationTaskAssignTech ? <RegistrationTaskAssignTech /> : null}
      {homeRegistrationTaskProfile ? <RegistrationTaskProfile /> : null}
    </>
  );
};
