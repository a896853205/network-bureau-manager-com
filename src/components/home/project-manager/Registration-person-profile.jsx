import React, { useEffect, useState } from 'react';

// 样式
import { Icon /*, Rate*/ } from 'antd';

//请求
import proxyFetch from '@/util/request';
import { SELECT_ENTERPRISE_INFO } from '@/constants/api-constants';

export default props => {
  const enterpriseUuid = 'guanliyuan',
    [code, setCode] = useState(''),
    [phone, setPhone] = useState(''),
    [name, setName] = useState('');

  useEffect(() => {
    (async () => {
      let { code, phone, name } = await proxyFetch(
        SELECT_ENTERPRISE_INFO,
        { uuid: enterpriseUuid },
        'GET'
      );
      setCode(code);
      setPhone(phone);
      setName(name);
    })();
  }, []);

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
          <p>{name}</p>
        </li>
        <li className='enterprise-info-item-box'>
          <p>
            <Icon type='phone' className='enterprise-info-icon' />
            联系电话
          </p>
          <p>{phone}</p>
        </li>
        <li className='enterprise-info-item-box'>
          <p>
            <Icon type='idcard' className='enterprise-info-icon' />
            社会统一信用代码
          </p>
          <p>{code}</p>
        </li>
        {/*<li className='enterprise-info-item-box'>
          <p>
            <Icon type='star' className='enterprise-info-icon' />
            星级
          </p>
          <Rate disabled defaultValue={5} />
          </li>*/}
      </ul>
    </div>
  );
};
