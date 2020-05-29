import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import { GET_DELEGATION_CONTRACT_INFO } from '@/constants/api-constants';

// 样式
import { Descriptions } from 'antd';
import '@/style/home/tech-manager/info-modal.styl';

export default (props) => {
  const { fileDownloadDelegationUuid } = useSelector(
      (state) => state.enterpriseStore
    ),
    [delegationContract, setDelegationContract] = useState([]);

  // 将已有的数据回显
  useEffect(() => {
    if (fileDownloadDelegationUuid) {
      (async () => {
        let delegationContract = await proxyFetch(
          GET_DELEGATION_CONTRACT_INFO,
          { delegationUuid: fileDownloadDelegationUuid },
          'GET'
        );

        setDelegationContract(delegationContract);
      })();
    }
  }, [fileDownloadDelegationUuid]);

  return (
    <div>
      {delegationContract ? (
        <Descriptions
          bordered
          className='inner-description-box'
          title='登记测试基本信息'
        >
          <Descriptions.Item label='数量' span={3}>
            {delegationContract.amount}
          </Descriptions.Item>
          <Descriptions.Item label='邮政编码' span={3}>
            {delegationContract.postalCode}
          </Descriptions.Item>
          <Descriptions.Item label='主要功能' span={3}>
            {delegationContract.mainFunction}
          </Descriptions.Item>
          <Descriptions.Item label='技术指标' span={3}>
            {delegationContract.techIndex}
          </Descriptions.Item>
        </Descriptions>
      ) : null}
    </div>
  );
};
