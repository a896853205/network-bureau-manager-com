import React, { useState, useEffect } from 'react';

// 请求
import { QUERY_MANAGER, DELETE_MANAGER } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Icon, Table, Modal } from 'antd';
import '@/style/home/super-manager/manager-show.styl';

// 算法
import { getAuthortyNameByCode } from '@/constants/auth-constants';

// 路由
import { HOME_MANAGER_UPDATE } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

const { Column } = Table;
const { confirm } = Modal;

export default props => {
  const [loading, setLoading] = useState(true),
    [managerList, setManagerList] = useState([]),
    [total, setTotal] = useState(0),
    [pageSize, setPageSize] = useState(1),
    [page, setPage] = useState(1),
    [deleteUuid, setDeleteUuid] = useState(''),
    [isRefresh, setIsRefresh] = useState(true);

  useEffect(() => {
    (async () => {
      if (deleteUuid) {
        setLoading(true);
        
        await proxyFetch(DELETE_MANAGER, { managerUuid: deleteUuid }, 'DELETE');

        setLoading(false);
        setIsRefresh(true);
      }
    })();

    // 删除之后将uuid清空
    return () => {
      setDeleteUuid('');
    };
  }, [deleteUuid]);

  /**
   * 当前没有数据时向前一页查询
   */
  useEffect(() => {
    if (managerList.length === 0) {
      if (page !== 1) {
        setPage(page - 1);
      }
    }
  }, [managerList, page]);

  useEffect(() => {
    setIsRefresh(true);
  }, [page]);

  useEffect(() => {
    (async () => {
      if (isRefresh) {
        setLoading(true);
        const { managerList, total, pageSize } = await proxyFetch(
          QUERY_MANAGER,
          {
            page
          },
          'GET'
        );

        setManagerList(managerList);
        setTotal(total);
        setPageSize(pageSize);
        setLoading(false);
        setIsRefresh(false);
      }
    })();
  }, [page, isRefresh]);

  return (
    <div className='manager-show-box'>
      <Table
        dataSource={managerList}
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
        <Column
          title='操作'
          dataIndex=''
          key='operations'
          render={(text, record) => (
            <span className='icon-box'>
              <Link to={`${HOME_MANAGER_UPDATE.path}/${record.uuid}`}>
                <Icon type='edit' className='icon' />
              </Link>
              <Icon
                type='delete'
                className='icon'
                onClick={() => {
                  confirm({
                    title: '确定要删除吗?',
                    content: '管理员数据删除之后将无法恢复',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                      setDeleteUuid(record.uuid);
                    },
                    onCancel() {}
                  });
                }}
              />
            </span>
          )}
        />
      </Table>
    </div>
  );
};
