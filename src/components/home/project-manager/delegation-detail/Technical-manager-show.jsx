import React, { useState, useEffect } from 'react';

// 路由
import { HOME_DELEGATION_PROFILE } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// 工具
import { getAuthortyNameByCode } from '@/constants/auth-constants';

// 请求
import proxyFetch from '@/util/request';
import {
  QUERY_TECH_LEADER_MANAGER,
  ARRANGE_DELEGATION_TECH_LEADER_MANAGER,
  SELECT_DELEGATION_TECH_LEAD_MANAGER_UUID
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 样式
import { Icon, Table } from 'antd';
import '@/style/home/project-manager/tech-leader-manager-show.styl';
const { Column } = Table;

export default props => {
  const {
      delegationSteps,
      enterpriseDelegationUuid,
      delegationLoading
    } = useSelector(state => state.enterpriseStore),
    [loading, setLoading] = useState(true),
    [technicalManagerList, setTechnicalManagerList] = useState([]),
    [total, setTotal] = useState(0),
    [pageSize, setPageSize] = useState(1),
    [page, setPage] = useState(1),
    [techLeaderManagerUuid, setTechLeaderManagerUuid] = useState(''),
    [isNeedFresh, setIsNeedFresh] = useState(true),
    [savaDataLoading, setSavaDataLoading] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { technicalManagerList, total, pageSize } = await proxyFetch(
        QUERY_TECH_LEADER_MANAGER,
        {
          page
        },
        'GET'
      );

      setTechnicalManagerList(technicalManagerList);
      setTotal(total);
      setPageSize(pageSize);
      setLoading(false);
    })();
  }, [page]);

  useEffect(() => {
    (async () => {
      if (isNeedFresh) {
        setSavaDataLoading(true);
        const techLeaderManagerUuid = await proxyFetch(
          SELECT_DELEGATION_TECH_LEAD_MANAGER_UUID,
          {
            delegationUuid: enterpriseDelegationUuid
          },
          'GET'
        );
        setTechLeaderManagerUuid(techLeaderManagerUuid);
        setIsNeedFresh(false);
        setSavaDataLoading(false);
      }
    })();
  }, [enterpriseDelegationUuid, isNeedFresh]);

  // 确认选择提交按钮
  const handleUpdateStep = technicalManagerUuid => {
    (async () => {
      setSavaDataLoading(true);

      let res = await proxyFetch(ARRANGE_DELEGATION_TECH_LEADER_MANAGER, {
        delegationUuid: enterpriseDelegationUuid,
        technicalManagerUuid
      });
      setIsNeedFresh(true);
      setSavaDataLoading(false);

      if (res) {
        dispatch(enterpriseAction.asyncSetDelegationSteps(enterpriseDelegationUuid));
      }
    })();
  };

  return (
    <>
      <div className='subtitle-box'>
        <Link to={HOME_DELEGATION_PROFILE.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>选择技术负责人</p>
      </div>
      <div className='techLeader-manager-show-box'>
        <Table
          dataSource={technicalManagerList}
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
          rowSelection={{
            type: 'radio',
            onChange: selectedRowKeys => {
              handleUpdateStep(selectedRowKeys[0]);
            },
            columnTitle: '选择',
            columnWidth: '100px',
            selectedRowKeys: [techLeaderManagerUuid],
            getCheckboxProps: () => ({
              disabled:
                savaDataLoading ||
                delegationLoading ||
                !techLeaderManagerUuid ||
                (delegationSteps[3]?.status !== 1 && delegationSteps[3]?.status !== 2)
            })
          }}
        >
          <Column title='账号' dataIndex='username' key='username' />
          <Column title='姓名' dataIndex='name' key='name' />
          <Column title='电话' dataIndex='phone' key='phone' />
          <Column
            title='权限'
            dataIndex='role'
            key='role'
            render={text => <span> {getAuthortyNameByCode(text)} </span>}
          />
        </Table>
      </div>
    </>
  );
};
