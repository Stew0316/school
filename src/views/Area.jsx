import Title from "@/layout/Title";
import BottomTab from "@/layout/BototomTab";
import { useRef, useEffect, useState, useMemo } from "react";
import Tooltip from "@/components/Tooltip";
import Num from "@/components/Num";
import SchoolTable from "@/components/SchoolTable";
import * as echarts from 'echarts';
import style from "@/style/Area.module.scss"
import { SearchOutlined } from "@ant-design/icons";
import { Progress, message } from "antd"
import chinaJson from '@/assets/china.json';
import { MapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useNavigate } from "react-router";
import emit from "@/utils/emit.js";
import { pickColor, COLORS, formatNumber } from "@/utils/common";
import { getProvinceProcessing, getTalentTraining, getIndexData, getProvideJobTopCompany, getTopSchoolSale, getSchoolList } from "@/api/req";
import { TooltipComponent, VisualMapComponent, GeoComponent } from 'echarts/components';
import store from "@/store/school";
import Slider from "@/components/Slider"
echarts.use([MapChart, TooltipComponent, VisualMapComponent, GeoComponent, CanvasRenderer]);
echarts.registerMap('china', chinaJson);
const AREA_COLOR = ['#00A9FF', '#22FFE1', '#FFC800']
const AREA_CLASS = ['guan', 'qing', 'qingnian']
const initChart = (classname) => {
  var chartDom = document.querySelector(classname);
  return echarts.init(chartDom);
};

const Area = () => {
  const nav = useNavigate()
  const [schoolList, setSchoolList] = useState([])
  const [count, setCount] = useState({
    month_sale: 0,
    school_count: 0,
    started_num: 0
  });
  const [top50List, setTop50List] = useState([])
  const top50Max = useMemo(
    () => {
      return Math.max(...top50List.map(item => item.job_num))
    },
    [top50List]
  )
  const sendList = useMemo(
    () => {
      return top50List.length >= 8 ? [...top50List, ...top50List] : top50List.sort((b, a) => b.job_num - a.job_num)
    },
    [top50List]
  )
  const [tipData, setTipData] = useState({});
  const [showTip, setShowTip] = useState(false);
  const [chinaData, setchinaData] = useState([]);
  const [chinaChart, setChinaChart] = useState(null);
  const [tableData, setTableData] = useState([])
  const group = store.areaList.find(value => value.id == store.selectArea)?.sub_provinces || []
  const chinaOp = useMemo(
    () => {
      const data = chinaJson.features.map((feat, idx) => {
        const color = group.includes(feat.properties.fullname) ? COLORS[idx % COLORS.length] : 'transparent'
        return {
          name: feat.properties.name,  // 省份名
          fullName: feat.properties.fullname,
          value: Math.random() * 1000,    // 随机示例值，可替换为真实数据
          itemStyle: {
            // areaColor: COLORS[idx % COLORS.length],
            areaColor: color,
            borderColor: '#3ba0ff',
            borderWidth: 1
          },
          emphasis: {                   // 悬停高亮
            itemStyle: {
              areaColor: '#07AAE6',
              borderColor: '#FF8A00',
              // borderWidth: 2
            },
            label: { show: true, color: '#fff' }
          }
        }
      });
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
            //areaColor: params => pickColor(params.name)    // ← 按省名哈希挑色 
          },
          data,
          select: {
            itemStyle: {
              // areaColor: 'transparent',  // 选中时区域填充透明，去掉背景色
              areaColor: '#07AAE6',
              borderColor: '#FF8A00',    // 保持边框色与常规一致
              borderWidth: 1
            },
            label: {
              show: true,
              color: '#fff'              // 保持选中时标签可见
            }
          }
        }]
      }
    },
    [chinaData, store.selectArea]
  )
  useEffect(() => {
    if (chinaChart) {
      chinaChart.setOption(chinaOp);
      chinaChart.on('click', async function (params) {
        const [x, y] = chinaChart.convertToPixel({ seriesIndex: 0 }, params.name);
        console.log(params)
        const res = await getIndexData({
          province: params.data.fullName
        })
        const data = res.data.source[0]
        setTipData({ x: x + 150, y: y + 300, showExpand: true, school_count: data.school_count, month_sale: data.month_sale, area: params.name, started_num: data.started_num });
        setShowTip(true)
      });
    }
  }, [chinaOp, chinaChart, store.selectArea])
  const [areaChart, setAreaChart] = useState(null);
  const [areaData, setAreaData] = useState([]);
  const areaOp = useMemo(
    () => {
      const total = areaData.reduce((sum, d) => sum + d.num, 0);
      return {
        color: AREA_COLOR,
        title: [
          {
            text: total > 10000 ? formatNumber(total) : total,
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
            data: areaData.map(d => ({ name: d.talent_name, value: d.num })),
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
          right: '3%',
          containLabel: true
        },
        title: {
          text: '单位:所',
          textStyle: {
            color: '#B9E8FF',
            fontSize: 12
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 0,
            color: '#EFF4FF'
          },
          data: provinceData.map(item => item.province)
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
            const value = params[0]
            return `
              <div style='background-color: #ffffff15;'>
                <div style="text-align: center;color:#B9E8FF;font-size: 16px;">${value.axisValueLabel}</div>
                <div style="text-align: center;color:#FF8A48;font-size: 12px;">已做学校数${value.data.value}</div>
                <div style="text-align: center;color:#48F9FF;font-size: 12px;">未做学校数${value.data.plan}</div>
              </div>
            `
          }
        },
        series: [
          {
            data: provinceData.map(item => {
              return {
                plan: item.plan,
                value: item.actual
              }
            }),
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
  const getProvinceCoop = () => {
    getProvinceProcessing({ region: store.selectArea }).then(res => {
      setProvinceData(res.data?.source || [])
    })
  }
  const getTrain = () => {
    getTalentTraining({ region: store.selectArea }).then(res => {
      setAreaData(res.data?.source || [])
    })
  }
  const getCount = () => {
    getIndexData({ region: store.selectArea }).then(res => {
      setCount(res.data?.source?.[0] || {})
    })
  }
  const getJob = () => {
    getProvideJobTopCompany({ region: store.selectArea }).then(res => {
      console.log(res.data)
      setTop50List(res.data?.source || [])
    })
  }
  const getTop = () => {
    getTopSchoolSale({ region: store.selectArea }).then(res => {
      setTableData(res.data?.source || [])
    })
  }
  const getSchool = () => {
    getSchoolList({ region: store.selectArea }).then(res => {
      setSchoolList(res.data?.source || [])
    })
  }
  const tipClick = () => {
    setShowTip(false)
  }
  useEffect(() => {
    if (provinceChart) {
      provinceChart.setOption(provinceOp);
    }
  }, [provinceOp, provinceChart])
  useEffect(() => {
    setChinaChart(initChart(`.china`));
    setAreaChart(initChart(`.left-plans`));
    setProvinceChart(initChart(`.right-plans`));
    store.updateName(`京校园云${store.selectAreaName}大数据中台`)
  }, [])
  useEffect(() => {
    getProvinceCoop()
    getTrain()
    getCount()
    getJob()
    getTop()
    getSchool()
  }, [store.selectArea])
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      if (!e.target.value) return message.warning('请输入学校名称')
      for (let i in schoolList) {
        let item = schoolList[i]
        if (item.school_name.includes(e.target.value)) {
          store.updateName(item.school_name)
          store.updateSchoolId(item.id)
          nav('/school')
          return
        }
      }
      return message.warning('当前无数据，请搜索其他学校')
    }
  };
  return <div className={style.area}>
    <div className="center">

      <div className="center-data">
        <div className="center-data-item">
          <Num data={count.school_count}></Num>
          <div className="center-data-text">院校（所）</div>
        </div>
        <div className="center-data-item center-data-center">
          <Num data={count.month_sale}></Num>
          <div className="center-data-text">月销售额（万元）</div>
        </div>
        <div className="center-data-item">
          <Num data={count.started_num}></Num>
          <div className="center-data-text">实训人数</div>
        </div>
      </div>
      <div className="china-map">
        <div className="map-text">
          <input onKeyUp={handleKeyUp} type="text" placeholder="请输入学校名称" />
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
            {
              areaData.map((item, index) => {
                return <div className="plan-legend">
                  <span>
                    <span className={`${AREA_CLASS[index % 3]} le-span`}></span>
                    <span>{item.talent_name}</span>
                  </span>
                  <span className={`people-le people-${AREA_CLASS[index % 3]}`}>{item.num}人</span>
                </div>
              })
            }
          </div>
        </div>
      </div>
      <div>
        <Title className='warp-30' text="岗位供给TOP50企业"></Title>
        <Slider className='company left-company' data={sendList} slidesPerView={8} renderSlide={(item, index) => {
          return <div className="company-item">
            <div className={`company-name ${item.rank <= 2 ? 'company-top' : ''}`}>
              <span className="index">
                <span className={item.rank <= 2 ? 'top3-icon' : ''}>{item.rank}</span>
                <span className="name">{item.company_name}</span>
              </span>
              <span className={`count ${item.rank <= 2 ? 'top3' : ''}`}>岗位/{item.job_num}人</span>
            </div>
            <Progress size="small" percent={item.job_num / top50Max * 100} showInfo={false} strokeColor={{
              '0%': item.rank <= 2 ? '#FF6D3E35' : '#EFF4FF35',
              '100%': item.rank <= 2 ? '#FFD03B' : '#EFF4FF'
            }} />
          </div>
        }}></Slider>
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
          <SchoolTable slidesPerView={10} data={[...tableData, ...tableData]} lineHeight={40} className="school-area" slideClassName='school-area'></SchoolTable>
        </div>
      </div>
    </div>
    {showTip && <Tooltip {...tipData} tipClick={() => tipClick()}></Tooltip>}
  </div>
}

export default Area