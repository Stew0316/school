import Title from "@/layout/Title";
import style from "@/style/Country.module.scss"
import SchoolTable from "@/components/SchoolTable";
import create1 from "@/assets/create1.png"
import create2 from "@/assets/create2.png"
import create3 from "@/assets/create3.png"
import create4 from "@/assets/create4.png"
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
import store from "@/store/school";
import { chunkBySix, COLORS, pickColor, gradientColor1, gradientColor } from "@/utils/common";
import { getFlowPool, getEntrepreneurStar, getOfflineSale, getOnlineData, getProvideJobTopCompany, getTopSchoolSale, getOnJobNum, getIndexData } from "@/api/req";
const imgList = [create1, create2, create3, create4]
function formatCount(num) {
  // 若不是数字或小于10000，直接返回原数
  if (typeof num !== 'number' || num < 10000) {
    return num;
  }
  // 除以10000，保留1位小数
  const value = (num / 10000).toFixed(1);
  // 去掉末尾“.0”，如“1.0”→“1”
  const trimmed = value.replace(/\.0$/, '');
  // 拼接“w+”
  return `${trimmed}W+`;
}

echarts.use([MapChart, TooltipComponent, VisualMapComponent, GeoComponent, CanvasRenderer]);
echarts.registerMap('china', chinaJson);

const { RangePicker } = DatePicker;

const Country = () => {
  const [statics, setStatics] = useState({
    school_count: 0,
    month_sale: 0,
    started_num: 0
  });
  const [flow, setFlow] = useState([]);
  const [offLine, setOffLine] = useState([]);
  const [saleLine, setSaleLine] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [top50, setTop50] = useState([]);
  const CarouselRef = useRef(null);
  const [topData, setTopData] = useState([]);
  const prevIndex = useRef(null);
  const [tipData, setTipData] = useState({});
  const [showTip, setShowTip] = useState(false);
  const [tableData, setTableData] = useState([])
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
          barMaxWidth: 10,
          itemStyle: {
            color: gradientColor         // 应用同一渐变 :contentReference[oaicite:2]{index=2}
          }
        },
        {
          name: "外圆",
          type: "scatter",
          emphasis: {
            scale: false,
          },
          tooltip: {
            show: false
          },
          symbol: "rect",
          symbolSize: [16, 2],// 进度条白点
          itemStyle: {
            barBorderRadius: [30, 0, 0, 30],
            color: 'rgba(255,208,59, 1)',
            shadowColor: "rgba(255,208,59, 0.5)",
            shadowBlur: 5,
            borderWidth: 1,
            opacity: 1,
          },
          z: 2,
          data: flow.map(item => item.num),
          animationDelay: 500,
        },
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
        data: saleLine.map(item => item.type),
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
          data: saleLine.map(item => item.month_sale),
          type: 'bar',
          barMaxWidth: 20,
          itemStyle: {
            color: gradientColor1         // 应用同一渐变 :contentReference[oaicite:2]{index=2}
          }
        },
        {
          name: "外圆",
          type: "scatter",
          emphasis: {
            scale: false,
          },
          tooltip: {
            show: false
          },
          symbol: "rect",
          symbolSize: [16, 2],// 进度条白点
          itemStyle: {
            barBorderRadius: [30, 0, 0, 30],
            color: 'rgba(15,255,242, 1)',
            shadowColor: "rgba(15,255,242, 0.5)",
            shadowBlur: 5,
            borderWidth: 1,
            opacity: 1,
          },
          z: 2,
          data: saleLine.map(item => item.month_sale),
          animationDelay: 500,
        },
      ]
    }
  }, [saleLine])
  const [chinaChart, setChinaChart] = useState(null)
  const chinaOp = useMemo(() => {
    const data = chinaJson.features.map((feat, idx) => ({
      name: feat.properties.name,  // 省份名
      fullName: feat.properties.fullname,
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
  const tipClick = () => {
    setShowTip(false)
  }
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
    if (chinaChart) {
      chinaChart.setOption(chinaOp);
      chinaChart.on('click', async function (params) {
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
        console.log(params)
        const res = await getIndexData({
          province: params.data.fullName
        })
        const data = res.data.source[0]
        setTipData({ x: x + 500, y: y + 100, showExpand: true, school_count: data.school_count, month_sale: data.month_sale, area: params.name, started_num: data.started_num });
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
    getOfflineSale().then(res => {
      setOffLine(res.data.source)
    })
    getOnlineData({}).then(res => {
      setSaleLine(res.data.source)
    })
    getProvideJobTopCompany({}).then(res => {
      setTop50(res.data.source)
    })
    getTopSchoolSale({}).then(res => {
      setTableData(res.data.source)
    })
    getOnJobNum({}).then(res => {
      setJobList(res.data.source)
    })
    getIndexData({}).then(res => {
      setStatics(res.data.source[0])
    })
    store.updateName('京东校园云全国大数据中台')
  }, [])
  return <div className={style.country}>
    <div className="left">
      <Title text="TOP院校销售额排名"></Title>
      <SchoolTable data={tableData} lineHeight={30}></SchoolTable>
      <Title className={'wrap-top'} text="全国创业之星TOP100"></Title>
      <div className="img-slider">
        <img onClick={() => CarouselRef.current.prev()} className="img-slider-left" src={goleft} alt="" />
        <Carousel ref={CarouselRef} arrows={false} dots={false} draggable={true} autoplay={true} vertical={true}>
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
                <div>{item.in_school_hire}</div>
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
                <div>{item.job_name}</div>
                <div>{item.job_num}</div>
                <div>{item.not_started}</div>
                <div>{item.started}</div>
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
          <Num data={statics.school_count}></Num>
          <div className="center-data-text">院校（所）</div>
        </div>
        <div className="center-data-item center-data-center">
          <Num data={statics.month_sale}></Num>
          <div className="center-data-text">月销售额（万元）</div>
        </div>
        <div className="center-data-item">
          <Num data={statics.started_num}></Num>
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
        {
          offLine.map((item, index) => {
            return <div className="create-item">
              <img className="create-img" src={imgList[index]} alt="" />
              <div className="create-info">
                <div>{item.store_name}</div>
                <div>{formatCount(item.month_sale)}</div>
              </div>
            </div>
          })
        }
      </div>
    </div>
    {showTip && <Tooltip {...tipData} tipClick={() => tipClick()}></Tooltip>}
  </div>
}

export default Country