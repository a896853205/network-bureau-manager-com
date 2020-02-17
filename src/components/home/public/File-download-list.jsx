import React, { useState, useEffect } from 'react';

// redux
import { useSelector } from 'react-redux';

// 请求
import {
  GET_FILE_URL,
  GET_REGISTRATION_FILE_BY_FILE_DOWNLOAD_REGISTRATION_UUID
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
    [copyrightUrl, setCopyrightUrl] = useState(''),
    [CopyrightPreviewUrl, setCopyrightPreviewUrl] = useState(''),
    [getCopyrightFileLoading, setGetCopyrightFileLoading] = useState(true);
/*
  // 将已有的数据回显
  useEffect(() => {
    if (fileDownloadRegistrationUuid) {
      (async () => {
        setGetCopyrightFileLoading(true);

        let { copyrightUrl, productDescriptionUrl, documentUrl, productUrl } = await proxyFetch(
          GET_REGISTRATION_FILE_BY_FILE_DOWNLOAD_REGISTRATION_UUID,
          { registrationUuid: fileDownloadRegistrationUuid },
          'GET'
        );

        setCopyrightUrl(copyrightUrl);
        setGetCopyrightFileLoading(false);
      })();
    }
  }, [fileDownloadRegistrationUuid]);
*/
  useEffect(() => {
    if (copyrightUrl) {
      (async () => {
        setGetCopyrightFileLoading(true);
        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: copyrightUrl },
          'GET'
        );

        setCopyrightPreviewUrl(previewUrl);
        setGetCopyrightFileLoading(false);
      })();
    }
  }, [copyrightUrl]);
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
            {copyrightUrl ? (
              <a href={CopyrightPreviewUrl}>
                <div loading={getCopyrightFileLoading}>
                  <Icon
                    className='file-title-icon'
                    type='reconciliation'
                    theme='twoTone'
                  />
                  软件著作权证书下载
                </div>
              </a>
            ) : (
              <div>
                <Icon
                  className='file-title-icon'
                  type='reconciliation'
                  theme='twoTone'
                />
                软件著作权证书下载
              </div>
            )}
          </li>
          <li>
            <Icon
              className='file-title-icon'
              type='reconciliation'
              theme='twoTone'
            />
            样品登记表下载
          </li>
          <li>
            <Icon
              className='file-title-icon'
              type='reconciliation'
              theme='twoTone'
            />
            产品说明下载
          </li>
          <li>
            <Icon
              className='file-title-icon'
              type='reconciliation'
              theme='twoTone'
            />
            用户文档集下载
          </li>
          <li>
            <Icon
              className='file-title-icon'
              type='reconciliation'
              theme='twoTone'
            />
            产品介质下载
          </li>
          <li>
            <Icon
              className='file-title-icon'
              type='reconciliation'
              theme='twoTone'
            />
            现场测试申请表下载
          </li>
        </ul>
      </div>
    </div>
  );
};
