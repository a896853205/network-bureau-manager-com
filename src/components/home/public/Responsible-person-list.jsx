import React from 'react';

// 样式
import '@/style/home/item.styl';
import '@/style/home/responsible-person-list.styl';

export default props => {
  return (
    <div className='item-box'>
      <h5 className='title-box'>负责人列表</h5>
      <ul className='responsible-person-ul'>
        <li>
          <img
            src='https://c-ssl.duitang.com/uploads/item/201511/21/20151121171107_zMZcy.jpeg'
            alt=''
          />
          <div className='responsible-person-card-description'>
            <span>钱程</span>
            <span>项目管理员</span>
            <span>15998133472</span>
          </div>
        </li>
        <li>
          <img
            src='https://c-ssl.duitang.com/uploads/item/201511/21/20151121171107_zMZcy.jpeg'
            alt=''
          />
          <div className='responsible-person-card-description'>
            <span>钱程</span>
            <span>项目管理员</span>
            <span>15998133472</span>
          </div>
        </li>{' '}
        <li>
          <img
            src='https://c-ssl.duitang.com/uploads/item/201511/21/20151121171107_zMZcy.jpeg'
            alt=''
          />
          <div className='responsible-person-card-description'>
            <span>钱程</span>
            <span>项目管理员</span>
            <span>15998133472</span>
          </div>
        </li>{' '}
        <li>
          <img
            src='https://c-ssl.duitang.com/uploads/item/201511/21/20151121171107_zMZcy.jpeg'
            alt=''
          />
          <div className='responsible-person-card-description'>
            <span>钱程</span>
            <span>项目管理员</span>
            <span>15998133472</span>
          </div>
        </li>{' '}
        <li>
          <img
            src='https://c-ssl.duitang.com/uploads/item/201511/21/20151121171107_zMZcy.jpeg'
            alt=''
          />
          <div className='responsible-person-card-description'>
            <span>钱程</span>
            <span>项目管理员</span>
            <span>15998133472</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
