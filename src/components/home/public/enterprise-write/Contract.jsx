import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import { GET_REGISTRATION_CONTRACT_INFO } from '@/constants/api-constants';

// 样式
import { Descriptions } from 'antd';
import '@/style/home/tech-manager/info-modal.styl';

export default (props) => {
  const { fileDownloadRegistrationUuid } = useSelector(
      (state) => state.enterpriseStore
    ),
    [registrationContract, setRegistrationContract] = useState([]);

  // 将已有的数据回显
  useEffect(() => {
    if (fileDownloadRegistrationUuid) {
      (async () => {
        let registrationContract = await proxyFetch(
          GET_REGISTRATION_CONTRACT_INFO,
          { registrationUuid: fileDownloadRegistrationUuid },
          'GET'
        );

        setRegistrationContract(registrationContract);
      })();
    }
  }, [fileDownloadRegistrationUuid]);

  return (
    <div>
      {registrationContract ? (
        <Descriptions
          bordered
          className='inner-description-box'
          title='登记测试基本信息'
        >
          <Descriptions.Item label='数量' span={3}>
            {registrationContract.amount}
          </Descriptions.Item>
          <Descriptions.Item label='邮政编码' span={3}>
            {registrationContract.postalCode}
          </Descriptions.Item>
          <Descriptions.Item label='主要功能' span={3}>
            {registrationContract.mainFunction}
          </Descriptions.Item>
          <Descriptions.Item label='技术指标' span={3}>
            {registrationContract.techIndex}
          </Descriptions.Item>
        </Descriptions>
      ) : null}
    </div>
  );
};
