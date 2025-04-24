import Title from "@/layout/Title";
import style from "@/style/Country.module.scss"
import SchoolTable from "@/components/SchoolTable";
import create1 from "@/assets/create1.png"
import { DatePicker, Space } from 'antd';
import * as echarts from 'echarts';
import { useEffect, useMemo, useState } from "react";
const { RangePicker } = DatePicker;
const gradientColor = new echarts.graphic.LinearGradient(
  0, 0, 0, 1,                // (x1,y1)=(0,0) 顶部；(x2,y2)=(0,1) 底部 :contentReference[oaicite:1]{index=1}
  [
    { offset: 0, color: '#FFD03B' },   // 0% 处颜色  
    { offset: 1, color: '#FFD03B00' }    // 100% 处颜色  
  ],
  false
);
const gradientColor1 = new echarts.graphic.LinearGradient(
  0, 0, 0, 1,                // (x1,y1)=(0,0) 顶部；(x2,y2)=(0,1) 底部 :contentReference[oaicite:1]{index=1}
  [
    { offset: 0, color: '#0FFFF2' },   // 0% 处颜色  
    { offset: 1, color: '#0FFFF200' }    // 100% 处颜色  
  ],
  false
);
const Country = () => {
  const [tableData, setTableData] = useState([
    {
      name: "北京大学北京大学北京大学",
      count: 8000,
      rank: 1
    },
    {
      name: "北京大学北京大学北京大学",
      count: 8000,
      rank: 1
    },
    {
      name: "北京大学北京大学北京大学",
      count: 8000,
      rank: 1
    },
    {
      name: "北京大学北京大学北京大学",
      count: 8000,
      rank: 1
    },
    {
      name: "北京大学北京大学北京大学",
      count: 8000,
      rank: 1
    },
    {
      name: "北京大学北京大学北京大学",
      count: 8000,
      rank: 1
    },
    {
      name: "北京大学北京大学北京大学",
      count: 8000,
      rank: 1
    },
    {
      name: "北京大学北京大学北京大学",
      count: 8000,
      rank: 1
    },
    {
      name: "北京大学北京大学北京大学",
      count: 8000,
      rank: 1
    }
  ])
  const [channelData, setChannelData] = useState([])
  const [seaChart, setSeaChart] = useState(null)
  const seaOp = useMemo(() => {
    return {
      grid: {
        top: '2%',
        left: 0,
        right: 0,
        bottom: 0, //下边距
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          barMaxWidth: 20,
          itemStyle: {
            color: gradientColor         // 应用同一渐变 :contentReference[oaicite:2]{index=2}
          }
        }
      ]
    }
  }, [channelData])
  const [saleChart, setSaleChart] = useState(null)
  const saleOp = useMemo(() => {
    return {
      grid: {
        top: '2%',
        left: 0,
        right: 0,
        bottom: 0, //下边距
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          barMaxWidth: 20,
          itemStyle: {
            color: gradientColor1         // 应用同一渐变 :contentReference[oaicite:2]{index=2}
          }
        }
      ]
    }
  }, [channelData])
  const initChart = (classname) => {
    var chartDom = document.querySelector(classname);
    return echarts.init(chartDom);
  };
  useEffect(() => {
    if (seaChart) {
      seaChart.setOption(seaOp);
    }
  }, [seaOp, seaChart]);
  useEffect(() => {
    if (saleChart) {
      saleChart.setOption(saleOp);
    }
  }, [saleOp, saleChart])
  useEffect(() => {
    setSeaChart(initChart(".country-sea"));
    setSaleChart(initChart(".line-sale"));
  }, [])
  return <div className={style.country}>
    <div className="left">
      <Title text="TOP院校销售额排名"></Title>
      <SchoolTable data={tableData} lineHeight={30}></SchoolTable>
      <Title className={'wrap-top'} text="全国创业之星TOP100"></Title>
      <Title className={'wrap-top'} text="岗位供给TOP50企业"></Title>
      <Title className={'wrap-top'} text="在岗人数动态分析"></Title>
    </div>
    <div className="center">
      <div className="china"></div>
      <div></div>
    </div>
    <div className="right">
      <Title text="全国流量池"></Title>
      <div className="country-sea line-data"></div>
      <Title className={'warp-20'} text="线上销售额数据"></Title>
      <div className="range">
        <RangePicker className="range-picker" />
      </div>
      <div className="line-sale line-data"></div>
      <Title className={'warp-20'} text="线下销售额数据"></Title>
      <div className="create">
        <div className="create-item">
          <img className="create-img" src={create1} alt="" />
          <div className="create-info">
            <div>创业店</div>
            <div>20</div>
          </div>
        </div>
        <div className="create-item">
          <img className="create-img" src={create1} alt="" />
          <div className="create-info">
            <div>创业店</div>
            <div>20</div>
          </div>
        </div>
        <div className="create-item">
          <img className="create-img" src={create1} alt="" />
          <div className="create-info">
            <div>创业店</div>
            <div>20</div>
          </div>
        </div>
        <div className="create-item">
          <img className="create-img" src={create1} alt="" />
          <div className="create-info">
            <div>创业店</div>
            <div>20</div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Country