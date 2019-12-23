import { Result, Button } from 'antd';
import React from 'react';
export default props => {
  return (
    <Result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button type="primary" key="console">
          继续
        </Button>,
        <Button key="buy">退出</Button>
      ]}
    />
  );
};
