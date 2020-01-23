import React, { useState, useEffect } from 'react';

// 请求
import {
  QUERY_REGISTRATION,
  QUERY_SYS_REGISTRATION_STEP
} from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Table, Button } from 'antd';

const { Column } = Table;

export default props => {
  const [loading, setLoading] = useState(true),
    [enterpriseRegistrationList, setEnterpriseRegistrationList] = useState([]),
    [total, setTotal] = useState(0),
    [pageSize, setPageSize] = useState(1),
    [page, setPage] = useState(1),
    [sysRegistrationStepList, setSysRegistrationStepList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { enterpriseRegistrationList, total, pageSize } = await proxyFetch(
        QUERY_REGISTRATION,
        {
          page
        },
        'GET'
      );

      setEnterpriseRegistrationList(enterpriseRegistrationList);
      setTotal(total);
      setPageSize(pageSize);
      setLoading(false);
    })();
  }, [page]);

  useEffect(() => {
    (async () => {
      const sysRegistrationStepList = await proxyFetch(
        QUERY_SYS_REGISTRATION_STEP,
        {},
        'GET'
      );

      setSysRegistrationStepList(sysRegistrationStepList);
    })();
  }, []);

  return (
    <div className='query-registion-box'>
      <Table
        dataSource={enterpriseRegistrationList}
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
        <Column title='登记测试项目名称' dataIndex='name' key='name' />
        <Column
          title='最新进展'
          dataIndex='currentStep'
          key='currentStep'
          render={(text, record) => (
            <span>
              {sysRegistrationStepList[text - 1] &&
                sysRegistrationStepList[text - 1].name}
            </span>
          )}
        />
        <Column
          align='center'
          title='查看详情'
          dataIndex='uuid'
          key='uuid'
          render={(text, record) => <Button type='link'>查看详情</Button>}
        />
      </Table>
    </div>
  );
};
