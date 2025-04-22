import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import Layout from "@/layout/Layout"
dayjs.locale('zh-cn');
function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>

        <Outlet />

      </Layout>
    </ConfigProvider>
  )
}

export default App
