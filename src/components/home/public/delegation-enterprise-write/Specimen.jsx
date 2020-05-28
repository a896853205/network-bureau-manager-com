import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import { GET_REGISTRATION_SPECIMEN_INFO } from '@/constants/api-constants';

// 样式
import { Descriptions } from 'antd';
import '@/style/home/tech-manager/info-modal.styl';

export default (props) => {
  const { fileDownloadRegistrationUuid } = useSelector(
      (state) => state.enterpriseStore
    ),
    [registrationSpecimen, setRegistrationSpecimen] = useState([]);

  // 将已有的数据回显
  useEffect(() => {
    if (fileDownloadRegistrationUuid) {
      (async () => {
        let registrationSpecimen = await proxyFetch(
          GET_REGISTRATION_SPECIMEN_INFO,
          { registrationUuid: fileDownloadRegistrationUuid },
          'GET'
        );

        setRegistrationSpecimen(registrationSpecimen);
      })();
    }
  }, [fileDownloadRegistrationUuid]);

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
      {registrationSpecimen ? (
        <Descriptions
          bordered
          className='inner-description-box'
          title='登记测试基本信息'
        >
          <Descriptions.Item label='注册商标' span={3}>
            {registrationSpecimen.trademark}
          </Descriptions.Item>
          <Descriptions.Item label='开发工具' span={3}>
            {registrationSpecimen.developmentTool}
          </Descriptions.Item>
          <Descriptions.Item label='产品密级' span={3}>
            {securityClassificationToText(
              registrationSpecimen.securityClassification
            )}
          </Descriptions.Item>
          <Descriptions.Item label='单位属性' span={3}>
            {registrationSpecimen.unit}
          </Descriptions.Item>
          <Descriptions.Item label='邮箱' span={3}>
            {registrationSpecimen.email}
          </Descriptions.Item>
        </Descriptions>
      ) : null}
    </div>
  );
};
