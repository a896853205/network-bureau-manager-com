import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import { GET_REGISTRATION_BASIC_INFO } from '@/constants/api-constants';

// 样式
import { Descriptions } from 'antd';
import '@/style/home/tech-manager/info-modal.styl';

import moment from 'moment';

export default (props) => {
  const { fileDownloadRegistrationUuid } = useSelector(
      (state) => state.enterpriseStore
    ),
    [registrationBasic, setRegistrationBasic] = useState([]);

  // 将已有的数据回显
  useEffect(() => {
    if (fileDownloadRegistrationUuid) {
      (async () => {
        let registrationBasic = await proxyFetch(
          GET_REGISTRATION_BASIC_INFO,
          { registrationUuid: fileDownloadRegistrationUuid },
          'GET'
        );

        setRegistrationBasic(registrationBasic);
      })();
    }
  }, [fileDownloadRegistrationUuid]);

  return (
    <div>
      {registrationBasic ? (
        <Descriptions
          bordered
          className='inner-description-box'
          title='登记测试基本信息'
        >
          <Descriptions.Item label='版本' span={3}>
            {registrationBasic.version}
          </Descriptions.Item>
          <Descriptions.Item label='开发研发日期' span={3}>
            {registrationBasic.devStartTime
              ? moment(registrationBasic.devStartTime).format('YYYY-MM-DD')
              : ''}
          </Descriptions.Item>
          <Descriptions.Item label='联系人' span={3}>
            {registrationBasic.linkman}
          </Descriptions.Item>
          <Descriptions.Item label='手机号码' span={3}>
            {registrationBasic.phone}
          </Descriptions.Item>
          <Descriptions.Item label='委托单位' span={3}>
            {registrationBasic.client}
          </Descriptions.Item>
          <Descriptions.Item label='注册地址' span={3}>
            {registrationBasic.address}
          </Descriptions.Item>
          <Descriptions.Item label='开发单位' span={3}>
            {registrationBasic.enterpriseName}
          </Descriptions.Item>
        </Descriptions>
      ) : null}
    </div>
  );
};
