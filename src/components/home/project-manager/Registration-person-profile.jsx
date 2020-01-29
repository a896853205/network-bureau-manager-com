import React from 'react';

// 样式
import { Icon, Rate } from 'antd';

export default props => {
  const enterpriseUuid = 'guanliyuan';

  return (
    <div className='item-box profile-right-box'>
      <p className='title-box'>
        <span>企业基本信息</span>
      </p>
      <ul className='enterprise-info-bottom-box'>
        <li className='enterprise-info-item-box'>
          <p>
            <Icon type='user' className='enterprise-info-icon' />
            企业名称
          </p>
          <p>哈尔滨理工大学</p>
        </li>
        <li className='enterprise-info-item-box'>
          <p>
            <Icon type='phone' className='enterprise-info-icon' />
            联系电话
          </p>
          <p>18351923820</p>
        </li>
        <li className='enterprise-info-item-box'>
          <p>
            <Icon type='tag' className='enterprise-info-icon' />
            办理业务次数
          </p>
          <p>111</p>
        </li>
        <li className='enterprise-info-item-box'>
          <p>
            <Icon type='star' className='enterprise-info-icon' />
            星级
          </p>
          <Rate disabled defaultValue={5} />
        </li>
      </ul>
    </div>
  );
};
