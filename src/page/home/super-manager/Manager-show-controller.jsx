import React, { useState, useEffect } from 'react';

// 请求
import { QUERY_MANAGER } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Icon, Table } from 'antd';
import '@/style/home/super-manager/manager-show.styl';

const { Column } = Table;

export default props => {
  const [loading, setLoading] = useState(true),
    [managerList, setManagerList] = useState([]),
    [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const managerList = await proxyFetch(
        QUERY_MANAGER,
        {
          page
        },
        'GET'
      );

      setManagerList(managerList);
      setLoading(false);
    })();
  }, [page]);

  return (
    <div className='manager-show-box'>
      <Table
        dataSource={managerList}
        className='table'
        rowKey={record => record.uuid}
        loading={loading}
        pagination={{
          current: page,
          total: 20,
          pageSize: 10,
          onChange: page => {
            setPage(page);
          }
        }}
      >
        <Column title='账号' dataIndex='username' key='username' />
        <Column title='姓名' dataIndex='name' key='name' />
        <Column title='电话' dataIndex='phone' key='phone' />
        <Column title='权限' dataIndex='role' key='role' />
        <Column
          title='操作'
          dataIndex=''
          key='operations'
          render={(text, record) => (
            <span className='icon-box'>
              <a href='/'>
                <Icon type='edit' className='icon' />
              </a>
              <a href='/'>
                <Icon type='delete' className='icon' />
              </a>
            </span>
          )}
        />
      </Table>
    </div>
  );
};
