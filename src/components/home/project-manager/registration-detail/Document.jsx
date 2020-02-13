import React, { useEffect, useState } from 'react';

// 工具
import statusToColor from '@/components/home/project-manager/registration-detail/util/status-to-color';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link, useHistory } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_FILE_URL,
  SELECT_REGISTRATION_DOCUMENT,
  SET_REGISTRATION_DETAIL_SUCCESS_STATUS,
  SET_REGISTRATION_DETAIL_FAIL_STATUS
} from '@/constants/api-constants';

//样式
import { Icon, Button, Input, Tag, message } from 'antd';
import '@/style/home/project-manager/document.styl';
const { TextArea } = Input;

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [formDocumentUrl, setFormDocumentUrl] = useState(''),
    [PreviewUrl, setPreviewUrl] = useState(''),
    [getFileLoading, setGetFileLoading] = useState(true),
    [statusLoading, setStatusLoading] = useState(false),
    [failText, setFailText] = useState(''),
    [status, setStatus] = useState(0),
    [statusText, setStatusText] = useState(''),
    history = useHistory();

  const handleSetSuccessStatus = () => {
    (async () => {
      setStatusLoading(true);

      await proxyFetch(SET_REGISTRATION_DETAIL_SUCCESS_STATUS, {
        registrationUuid: enterpriseRegistrationUuid,
        type: 'document'
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
          type: 'document',
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

        let registrationDocument = await proxyFetch(
          SELECT_REGISTRATION_DOCUMENT,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        if (registrationDocument) {
          setStatus(registrationDocument.status);
          setStatusText(registrationDocument.statusText);
        }

        setFormDocumentUrl(registrationDocument.url);
        setGetFileLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  useEffect(() => {
    if (formDocumentUrl) {
      (async () => {
        setGetFileLoading(true);
        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: formDocumentUrl },
          'GET'
        );

        setPreviewUrl(previewUrl);
        setGetFileLoading(false);
      })();
    }
  }, [formDocumentUrl]);

  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>
          用户文档集
          <Tag className='content-tag' color={statusToColor(status)}>
            {statusText}
          </Tag>
        </p>
      </div>
      <div className='detail-document-box'>
        <div className='document-upload-button-box'>
          {formDocumentUrl ? (
            <a href={PreviewUrl}>
              <Button type='primary' icon='download' loading={getFileLoading}>
                下载文件
              </Button>
            </a>
          ) : (
            <Button disabled>企业未上传</Button>
          )}
        </div>
        <div className='document-button-box'>
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
          className='document-textArea-box'
          onChange={e => {
            setFailText(e.target.value);
          }}
        />
      </div>
    </>
  );
};
