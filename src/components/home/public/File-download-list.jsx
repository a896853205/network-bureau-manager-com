import React, { useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// 请求
import { DOWNLOAD_PRODUCT } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Icon } from 'antd';
import '@/style/home/registration-file-download.styl';
import '@/style/home/item.styl';

export default props => {
  const { fileDownloadRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [productDownloadLoading, setProductDownloadLoading] = useState(false);

  const handleDownloadProduct = async () => {
    setProductDownloadLoading(true);

    const url = await proxyFetch(
      DOWNLOAD_PRODUCT,
      { registrationUuid: fileDownloadRegistrationUuid },
      'GET'
    );
    setProductDownloadLoading(false);
    window.open(url, '_blank');
  };

  return (
    <div className='item-box'>
      <h5 className='title-box'>登记测试内容文件详情</h5>
      <div>
        <ul className='file-ul'>
          <li>
            <Icon
              className='file-title-icon'
              type='reconciliation'
              theme='twoTone'
            />
            评测合同下载
          </li>
          <li>
            <div>
              <Icon
                className='file-title-icon'
                type='reconciliation'
                theme='twoTone'
              />
              <span>软件著作权证书下载</span>
            </div>
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
            <div>
              <Icon
                className='file-title-icon'
                type='reconciliation'
                theme='twoTone'
              />
              <span>产品说明下载</span>
            </div>
          </li>
          <li>
            <div>
              <Icon
                className='file-title-icon'
                type='reconciliation'
                theme='twoTone'
              />
              <span>用户文档集下载</span>
            </div>
          </li>
          <li>
            {productDownloadLoading ? (
              <div>
                <Icon
                  className='file-title-icon'
                  type='loading'
                  spin
                />
                <span>请等待...</span>
              </div>
            ) : (
              <div onClick={handleDownloadProduct}>
                <Icon
                  className='file-title-icon'
                  type='reconciliation'
                  theme='twoTone'
                />
                <span>产品介质下载</span>
              </div>
            )}
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
