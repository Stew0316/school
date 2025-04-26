import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router'
import { ConfigProvider, Watermark } from 'antd';
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
      <Watermark content="Stew" font={{ color: "rgba(255,255,255,0.2)" }}>
        <Layout>
          <div className="outlet">

            <Outlet />
          </div>

        </Layout>
      </Watermark>

    </ConfigProvider>
  )
}

export default App
