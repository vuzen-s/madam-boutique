import { Alert, Space } from 'antd';
const AlertSuccess = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
      height: 'auto'
    }}
  >
    <Alert
      message="Updated Profile successfully: After changing your profile, you need to SignIn again. Thank you. "
      type="success"
      showIcon
      closable
    />

  </Space>
);
export default AlertSuccess;