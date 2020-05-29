import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import { GET_DELEGATION_BASIC_INFO } from '@/constants/api-constants';

// 样式
import { Descriptions } from 'antd';
import '@/style/home/tech-manager/info-modal.styl';

import moment from 'moment';

export default (props) => {
  const { fileDownloadDelegationUuid } = useSelector(
      (state) => state.enterpriseStore
    ),
    [delegationBasic, setDelegationBasic] = useState([]);

  // 将已有的数据回显
  useEffect(() => {
    if (fileDownloadDelegationUuid) {
      (async () => {
        let delegationBasic = await proxyFetch(
          GET_DELEGATION_BASIC_INFO,
          { delegationUuid: fileDownloadDelegationUuid },
          'GET'
        );

        setDelegationBasic(delegationBasic);
      })();
    }
  }, [fileDownloadDelegationUuid]);

  return (
    <div>
      {delegationBasic ? (
        <Descriptions
          bordered
          className='inner-description-box'
          title='委托测试基本信息'
        >
          <Descriptions.Item label='版本' span={3}>
            {delegationBasic.version}
          </Descriptions.Item>
          <Descriptions.Item label='开发研发日期' span={3}>
            {delegationBasic.devStartTime
              ? moment(delegationBasic.devStartTime).format('YYYY-MM-DD')
              : ''}
          </Descriptions.Item>
          <Descriptions.Item label='联系人' span={3}>
            {delegationBasic.linkman}
          </Descriptions.Item>
          <Descriptions.Item label='手机号码' span={3}>
            {delegationBasic.phone}
          </Descriptions.Item>
          <Descriptions.Item label='委托单位' span={3}>
            {delegationBasic.client}
          </Descriptions.Item>
          <Descriptions.Item label='注册地址' span={3}>
            {delegationBasic.address}
          </Descriptions.Item>
          <Descriptions.Item label='开发单位' span={3}>
            {delegationBasic.enterpriseName}
          </Descriptions.Item>
        </Descriptions>
      ) : null}
    </div>
  );
};
