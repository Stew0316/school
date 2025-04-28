import Title from "@/layout/Title";
import style from "@/style/Country.module.scss"
import SchoolTable from "@/components/SchoolTable";
import create1 from "@/assets/create1.png"
import { DatePicker, Space, Carousel } from 'antd';
import * as echarts from 'echarts';
import { MapChart } from 'echarts/charts';                       // 地图图表
import { TooltipComponent, VisualMapComponent, GeoComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';              // 渲染器
import chinaJson from '@/assets/china.json';
import { useEffect, useMemo, useState, useRef } from "react";
import Num from "@/components/Num";
import Tooltip from "@/components/Tooltip";
import BottomTab from "@/layout/BototomTab";
import goleft from "@/assets/go-left.png"
import goright from "@/assets/go-right.png"
import people from "@/assets/people.png"
import emit from "@/utils/emit";
import { getFlowPool, getEntrepreneurStar, getOnlineSale, getOfflineSale, getOnlineData, getProvideJobTopCompany, getTopSchoolSale } from "@/api/req";
function chunkBySix(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += 6) {
    // 从 i 开始，截取最多 6 个元素
    result.push(arr.slice(i, i + 6));  // slice 不会修改原数组 :contentReference[oaicite:0]{index=0}
  }
  return result;
}

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
  const [flow, setFlow] = useState([]);
  const [saleLine, setSaleLine] = useState([]);
  const [jobList, setJobList] = useState([
    {
      name: "库存岗",
      inSchool: "20",
      train: "2120",
      total: "20",
      rank: "1"
    },
    {
      name: "理货岗",
      inSchool: "210",
      train: "3870",
      total: "30",
      rank: "1"
    },
    {
      name: "仓库岗",
      inSchool: "300",
      train: "13000",
      total: "20",
      rank: "1"
    },
    {
      name: "财务岗",
      inSchool: "30",
      train: "50",
      total: "40",
      rank: "1"
    },
    {
      name: "保洁岗",
      inSchool: "200",
      train: "3000",
      total: "50",
      rank: "1"
    },
  ]);
  const [top50, setTop50] = useState([]);
  const CarouselRef = useRef(null);
  const [topData, setTopData] = useState([]);
  const prevIndex = useRef(null);
  const [tipData, setTipData] = useState({});
  const [showTip, setShowTip] = useState(false);
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
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        top: '3%',
        left: 0,
        right: 0,
        bottom: 0, //下边距
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          interval: 0,
          color: '#EFF4FF'
        },
        data: flow.map(item => item.channel)
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#EFF4FF'
        },
      },
      series: [
        {
          data: flow.map(item => item.num),
          type: 'bar',
          barMaxWidth: 20,
          itemStyle: {
            color: gradientColor         // 应用同一渐变 :contentReference[oaicite:2]{index=2}
          }
        }
      ]
    }
  }, [flow])
  const [saleChart, setSaleChart] = useState(null)
  const saleOp = useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        top: '3%',
        left: 0,
        right: 0,
        bottom: 0, //下边距
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: saleLine.map(item => item.product),
        axisLabel: {
          interval: 0,
          color: '#EFF4FF'
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#EFF4FF'
        }
      },
      series: [
        {
          data: saleLine.map(item => item.data1),
          type: 'bar',
          barMaxWidth: 20,
          itemStyle: {
            color: gradientColor1         // 应用同一渐变 :contentReference[oaicite:2]{index=2}
          }
        }
      ]
    }
  }, [saleLine])
  const [chinaChart, setChinaChart] = useState(null)
  const chinaOp = useMemo(() => {
    const data = chinaJson.features.map((feat, idx) => ({
      name: feat.properties.name,  // 省份名
      value: Math.random() * 1000,    // 随机示例值，可替换为真实数据
      itemStyle: {
        areaColor: COLORS[idx % COLORS.length],
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
        label: {
          show: true,           // 默认状态下显示标签
          color: '#ffffff',      // 白色文字，保证在深蓝底上可见 
          fontSize: 10,
          formatter: '{b}'       // 显示区域名称
        },
        // 不需要给 data 赋值也会渲染全量 geoJson 特征，itemStyle 回调按 dataIndex 着色
        itemStyle: {
          borderColor: '#3ba0ff',
          areaColor: params => pickColor(params.name)    // ← 按省名哈希挑色 
        },
        data,
        zoom: 1.2,
        emphasis: {
          itemStyle: {
            borderColor: '#FF8A00',
            borderWidth: 3
          },
          label: { show: true, color: '#fff' }
        }
      }]
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
    let times
    if (!times) {
      times = setTimeout(() => {
        setTipData({})
        setShowTip(false)
      }, 600)
    }
    return () => {
      clearTimeout(times)
    }
  }, [tipData])
  useEffect(() => {
    if (chinaChart) {
      chinaChart.setOption(chinaOp);
      chinaChart.on('click', function (params) {
        // 先取消上一次的高亮
        if (prevIndex.current != null) {
          chinaChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: prevIndex.current
          });
        }
        // 高亮当前
        chinaChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: params.dataIndex
        });
        prevIndex.current = params.dataIndex;
        const [x, y] = chinaChart.convertToPixel({ seriesIndex: 0 }, params.name);
        setTipData({ x: x + 500, y: y + 100, showExpand: true, schoolCount: 8000, sales: 8000, area: params.name, expandCount: 8000 });
        setShowTip(true)
      });
    }
  }, [chinaOp, chinaChart])
  useEffect(() => {
    setSeaChart(initChart(".country-sea"));
    setSaleChart(initChart(".line-sale"));
    setChinaChart(initChart(".china"));
    getFlowPool({}).then(res => {
      setFlow(res.data.source)
    })
    getEntrepreneurStar({}).then(res => {
      setTopData(res.data.source)
    })
    getOnlineSale({}).then(res => {
      console.log(res)
    })
    getOfflineSale().then(res => {
      console.log(res)
    })
    getOnlineData({}).then(res => {
      // console.log(11, res)
      setSaleLine(res.data.source)
    })
    getProvideJobTopCompany({}).then(res => {
      // console.log(222, res)
      setTop50(res.data.source)
    })
    getTopSchoolSale({}).then(res => {
      setTableData(res.data.source)
    })
  }, [])
  return <div className={style.country}>
    <div className="left">
      <Title text="TOP院校销售额排名"></Title>
      <SchoolTable data={tableData} lineHeight={30}></SchoolTable>
      <Title className={'wrap-top'} text="全国创业之星TOP100"></Title>
      <div className="img-slider">
        <img onClick={() => CarouselRef.current.prev()} className="img-slider-left" src={goleft} alt="" />
        <Carousel ref={CarouselRef} arrows={false} dots={false} draggable={true} autoplay={true} >
          {
            chunkBySix(topData).map(item => {
              return <div className="img-slider-item">
                {
                  item.map(value => {
                    return <div className="img-slider-item-item">
                      <img src={value.avatar} alt="" />
                      <div>{value.user_name}</div>
                    </div>
                  })
                }
              </div>
            })
          }
        </Carousel>
        <img onClick={() => CarouselRef.current.next()} className="img-slider-right" src={goright} alt="" />
      </div>
      <Title className={'wrap-top'} text="岗位供给TOP50企业"></Title>
      <div className="top-job">
        <div className="header">
          <span>岗位名称</span>
          <span>校内招聘</span>
          <span>学校实训</span>
          <span>总岗位数</span>
          <span>排名</span>
        </div>
        <div className="job-list school-scroll">
          {
            top50.map(item => {
              return <div>
                <div>{item.company_name}</div>
                <div>{item.inSchool}</div>
                <div>{item.job_name}</div>
                <div>{item.job_num}</div>
                <div>{item.rank}</div>
              </div>
            })
          }
        </div>
      </div>
      <Title className={'wrap-top'} text="在岗人数动态分析"></Title>
      <div className="top-train">
        <div className="header">
          <span>岗位</span>
          <span>数量</span>
          <span>未实训人数（人）</span>
          <span>已实训人数（人）</span>
        </div>
        <div className="job-list school-scroll">
          {
            jobList.map(item => {
              return <div>
                <div>{item.name}</div>
                <div>{item.inSchool}</div>
                <div>{item.train}</div>
                <div>{item.total}</div>
              </div>
            })
          }
        </div>
      </div>
    </div>
    <div className="center">
      <div className="china-map">
        <div className="china"></div>
      </div>
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
      <BottomTab></BottomTab>
    </div>
    <div className="right">
      <Title text="全国流量池"></Title>
      <div className="country-sea line-data"></div>
      <Title className={'warp-20'} text="线上销售额数据"></Title>
      {/* <div className="range">
        <RangePicker className="range-picker" />
      </div> */}
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
            <div>电商店</div>
            <div>120</div>
          </div>
        </div>
        <div className="create-item">
          <img className="create-img" src={create1} alt="" />
          <div className="create-info">
            <div>衣服店</div>
            <div>220</div>
          </div>
        </div>
        <div className="create-item">
          <img className="create-img" src={create1} alt="" />
          <div className="create-info">
            <div>线下店</div>
            <div>240</div>
          </div>
        </div>
      </div>
    </div>
    {showTip && <Tooltip {...tipData}></Tooltip>}
  </div>
}

export default Country