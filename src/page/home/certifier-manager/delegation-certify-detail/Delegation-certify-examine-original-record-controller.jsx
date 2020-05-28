import React, { useEffect, useState } from 'react';

// 路由
import { HOME_DELEGATION_CERTIFY_PROFILE } from '@/constants/route-constants';
import { Link, useHistory } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_FILE_URL,
  GET_CERTIFIER_DELEGATION_RECORD,
  SET_CERTIFIER_DELEGATION_RECORD_SUCCESS_STATUS,
  SET_CERTIFIER_DELEGATION_RECORD_FAIL_STATUS,
} from '@/constants/api-constants';

//样式
import { Icon, Button, Tag, Input, message } from 'antd';
import '@/style/home/certifier-manager/delegation-certify-examine-original-record.styl';
const { TextArea } = Input;

export default (props) => {
  const { enterpriseDelegationUuid } = useSelector(
      (state) => state.enterpriseStore
    ),
    [formUrl, setFormUrl] = useState(''),
    [PreviewUrl, setPreviewUrl] = useState(''),
    [getFileLoading, setGetFileLoading] = useState(true),
    [statusLoading, setStatusLoading] = useState(false),
    [failText, setFailText] = useState(''),
    [status, setStatus] = useState(0),
    history = useHistory();

  const statusToColor = (manager, status = 0) => {
    if (status === -manager) {
      return 'red';
    } else if (status === manager) {
      return 'blue';
    } else if (status > manager || -status > manager) {
      return 'green';
    } else {
      return 'gray';
    }
  };

  const statusToText = (manager, status = 0) => {
    if (status === -manager) {
      return '审核未通过';
    } else if (status === manager) {
      return '审核中';
    } else if (status > manager || -status > manager) {
      return '审核通过';
    } else {
      return '未开始';
    }
  };

  const handleSetSuccessStatus = () => {
    (async () => {
      setStatusLoading(true);

      await proxyFetch(
        SET_CERTIFIER_DELEGATION_RECORD_SUCCESS_STATUS,
        {
          delegationUuid: enterpriseDelegationUuid,
        },
        'PUT'
      );

      setStatusLoading(false);
      history.push(HOME_DELEGATION_CERTIFY_PROFILE.path);
    })();
  };

  const handleSetFailStatus = () => {
    if (failText) {
      (async () => {
        setStatusLoading(true);

        const res = await proxyFetch(
          SET_CERTIFIER_DELEGATION_RECORD_FAIL_STATUS,
          {
            delegationUuid: enterpriseDelegationUuid,
            failText,
          },
          'PUT'
        );

        setStatusLoading(false);
        if (res) {
          history.push(HOME_DELEGATION_CERTIFY_PROFILE.path);
        }
      })();
    } else {
      message.error('请输入未通过审核理由!');
    }
  };

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseDelegationUuid) {
      (async () => {
        setGetFileLoading(true);

        let record = await proxyFetch(
          GET_CERTIFIER_DELEGATION_RECORD,
          { delegationUuid: enterpriseDelegationUuid },
          'GET'
        );

        if (record) {
          setStatus(record.status);
        }

        setFormUrl(record.url);
        setGetFileLoading(false);
      })();
    }
  }, [enterpriseDelegationUuid]);

  useEffect(() => {
    if (formUrl) {
      (async () => {
        setGetFileLoading(true);
        const previewUrl = await proxyFetch(
          GET_FILE_URL,
          { fileUrl: formUrl },
          'GET'
        );

        setPreviewUrl(previewUrl);
        setGetFileLoading(false);
      })();
    }
  }, [formUrl]);

  return (
    <div className='item-box delegation-certify-examine-record-box'>
      <p className='title-box'>
        <span>技术负责人审核</span>
      </p>
      <div className='subtitle-box'>
        <Link to={`${HOME_DELEGATION_CERTIFY_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>
          现场测试原始记录
          <Tag className='content-tag' color={statusToColor(2, status)}>
            {statusToText(2, status)}
          </Tag>
        </p>
      </div>
      <div className='detail-record-box'>
        <div className='record-upload-button-box'>
          {formUrl ? (
            <a
              href={`http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                PreviewUrl
              )}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button type='primary' icon='download' loading={getFileLoading}>
                下载文件
              </Button>
            </a>
          ) : (
            <Button disabled>企业未上传</Button>
          )}
        </div>
        <div className='record-button-box'>
          <Button
            disabled={status !== 3}
            type='primary'
            htmlType='submit'
            className={status === 3 ? 'fail-button' : ''}
            loading={statusLoading}
            onClick={handleSetFailStatus}
          >
            审核不通过
          </Button>
          <Button
            disabled={status !== 3}
            type='primary'
            htmlType='submit'
            className={status === 3 ? 'success-button' : ''}
            loading={statusLoading}
            onClick={handleSetSuccessStatus}
          >
            审核通过
          </Button>
        </div>
        <TextArea
          disabled={status !== 3}
          autoSize={{ minRows: 3, maxRows: 6 }}
          maxLength='100'
          placeholder='请输入审核不通过理由'
          className='record-textArea-box'
          onChange={(e) => {
            setFailText(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
