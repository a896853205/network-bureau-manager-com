import React, { useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// 请求
import {
  DOWNLOAD_PRODUCT,
  DOWNLOAD_PRODUCT_DESCRIPTION,
  DOWNLOAD_DOCUMENT,
  DOWNLOAD_COPYRIGHT,
  DOWNLOAD_CONTRACT
} from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Icon } from 'antd';
import '@/style/home/registration-file-download.styl';
import '@/style/home/item.styl';

export default props => {
  const { fileDownloadRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [contractDownloadLoading, setContractDownloadLoading] = useState(false);

  const handleDownloadContract = async () => {
    setContractDownloadLoading(true);

    const url = await proxyFetch(
      DOWNLOAD_CONTRACT,
      { registrationUuid: fileDownloadRegistrationUuid },
      'GET'
    );
    setContractDownloadLoading(false);
    window.open(url, '_blank');
  };

  return (
    <div className='item-box file-download-list'>
      <h5 className='title-box'>登记测试内容文件详情</h5>
      <div>
        <ul className='file-ul'>
          <li>
            {contractDownloadLoading ? (
              <div>
                <Icon className='file-title-icon' type='loading' spin />
                <span>请等待...</span>
              </div>
            ) : (
              <div onClick={handleDownloadContract}>
                <Icon
                  className='file-title-icon'
                  type='reconciliation'
                  theme='twoTone'
                />
                评测合同下载
              </div>
            )}
          </li>
          <li>
            <Icon
              className='file-title-icon'
              type='reconciliation'
              theme='twoTone'
            />
            <span>样品登记表下载</span>
          </li>
          <li>
            <Icon
              className='file-title-icon'
              type='reconciliation'
              theme='twoTone'
            />
            <span>现场测试申请表下载</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
