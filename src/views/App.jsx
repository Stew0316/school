import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import Layout from "@/layout/Layout"
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
function App() {
  return (
    <ConfigProvider locale={zhCN} theme={{
      components: {
        DatePicker: {
          colorTextTertiary: "#6DEEF8",
          colorTextPlaceholder: '#82b4f9',
          colorBgContainer: "transparent",
          activeBg: 'transparent'
        }
      }
    }}>
      <Layout>
        <div className="outlet">

          <Outlet />
        </div>

      </Layout>
    </ConfigProvider>
  )
}

export default App
