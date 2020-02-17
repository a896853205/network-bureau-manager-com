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
    [productDescriptionUrl, setProductDescriptionUrl] = useState(''),
    [documentUrl, setDocumentUrl] = useState(''),
    [productUrl, setProductUrl] = useState(''),
    [CopyrightPreviewUrl, setCopyrightPreviewUrl] = useState(''),
    [productDescriptionPreviewUrl, setProductDescriptionPreviewUrl] = useState(
      ''
    ),
    [documentPreviewUrl, setDocumentPreviewUrl] = useState(''),
    [productPreviewUrl, setProductPreviewUrl] = useState(''),
    [getFileLoading, setGetFileLoading] = useState(true);

  // 将已有的数据回显
  useEffect(() => {
    if (fileDownloadRegistrationUuid) {
      (async () => {
        setGetFileLoading(true);

        let {
          copyrightUrl,
          productDescriptionUrl,
          documentUrl,
          productUrl
        } = await proxyFetch(
          GET_REGISTRATION_FILE_BY_FILE_DOWNLOAD_REGISTRATION_UUID,
          { registrationUuid: fileDownloadRegistrationUuid },
          'GET'
        );

        setCopyrightUrl(copyrightUrl);
        setProductDescriptionUrl(productDescriptionUrl);
        setDocumentUrl(documentUrl);
        setProductUrl(productUrl);
        setGetFileLoading(false);
      })();
    }
  }, [fileDownloadRegistrationUuid]);

  useEffect(() => {
    if (copyrightUrl) {
      (async () => {
        setGetFileLoading(true);
        const [
          CopyrightPreviewUrl,
          productDescriptionPreviewUrl,
          documentPreviewUrl,
          productPreviewUrl
        ] = await Promise.all([
          proxyFetch(GET_FILE_URL, { fileUrl: copyrightUrl }, 'GET'),
          proxyFetch(GET_FILE_URL, { fileUrl: productDescriptionUrl }, 'GET'),
          proxyFetch(GET_FILE_URL, { fileUrl: documentUrl }, 'GET'),
          proxyFetch(GET_FILE_URL, { fileUrl: productUrl }, 'GET')
        ]);

        setCopyrightPreviewUrl(CopyrightPreviewUrl);
        setProductDescriptionPreviewUrl(productDescriptionPreviewUrl);
        setDocumentPreviewUrl(documentPreviewUrl);
        setProductPreviewUrl(productPreviewUrl);
        setGetFileLoading(false);
      })();
    }
  }, [copyrightUrl, productDescriptionUrl, documentUrl, productUrl]);

  return (
    <div className='item-box'>
      <h5 className='title-box'>登记测试内容文件详情</h5>
      <div>
        <ul className='file-ul' loading={getFileLoading}>
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
                <div>
                  <Icon
                    className='file-title-icon'
                    type='reconciliation'
                    theme='twoTone'
                  />
                  <span>软件著作权证书下载</span>
                </div>
              </a>
            ) : (
              <div>
                <Icon
                  className='file-title-icon'
                  type='reconciliation'
                  theme='twoTone'
                />
                <span>软件著作权证书下载</span>
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
            {productDescriptionUrl ? (
              <a
                href={productDescriptionPreviewUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                <div>
                  <Icon
                    className='file-title-icon'
                    type='reconciliation'
                    theme='twoTone'
                  />
                  <span>产品说明下载</span>
                </div>
              </a>
            ) : (
              <div>
                <Icon
                  className='file-title-icon'
                  type='reconciliation'
                  theme='twoTone'
                />
                <span>产品说明下载</span>>
              </div>
            )}
          </li>
          <li>
            {documentUrl ? (
              <a
                href={documentPreviewUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                <div>
                  <Icon
                    className='file-title-icon'
                    type='reconciliation'
                    theme='twoTone'
                  />
                  <span>用户文档集下载</span>
                </div>
              </a>
            ) : (
              <div>
                <Icon
                  className='file-title-icon'
                  type='reconciliation'
                  theme='twoTone'
                />
                <span>用户文档集下载</span>
              </div>
            )}
          </li>
          <li>
            {productUrl ? (
              <a href={productPreviewUrl}>
                <div>
                  <Icon
                    className='file-title-icon'
                    type='reconciliation'
                    theme='twoTone'
                  />
                  <span>产品介质下载</span>
                </div>
              </a>
            ) : (
              <div>
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
