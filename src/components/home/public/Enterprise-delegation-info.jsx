// import React from 'react';

// export default props => {
//   return <></>;
// };

import React, { useState, useEffect } from 'react';

// redux
import { useSelector } from 'react-redux';

// 请求
import { SELECT_ENTERPRISE_INFO_BY_FILE_DOWNLOAD_DELEGATION_UUID } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Descriptions, Skeleton } from 'antd';
import '@/style/home/delegation-file-download.styl';
import '@/style/home/enterprise-info.styl';
import '@/style/home/item.styl';

export default props => {
  const { fileDownloadDelegationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [getDataLoading, setGetDataLoading] = useState(false),
    [enterpriseInfo, setEnterpriseInfo] = useState('');

  useEffect(() => {
    (async () => {
      if (fileDownloadDelegationUuid) {
        setGetDataLoading(true);

        // #FIXME 需要将此路由修改为(管理员权限)限制
        const enterpriseInfo = await proxyFetch(
          SELECT_ENTERPRISE_INFO_BY_FILE_DOWNLOAD_DELEGATION_UUID,
          { delegationUuid: fileDownloadDelegationUuid },
          'GET'
        );

        setEnterpriseInfo(enterpriseInfo);
        setGetDataLoading(false);
      }
    })();
  }, [fileDownloadDelegationUuid]);

  return (
    <div className='item-box enterprise-info'>
      <h5 className='title-box'>企业信息</h5>
      <Skeleton loading={getDataLoading}>
        {enterpriseInfo ? (
          <div className='detail-basic-box'>
            <Descriptions bordered className='basic-description-box'>
              <Descriptions.Item label='用户名'>
                {enterpriseInfo.name}
              </Descriptions.Item>
              <Descriptions.Item label='联系电话' span={2}>
                {enterpriseInfo.phone}
              </Descriptions.Item>
              <Descriptions.Item label='社会统一信用代码' span={3}>
                {enterpriseInfo.code}
              </Descriptions.Item>
            </Descriptions>
          </div>
        ) : null}
      </Skeleton>
    </div>
  );
};

