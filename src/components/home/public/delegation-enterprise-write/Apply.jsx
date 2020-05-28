import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import { GET_REGISTRATION_APPLY_INFO } from '@/constants/api-constants';

// 样式
import { Descriptions } from 'antd';
import '@/style/home/tech-manager/info-modal.styl';

export default (props) => {
  const { fileDownloadRegistrationUuid } = useSelector(
      (state) => state.enterpriseStore
    ),
    [registrationApplyContent, setRegistrationApplyContent] = useState('');

  // 将已有的数据回显
  useEffect(() => {
    if (fileDownloadRegistrationUuid) {
      (async () => {
        let registrationApplyItem = await proxyFetch(
          GET_REGISTRATION_APPLY_INFO,
          { registrationUuid: fileDownloadRegistrationUuid },
          'GET'
        );

        setRegistrationApplyContent(registrationApplyItem?.content);
      })();
    }
  }, [fileDownloadRegistrationUuid]);

  return (
    <div>
      {registrationApplyContent ? (
        <Descriptions
          bordered
          className='inner-description-box'
          title='现场测试申请表'
        >
          <Descriptions.Item label='内容' span={3}>
            <span>{registrationApplyContent}</span>
          </Descriptions.Item>
        </Descriptions>
      ) : null}
    </div>
  );
};
