import React, { useEffect, useState } from 'react';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link, useHistory } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_FILE_URL,
  SELECT_REGISTRATION_PRODUCT,
  SET_REGISTRATION_DETAIL_SUCCESS_STATUS,
  SET_REGISTRATION_DETAIL_FAIL_STATUS
} from '@/constants/api-constants';

//样式
import { Icon, Button, Tag, Input, message } from 'antd';
import '@/style/home/project-manager/product.styl';
const { TextArea } = Input;

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [formProductUrl, setFormProductUrl] = useState(''),
    [PreviewUrl, setPreviewUrl] = useState(''),
    [getFileLoading, setGetFileLoading] = useState(true),
    [statusLoading, setStatusLoading] = useState(false),
    [failText, setFailText] = useState(''),
    [status, setStatus] = useState(0),
    [statusText, setStatusText] = useState(''),
    history = useHistory();

    const statusToColor = status => {
      switch (status) {
        case 0:
          return 'gray';
        case 1:
          return 'blue';
        case 100:
          return 'green';
        case -1:
          return 'red';
        default:
          return 'gray';
      }
    };

  const handleSetSuccessStatus = () => {
    (async () => {
      setStatusLoading(true);

      await proxyFetch(SET_REGISTRATION_DETAIL_SUCCESS_STATUS, {
        registrationUuid: enterpriseRegistrationUuid,
        type: 'product'
      });

      setStatusLoading(false);
      history.push(HOME_REGISTRATION_PROFILE.path);
    })();
  };

  const handleSetFailStatus = () => {
    if (failText) {
      (async () => {
        setStatusLoading(true);

        await proxyFetch(SET_REGISTRATION_DETAIL_FAIL_STATUS, {
          registrationUuid: enterpriseRegistrationUuid,
          type: 'product',
          failText
        });

        setStatusLoading(false);
        history.push(HOME_REGISTRATION_PROFILE.path);
      })();
    } else {
      message.error('请输入未通过审核理由!');
    }
  };

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetFileLoading(true);

        let registrationProduct = await proxyFetch(
          SELECT_REGISTRATION_PRODUCT,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        if (registrationProduct) {
          setStatus(registrationProduct.status);
          setStatusText(registrationProduct.statusText);
        }

        setFormProductUrl(registrationProduct.url);
        setGetFileLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  useEffect(() => {
    if (formProductUrl) {
      (async () => {
        setGetFileLoading(true);
        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: formProductUrl },
          'GET'
        );

        setPreviewUrl(previewUrl);
        setGetFileLoading(false);
      })();
    }
  }, [formProductUrl]);

  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>
          产品介质
          <Tag className='content-tag' color={statusToColor(status)}>
            {statusText}
          </Tag>
        </p>
      </div>
      <div className='detail-product-box'>
        <div className='product-upload-button-box'>
          {formProductUrl ? (
            <a href={PreviewUrl}>
              <Button type='primary' icon='download' loading={getFileLoading}>
                下载文件
              </Button>
            </a>
          ) : (
            <Button disabled>企业未上传</Button>
          )}
        </div>
        <div className='product-button-box'>
          <Button
            disabled={!(status === 1)}
            type='primary'
            htmlType='submit'
            className={status === 1 ? 'fail-button' : ''}
            loading={statusLoading}
            onClick={handleSetFailStatus}
          >
            审核不通过
          </Button>
          <Button
            disabled={!(status === 1)}
            type='primary'
            htmlType='submit'
            className={status === 1 ? 'success-button' : ''}
            loading={statusLoading}
            onClick={handleSetSuccessStatus}
          >
            审核通过
          </Button>
        </div>
        <TextArea
          disabled={!(status === 1)}
          autoSize={{ minRows: 3, maxRows: 6 }}
          maxLength='800'
          placeholder='请输入审核不通过理由'
          className='product-textArea-box'
          onChange={e => {
            setFailText(e.target.value);
          }}
        />
      </div>
    </>
  );
};
