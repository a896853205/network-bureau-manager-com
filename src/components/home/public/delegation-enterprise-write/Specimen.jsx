import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import { GET_DELEGATION_SPECIMEN_INFO } from '@/constants/api-constants';

// 样式
import { Descriptions } from 'antd';
import '@/style/home/tech-manager/info-modal.styl';

export default (props) => {
  const { fileDownloadDelegationUuid } = useSelector(
      (state) => state.enterpriseStore
    ),
    [delegationSpecimen, setDelegationSpecimen] = useState([]);

  // 将已有的数据回显
  useEffect(() => {
    if (fileDownloadDelegationUuid) {
      (async () => {
        let delegationSpecimen = await proxyFetch(
          GET_DELEGATION_SPECIMEN_INFO,
          { delegationUuid: fileDownloadDelegationUuid },
          'GET'
        );

        setDelegationSpecimen(delegationSpecimen);
      })();
    }
  }, [fileDownloadDelegationUuid]);

  const securityClassificationToText = (securityClassification) => {
    switch (securityClassification) {
      case 0:
        return '无';
      case 1:
        return '涉密';
      default:
        return '';
    }
  };

  return (
    <div>
      {delegationSpecimen ? (
        <Descriptions
          bordered
          className='inner-description-box'
          title='委托测试基本信息'
        >
          <Descriptions.Item label='注册商标' span={3}>
            {delegationSpecimen.trademark}
          </Descriptions.Item>
          <Descriptions.Item label='开发工具' span={3}>
            {delegationSpecimen.developmentTool}
          </Descriptions.Item>
          <Descriptions.Item label='产品密级' span={3}>
            {securityClassificationToText(
              delegationSpecimen.securityClassification
            )}
          </Descriptions.Item>
          <Descriptions.Item label='单位属性' span={3}>
            {delegationSpecimen.unit}
          </Descriptions.Item>
          <Descriptions.Item label='邮箱' span={3}>
            {delegationSpecimen.email}
          </Descriptions.Item>
        </Descriptions>
      ) : null}
    </div>
  );
};
