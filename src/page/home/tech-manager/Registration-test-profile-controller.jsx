import React from 'react';

// 样式
import { Timeline } from 'antd';
import '@/style/home/item.styl';

export default props => {
  return (
    <div className='item-box'>
      <p className='title-box'>
        <span>项目测试流程</span>
      </p>
      <div>
        <Timeline mode='left'>
          <Timeline.Item color>
            第一个组件 左右两边各一个timeline 左边是软件评测样品登记表
            右边是软件评测现场测试申请表 技术人员确认(链接) 技术人员确认(链接) |
            | 项目管理员确认 技术负责人确认 | | 完成 批准人确认 | 完成
          </Timeline.Item>
          <Timeline.Item color>第二个组件 确认进行现场测试(链接)</Timeline.Item>
          <Timeline.Item color>
            第三个组件 左右两边各一个链接
            <span>技术人员生成报告</span>
            <span>技术人员生成原始记录</span>
          </Timeline.Item>
          <Timeline.Item color>技术负责人审查</Timeline.Item>
          <Timeline.Item color>批准人审查</Timeline.Item>
          <Timeline.Item color>项目管理员盖章</Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
};
