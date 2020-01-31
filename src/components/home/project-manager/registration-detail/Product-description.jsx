import React, { useEffect, useState } from 'react';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_FILE_URL,
  SELECT_REGISTRATION_PRODUCT_DESCRIPTION
} from '@/constants/api-constants';

// 样式
import { Icon, Button, Input } from 'antd';
import '@/style/home/project-manager/product-description.styl';
const { TextArea } = Input;

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [formProductDescriptionUrl, setFormProductDescriptionUrl] = useState(''),
    [PreviewUrl, setPreviewUrl] = useState(''),
    [getFileLoading, setGetFileLoading] = useState(true);

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetFileLoading(true);

        let registrationProductDescription = await proxyFetch(
          SELECT_REGISTRATION_PRODUCT_DESCRIPTION,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        setFormProductDescriptionUrl(registrationProductDescription.url);
        setGetFileLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  useEffect(() => {
    if (formProductDescriptionUrl) {
      (async () => {
        setGetFileLoading(true);
        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: formProductDescriptionUrl },
          'GET'
        );

        setPreviewUrl(previewUrl);
        setGetFileLoading(false);
      })();
    }
  }, [formProductDescriptionUrl]);

  return (
    <>
      <div className='subtitle-box'>
        <Link to={HOME_REGISTRATION_PROFILE.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>产品说明</p>
      </div>
      <div className='detail-description-box'>
        <div className='description-upload-button-box'>
          {formProductDescriptionUrl ? (
            <a href={PreviewUrl}>
              <Button type='primary' icon='download' loading={getFileLoading}>
                下载文件
              </Button>
            </a>
          ) : (
            <Button disabled>企业未上传</Button>
          )}
        </div>
        <div className='description-button-box'>
          <Button type='primary' htmlType='submit' className='fail-button'>
            审核不通过
          </Button>
          <Button type='primary' htmlType='submit' className='success-button'>
            审核通过
          </Button>
        </div>
        <TextArea
          autoSize={{ minRows: 3, maxRows: 6 }}
          maxLength='800'
          placeholder='请输入审核不通过理由'
          className='description-textArea-box'
        />
      </div>
    </>
  );
};
