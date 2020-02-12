import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  QUARY_REGISTRATION_PAYMENT,
  ACCOUNTANT_CONFIRM_PAYMENT
} from '@/constants/api-constants';

//样式
import { Table, Button, Modal, Icon } from 'antd';
import '@/style/home/accountant-manager/registration-finance.styl';
import '@/style/home/item.styl';
const { Column } = Table;
const { confirm } = Modal;

export default props => {
  const [loading, setLoading] = useState(true),
    [paymentList, setPaymentList] = useState([]),
    [total, setTotal] = useState(0),
    [pageSize, setPageSize] = useState(1),
    [updateStatusLoading, setUpdateStatusLoading] = useState(false),
    [isNeedRefresh, setIsNeedRefresh] = useState(false),
    [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { paymentList, total, pageSize } = await proxyFetch(
        QUARY_REGISTRATION_PAYMENT,
        {
          page
        },
        'GET'
      );

      setPaymentList(paymentList);
      setTotal(total);
      setPageSize(pageSize);
      setLoading(false);
      setIsNeedRefresh(false);
    })();
  }, [page, isNeedRefresh]);

  const handleUpdateStatus = registrationUuid => {
    (async () => {
      setUpdateStatusLoading(true);

      await proxyFetch(
        ACCOUNTANT_CONFIRM_PAYMENT,
        {
          registrationUuid
        },
        'PUT'
      );

      setIsNeedRefresh(true);
      setUpdateStatusLoading(false);
    })();
  };

  return (
    <div className='item-box'>
      <div className='subtitle-box'>
        <p className='subtitle-title'>财务审核</p>
      </div>
      <div className='finance-show-box'>
        <Table
          dataSource={paymentList}
          className='table'
          rowKey={record => record.uuid}
          loading={loading}
          pagination={{
            current: page,
            total,
            pageSize,
            onChange: page => {
              setPage(page);
            }
          }}
        >
          <Column
            title='合同编号'
            dataIndex='enterpriseRegistrationContract.contractCode'
            key='enterpriseRegistrationContract.contractCode'
          />
          <Column
            title='企业名称'
            dataIndex='enterpriseRegistrationBasic.enterpriseName'
            key='enterpriseRegistrationBasic.enterpriseName'
          />
          <Column
            title='电话'
            dataIndex='enterpriseRegistrationBasic.phone'
            key='enterpriseRegistrationBasic.phone'
          />
          <Column
            title='缴费状态'
            dataIndex='enterpriseRegistrationStep.statusText'
            key='statusText'
            render={(text, record) => (
              <span className='payment-box'>
                {record?.['enterpriseRegistrationStep.statusText']}
                {record?.['enterpriseRegistrationStep.status'] === 3 ? (
                  <Icon
                    type='exclamation-circle'
                    className='success-icon'
                    theme='twoTone'
                    twoToneColor='#fadb14'
                  />
                ) : null}
                {record?.['enterpriseRegistrationStep.status'] === 4 ? (
                  <Icon
                    type='check-circle'
                    className='success-icon'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                ) : null}
              </span>
            )}
          />
          <Column
            align='center'
            title='操作'
            dataIndex='uuid'
            key='uuid'
            render={(text, record) => (
              <Button
                type='primary'
                onClick={() => {
                  confirm({
                    title: '确定已收到汇款?',
                    content: '财务管理员核对确认后方可确认收款',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                      handleUpdateStatus(record.uuid);
                    },
                    onCancel() {}
                  });
                }}
                loading={updateStatusLoading}
              >
                确认收款
              </Button>
            )}
          />
        </Table>
      </div>
    </div>
  );
};
