import React, { useState, useEffect } from 'react';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// 算法
import { getAuthortyNameByCode } from '@/constants/auth-constants';

// 请求
import proxyFetch from '@/util/request';
import { QUERY_FINANCE_MANAGER } from '@/constants/api-constants';

//样式
import { Icon, Table } from 'antd';
import '@/style/home/project-manager/apply.styl';
const { Column } = Table;

export default props => {
  const [loading, setLoading] = useState(true),
    [financeManagerList, setFinanceManagerList] = useState([]),
    [total, setTotal] = useState(0),
    [pageSize, setPageSize] = useState(1),
    [page, setPage] = useState(1),
    [isRefresh, setIsRefresh] = useState(true);

  /**
   * 当前没有数据时向前一页查询
   */
  useEffect(() => {
    if (financeManagerList.length === 0) {
      if (page !== 1) {
        setPage(page - 1);
      }
    }
  }, [financeManagerList, page]);

  useEffect(() => {
    setIsRefresh(true);
  }, [page]);

  useEffect(() => {
    (async () => {
      if (isRefresh) {
        setLoading(true);
        const { financeManagerList, total, pageSize } = await proxyFetch(
          QUERY_FINANCE_MANAGER,
          {
            page
          },
          'GET'
        );

        setFinanceManagerList(financeManagerList);
        setTotal(total);
        setPageSize(pageSize);
        setLoading(false);
        setIsRefresh(false);
      }
    })();
  }, [page, isRefresh]);
  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>选择负责的财务人员</p>
      </div>
      <div className='manager-show-box'>
        <Table
          dataSource={financeManagerList}
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
          <Column title='账号' dataIndex='username' key='username' />
          <Column title='姓名' dataIndex='name' key='name' />
          <Column title='电话' dataIndex='phone' key='phone' />
          <Column
            title='权限'
            dataIndex='role'
            key='role'
            render={(text, record) => (
              <span> {getAuthortyNameByCode(text)} </span>
            )}
          />
        </Table>
      </div>
    </>
  );
};
