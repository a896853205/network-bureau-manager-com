import React, { useState, useEffect } from 'react';

// 路由
import { HOME_REGISTRATION_TASK_LIST } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// 工具
import { getAuthortyNameByCode } from '@/constants/auth-constants';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// 请求
import proxyFetch from '@/util/request';
import {
  QUERY_TECH_MANAGER,
  ARRANGE_TECH_MANAGER,
  QUERY_TECH_LEADER_ENTERPRISE_REGISTRATION_STEP,
  SELECT_REGISTRATION_TECH_MANAGER_UUID
} from '@/constants/api-constants';

// 样式
import { Icon, Table } from 'antd';
import '@/style/home/project-manager/tech-leader-manager-show.styl';
import '@/style/home/item.styl';
const { Column } = Table;

export default props => {
  const localStorageTechLeaderRegistrationUuid = window.localStorage.getItem(
      `${LOCAL_STORAGE}-techLeaderRegistrationUuid`
    ),
    [loading, setLoading] = useState(true),
    [techManagerList, setTechManagerList] = useState([]),
    [total, setTotal] = useState(0),
    [pageSize, setPageSize] = useState(1),
    [page, setPage] = useState(1),
    [stepsList, setStepsList] = useState([]),
    [techManagerUuid, setTechManagerUuid] = useState([]),
    [isNeedFresh, setIsNeedFresh] = useState(true),
    [savaDataLoading, setSavaDataLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const stepsList = await proxyFetch(
        QUERY_TECH_LEADER_ENTERPRISE_REGISTRATION_STEP,
        {
          registrationUuid: localStorageTechLeaderRegistrationUuid
        },
        'GET'
      );
      setStepsList(stepsList);
      setLoading(false);
    })();
  }, [localStorageTechLeaderRegistrationUuid]);

  useEffect(() => {
    (async () => {
      if (isNeedFresh) {
        setLoading(true);
        const techManagerUuid = await proxyFetch(
          SELECT_REGISTRATION_TECH_MANAGER_UUID,
          {
            registrationUuid: localStorageTechLeaderRegistrationUuid
          },
          'GET'
        );
        setTechManagerUuid(techManagerUuid);
        setIsNeedFresh(false);
        setLoading(false);
      }
    })();
  }, [localStorageTechLeaderRegistrationUuid, isNeedFresh]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { techManagerList, total, pageSize } = await proxyFetch(
        QUERY_TECH_MANAGER,
        {
          page
        },
        'GET'
      );
      setTechManagerList(techManagerList);
      setTotal(total);
      setPageSize(pageSize);
      setLoading(false);
    })();
  }, [page]);

  // 确认选择提交按钮
  const handleUpdateStep = techManagerUuid => {
    (async () => {
      setSavaDataLoading(true);

      await proxyFetch(ARRANGE_TECH_MANAGER, {
        registrationUuid: localStorageTechLeaderRegistrationUuid,
        techManagerUuid
      });
      setIsNeedFresh(true);
      setSavaDataLoading(false);
    })();
  };

  return (
    <div className='item-box techLeader-manager-show-box'>
      <p className='title-box'>分配技术管理人员</p>
      <div className='subtitle-box'>
        <Link to={HOME_REGISTRATION_TASK_LIST.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>选择技术人员</p>
      </div>
      <div>
        <Table
          dataSource={techManagerList}
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
            selectedRowKeys: techManagerUuid,
            getCheckboxProps: () => ({
              disabled:
                savaDataLoading ||
                !techManagerUuid ||
                (stepsList[3]?.status !== 2 && stepsList[3]?.status !== 3)
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
    </div>
  );
};
