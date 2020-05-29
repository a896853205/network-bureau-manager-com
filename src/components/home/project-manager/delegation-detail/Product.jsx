import React, { useEffect, useState } from 'react';

// 工具
import statusToColor from '@/components/home/project-manager/delegation-detail/util/status-to-color';

// 路由
import { HOME_DELEGATION_PROFILE } from '@/constants/route-constants';
import { Link, useHistory } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_FILE_URL,
  SELECT_DELEGATION_PRODUCT,
  SET_DELEGATION_DETAIL_SUCCESS_STATUS,
  SET_DELEGATION_DETAIL_FAIL_STATUS
} from '@/constants/api-constants';

//样式
import { Icon, Button, Tag, Input, message } from 'antd';
import '@/style/home/project-manager/product.styl';
const { TextArea } = Input;

export default props => {
  const { enterpriseDelegationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [formProductUrl, setFormProductUrl] = useState(''),
    [PreviewUrl, setPreviewUrl] = useState(''),
    [getFileLoading, setGetFileLoading] = useState(true),
    [statusLoading, setStatusLoading] = useState(false),
    [failText, setFailText] = useState(''),
    [status, setStatus] = useState(0),
    [statusText, setStatusText] = useState(''),
    dispatch = useDispatch(),
    history = useHistory();

  const handleSetSuccessStatus = () => {
    (async () => {
      setStatusLoading(true);

      await proxyFetch(SET_DELEGATION_DETAIL_SUCCESS_STATUS, {
        delegationUuid: enterpriseDelegationUuid,
        type: 'product'
      });

      setStatusLoading(false);
      dispatch(enterpriseAction.asyncSetDelegationSteps(enterpriseDelegationUuid));
      history.push(HOME_DELEGATION_PROFILE.path);
    })();
  };

  const handleSetFailStatus = () => {
    if (failText) {
      (async () => {
        setStatusLoading(true);

        const res = await proxyFetch(SET_DELEGATION_DETAIL_FAIL_STATUS, {
          delegationUuid: enterpriseDelegationUuid,
          type: 'product',
          failText
        });

        setStatusLoading(false);
        if (res) {
          history.push(HOME_DELEGATION_PROFILE.path);
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

        let delegationProduct = await proxyFetch(
          SELECT_DELEGATION_PRODUCT,
          { delegationUuid: enterpriseDelegationUuid },
          'GET'
        );

        if (delegationProduct) {
          setStatus(delegationProduct.status);
          setStatusText(delegationProduct.statusText);
        }

        setFormProductUrl(delegationProduct.url);
        setGetFileLoading(false);
      })();
    }
  }, [enterpriseDelegationUuid]);

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
        <Link to={`${HOME_DELEGATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>
          样品
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
            disabled={status !== 2}
            type='primary'
            htmlType='submit'
            className={status === 2 ? 'fail-button' : ''}
            loading={statusLoading}
            onClick={handleSetFailStatus}
          >
            审核不通过
          </Button>
          <Button
            disabled={status !== 2}
            type='primary'
            htmlType='submit'
            className={status === 2 ? 'success-button' : ''}
            loading={statusLoading}
            onClick={handleSetSuccessStatus}
          >
            审核通过
          </Button>
        </div>
        <TextArea
          disabled={status !== 2}
          autoSize={{ minRows: 3, maxRows: 6 }}
          maxLength='100'
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
