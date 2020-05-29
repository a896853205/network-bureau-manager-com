import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import { GET_DELEGATION_APPLY_INFO } from '@/constants/api-constants';

// 样式
import { Descriptions } from 'antd';
import '@/style/home/tech-manager/info-modal.styl';

export default (props) => {
  const { fileDownloadDelegationUuid } = useSelector(
      (state) => state.enterpriseStore
    ),
    [delegationApplyContent, setDelegationApplyContent] = useState('');

  // 将已有的数据回显
  useEffect(() => {
    if (fileDownloadDelegationUuid) {
      (async () => {
        let delegationApplyItem = await proxyFetch(
          GET_DELEGATION_APPLY_INFO,
          { delegationUuid: fileDownloadDelegationUuid },
          'GET'
        );

        setDelegationApplyContent(delegationApplyItem?.content);
      })();
    }
  }, [fileDownloadDelegationUuid]);

  return (
    <div>
      {delegationApplyContent ? (
        <Descriptions
          bordered
          className='inner-description-box'
          title='现场测试申请表'
        >
          <Descriptions.Item label='内容' span={3}>
            <span>{delegationApplyContent}</span>
          </Descriptions.Item>
        </Descriptions>
      ) : null}
    </div>
  );
};
