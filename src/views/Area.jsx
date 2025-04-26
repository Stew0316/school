import Title from "@/layout/Title";
import BottomTab from "@/layout/BototomTab";
import { useRef, useEffect, useState, useMemo } from "react";
import Tooltip from "@/components/Tooltip";
import Num from "@/components/Num";
import SchoolTable from "@/components/SchoolTable";
import * as echarts from 'echarts';
import style from "@/style/Area.module.scss"
import { SearchOutlined } from "@ant-design/icons";
import { Progress } from "antd"
import chinaJson from '@/assets/china.json';
import { MapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipComponent, VisualMapComponent, GeoComponent } from 'echarts/components';
echarts.use([MapChart, TooltipComponent, VisualMapComponent, GeoComponent, CanvasRenderer]);
echarts.registerMap('china', chinaJson);

const COLORS = ['#1067B3', '#133780', '#10184D'];
function pickColor(name) {
  // 简单哈希：把字符串的 charCode 累加，然后 mod 三色数
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h += name.charCodeAt(i);
  }
  return COLORS[h % COLORS.length];
}
const initChart = (classname) => {
  var chartDom = document.querySelector(classname);
  return echarts.init(chartDom);
};

const Area = () => {
  const [top50List, setTop50List] = useState([
    {
      name: "海澜之家",
      count: 200
    },
    {
      name: "海澜之家",
      count: 200
    },
    {
      name: "海澜之家",
      count: 200
    },
    {
      name: "海澜之家",
      count: 200
    },
    {
      name: "海澜之家",
      count: 200
    },
    {
      name: "海澜之家",
      count: 200
    },
    {
      name: "海澜之家",
      count: 200
    },
    {
      name: "海澜之家",
      count: 200
    },
    {
      name: "海澜之家",
      count: 200
    },
    {
      name: "海澜之家",
      count: 200
    },
    {
      name: "海澜之家",
      count: 200
    },
    {
      name: "海澜之家",
      count: 200
    },
  ]);
  const [tipData, setTipData] = useState({});
  const [showTip, setShowTip] = useState(false);
  const [chinaData, setchinaData] = useState([]);
  const [chinaChart, setChinaChart] = useState(null);
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
  const chinaOp = useMemo(
    () => {
      const data = chinaJson.features.map((feat, idx) => ({
        name: feat.properties.name,  // 省份名
        value: Math.random() * 1000,    // 随机示例值，可替换为真实数据
        itemStyle: {
          borderColor: '#3ba0ff',
          borderWidth: 1
        },
        emphasis: {                   // 悬停高亮
          itemStyle: {
            areaColor: '#1067B3',
            borderColor: '#FF8A00',
            borderWidth: 2
          }
        }
      }));
      return {
        series: [{
          name: '省份数据',
          type: 'map',
          map: 'china',
          roam: true,
          zoom: 1.1,
          label: {
            show: true,           // 默认状态下显示标签
            color: '#ffffff',      // 白色文字，保证在深蓝底上可见 
            fontSize: 11,
            formatter: '{b}'       // 显示区域名称
          },
          // 不需要给 data 赋值也会渲染全量 geoJson 特征，itemStyle 回调按 dataIndex 着色
          itemStyle: {
            borderColor: '#3ba0ff',
            areaColor: params => pickColor(params.name)    // ← 按省名哈希挑色 
          },
          data,
          emphasis: {
            itemStyle: {
              borderColor: '#FF8A00',
              borderWidth: 3
            },
            label: { show: true, color: '#fff' }
          }
        }]
      }
    },
    [chinaData]
  )
  useEffect(() => {
    if (chinaChart) {
      chinaChart.setOption(chinaOp);
      chinaChart.on('click', function (params) {
        console.log(params);
      });
      //   // 先取消上一次的高亮
      //   if (prevIndex.current != null) {
      //     chinaChart.dispatchAction({
      //       type: 'downplay',
      //       seriesIndex: 0,
      //       dataIndex: prevIndex.current
      //     });
      //   }
      //   // 高亮当前
      //   chinaChart.dispatchAction({
      //     type: 'highlight',
      //     seriesIndex: 0,
      //     dataIndex: params.dataIndex
      //   });
      //   prevIndex.current = params.dataIndex;
      //   const [x, y] = chinaChart.convertToPixel({ seriesIndex: 0 }, params.name);
      //   setTipData({ x: x + 500, y: y + 100, showExpand: true, schoolCount: 8000, sales: 8000, area: params.name, expandCount: 8000 });
      //   setShowTip(true)
      // });
    }
  }, [chinaOp, chinaChart])
  const [areaChart, setAreaChart] = useState(null);
  const [areaData, setAreaData] = useState({
    guan: "154",
    qing: "650",
    qingnian: "345"
  });
  const areaOp = useMemo(
    () => {
      const data = [
        { name: '管培生', value: 154, color: '#00A9FF' },
        { name: '青创计划', value: 650, color: '#22FFE1' },
        { name: '青年计划', value: 345, color: '#FFC800' },
      ];
      const total = data.reduce((sum, d) => sum + d.value, 0);
      return {
        color: data.map(d => d.color),
        title: [
          {
            text: total,
            left: 'center',
            top: '30%',
            left: "27%",
            textStyle: {
              fontSize: 32,
              fontMafily: "youshe",
              fontWeight: 'bold',
              color: '#fff'
            }
          },
          {
            text: '总人数(人)',
            left: 'center',
            top: '55%',
            left: "32%",
            textStyle: {
              fontSize: 12,
              color: '#fff'
            }
          }
        ],
        avoidLabelOverlap: false,
        series: [
          {
            name: '人员分布',
            type: 'pie',
            radius: ['75%', '85%'],
            center: ['50%', '50%'], // 给出左偏一点的位置，为右侧 legend 腾出空间
            avoidLabelOverlap: false,
            label: { show: false },
            labelLine: { show: false },
            padAngle: 10,
            data: data.map(d => ({ name: d.name, value: d.value })),
          }
        ],
      }
    },
    [areaData]
  )
  useEffect(() => {
    if (areaChart) {
      areaChart.setOption(areaOp);
    }
  }, [areaOp, areaChart])
  const [provinceChart, setProvinceChart] = useState(null);
  const [provinceData, setProvinceData] = useState([])
  const provinceOp = useMemo(
    () => {
      return {
        grid: {
          top: '16%',
          left: "3%",
          bottom: "1%",
          containLabel: true
        },
        title: {
          text: '单位:万',
          textStyle: {
            color: '#B9E8FF',
            fontSize: 12
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis',
          show: true,
          backgroundColor: 'transparent',
          borderColor: "transparent",
          formatter: (params) => {
            console.log(params);
            const value = params[0]
            return `
              <div style='background-color: #ffffff15;'>
                <div style="text-align: center;color:#B9E8FF;font-size: 16px;">${value.axisValueLabel}</div>
                <div style="text-align: center;color:#48F9FF;font-size: 12px;">已做学校数${1000}</div>
                <div style="text-align: center;color:#FF8A48;font-size: 12px;">未做学校数${200}</div>
              </div>
            `
          }
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {
              // 横向渐变：起点 (0,0)，终点 (1,0)
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#FF8A48' },          // 顶部不透明橙色 :contentReference[oaicite:0]{index=0}
                { offset: 1, color: 'rgba(255,138,72,0)' } // 底部完全透明 :contentReference[oaicite:1]{index=1}
              ])
            },
            lineStyle: {
              color: '#FF8A48'
            },
            itemStyle: {
              color: '#FF8A48'
            }
          }
        ]
      }
    },
    [provinceData]
  )
  useEffect(() => {
    if (provinceChart) {
      provinceChart.setOption(provinceOp);
    }
  }, [provinceOp, provinceChart])
  useEffect(() => {
    setChinaChart(initChart(`.china`));
    setAreaChart(initChart(`.left-plans`));
    setProvinceChart(initChart(`.right-plans`));
  }, [])

  return <div className={style.area}>
    <div className="center">

      <div className="center-data">
        <div className="center-data-item">
          <Num data={1200}></Num>
          <div className="center-data-text">院校（所）</div>
        </div>
        <div className="center-data-item center-data-center">
          <Num data={2000}></Num>
          <div className="center-data-text">月销售额（万元）</div>
        </div>
        <div className="center-data-item">
          <Num data={4200}></Num>
          <div className="center-data-text">实训人数</div>
        </div>
      </div>
      <div className="china-map">
        <div className="map-text">
          <input type="text" placeholder="请输入学校名称" />
          <SearchOutlined style={{
            color: "#1786ef",
            fontSize: '24px'
          }} className="icons" ></SearchOutlined>
        </div>
        <div className="china"></div>
      </div>
      <BottomTab></BottomTab>
    </div>
    <div className="left">
      <div>
        <Title text="区域人才培养项目人数"></Title>
        <div className="plan-wrap">
          <div className="plans left-plans"></div>
          <div className="legend">
            <div className="plan-legend">
              <span>
                <span className="guan le-span"></span>
                <span>管培生</span>
              </span>
              <span className="people-le people-guan">{areaData.guan}人</span>
            </div>
            <div className="plan-legend">
              <span>
                <span className="qing le-span"></span>
                <span>青创计划</span>
              </span>
              <span className="people-le people-qing">{areaData.qing}人</span>
            </div>
            <div className="plan-legend">
              <span>
                <span className="qingnian le-span"></span>
                <span>青年计划</span>
              </span>
              <span className="people-le people-qingnian">{areaData.qingnian}人</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Title className='warp-30' text="岗位供给TOP50企业"></Title>
        <div className="company left-company school-scroll">
          {
            top50List.map((item, index) => {
              return <div className="company-item">
                <div className={`company-name ${index <= 2 ? 'company-top' : ''}`}>
                  <span className="index">
                    <span className={index <= 2 && 'top3-icon'}>{index + 1}</span>
                    <span className="name">{item.name}</span>
                  </span>
                  <span className={`count ${index <= 2 && 'top3'}`}>岗位/{item.count}人</span>
                </div>
                <Progress size="small" percent={99.9} showInfo={false} strokeColor={{
                  '0%': index <= 2 ? '#FF6D3E35' : '#EFF4FF35',
                  '100%': index <= 2 ? '#FFD03B' : '#EFF4FF'
                }} />
              </div>
            })
          }
        </div>
      </div>
    </div>
    <div className="right">
      <div>
        <Title text="省份合作动态分析"></Title>
        <div className="plans right-plans"></div>
      </div>
      <div>
        <Title className='warp-30' text="区域TOP10院校销售额排名"></Title>
        <div className="company">
          <SchoolTable data={tableData} lineHeight={40} className="school-area"></SchoolTable>
        </div>
      </div>
    </div>
    {showTip && <Tooltip {...tipData}></Tooltip>}
  </div>
}

export default Area