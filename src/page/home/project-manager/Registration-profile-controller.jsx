import React from 'react';

// 样式
import '@/style/home/project-manager/registration-profile.styl';
import '@/style/home/project-manager/item.styl';

// 组件
import RegistrationPersonProfile from '@/components/home/project-manager/Registration-person-profile.jsx';
import RegistrationProcessProfile from '@/components/home/project-manager/Registration-process-profile.jsx';

export default props => {
  return (
    <div className='registration-profile-box'>
      <RegistrationProcessProfile />
      <RegistrationPersonProfile />
    </div>
  );
};
