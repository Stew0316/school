import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
dayjs.locale('zh-cn');
function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Outlet />
    </ConfigProvider>
  )
}

export default App
