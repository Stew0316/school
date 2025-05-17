import style from "@/style/School.module.scss"
import { useState, useMemo, useEffect } from "react"
import { Progress } from "antd"
import Num from "@/components/Num"
import Title from "@/layout/Title"
import { useNavigate } from "react-router"
import goBack from "@/assets/goback.png"
import people1 from "@/assets/people1.png"
import people2 from "@/assets/people2.png"
import people3 from "@/assets/people3.png"
import people4 from "@/assets/people4.png"
import { Image } from "antd"
import { chunkBySix } from "@/utils/common"
import { getSchoolMajorJobNum, getSchoolProvideJob, getCourseDevelopment, getSchoolMatchResult, getSchoolSaleData, getOnlineData, getOfflineSale, getSchoolTrainJob, getStartupAchievement } from "@/api/req"
import store from "@/store/school"
import Slider from "@/components/Slider"
import { formatNumber } from "@/utils/common"
const imgList = [people1, people2, people3, people4]
const School = () => {
  const nav = useNavigate()
  const [count, setCount] = useState({
    month_sale: 0,
    school_count: 0,
    started_num: 0
  })
  const [actList, setActList] = useState([])
  const goBackArea = () => {
    nav("/area")
  }
  const [courseList, setCourseList] = useState([])
  const [majorList, setMajorList] = useState([])
  const [top10, setTop10] = useState([])
  const [lineData, setLineData] = useState([])
  const [offLineData, setOffLineData] = useState([])
  const offLineMax = useMemo(
    () => {
      return Math.max(...offLineData.map(item => item.month_sale))
    },
    [offLineData]
  )
  const offLineValue = useMemo(
    () => {
      return offLineData.sort((a, b) => b.month_sale - a.month_sale).map((item, index) => {
        item.index = index
        return item
      })
    },
    [offLineData]
  )
  const [jobList, setJobList] = useState([])
  const [achievementList, setAchievementList] = useState([])
  useEffect(() => {
    // const school_id = 28
    const school_id = store.schoolId
    getSchoolMajorJobNum({ school_id: school_id }).then(res => {
      setActList(res.data?.source || [])
    })
    getSchoolProvideJob({ school_id: school_id }).then(res => {
      setJobList(res.data?.source || [])
    })
    getCourseDevelopment({ school_id: school_id }).then(res => {
      setCourseList(res.data?.source || [])
    })
    getSchoolMatchResult({ school_id: school_id }).then(res => {
      setMajorList(res.data?.source || [])
    })
    getSchoolSaleData({ school_id: school_id }).then(res => {
      setCount(res.data?.source?.[0] || {})
    })
    getOnlineData({ school_id: school_id }).then(res => {
      setLineData(res.data?.source || [])
    })
    getOfflineSale({ school_id: school_id }).then(res => {
      setOffLineData(res.data?.source || [])
    })
    getSchoolTrainJob({ school_id: school_id }).then(res => {
      setTop10(res.data?.source || [])
    })
    getStartupAchievement({ school_id: school_id }).then(res => {
      const value = res.data?.source || []
      setAchievementList(res.data?.source || [])
    })
  }, [])
  return <div className={style.school}>
    <div className="left">
      <Title text="各专业实训人数"></Title>
      <Slider slidesPerView={2} autoplay={false} allowTouchMove={true} className='peoples' data={chunkBySix(actList, 2)} renderSlide={
        (item, index) => {
          return <>
            {
              item.map((value, idx) => {
                return <div className="people-wrap">
                  <img className="people-img" src={imgList[index % 2 * 2 + idx]} alt="" />
                  <div className="people-text">
                    <div className={`text1${index % 2 * 2 + idx + 1}`}>{value.num}</div>
                    <div>{value.major_name}</div>
                  </div>
                </div>
              })
            }
          </>
        }
      }></Slider>
      <Title className="wrap-10" text="提供岗位动态分析"></Title>
      <div className={`headers`}>
        <span>序号</span>
        <span>岗位名称</span>
        <span>人数</span>
      </div>
      <Slider slidesPerView={5} className='table-wrap' data={jobList} renderSlide={(item, index) => {
        return <div key={index} className={`table-item ${index % 2 == 0 ? "table-stripe" : ""}`}>
          <span>{index + 1}</span>
          <span>{item.job_name}</span>
          <span>{item.num}</span>
        </div>
      }}></Slider>
      <Title className="wrap-10" text="课程开发动态分析"></Title>
      <div className={`headers`}>
        <span>序号</span>
        <span>课程名称</span>
        <span>数量</span>
      </div>
      <Slider slidesPerView={5} className='table-wrap' data={courseList} renderSlide={(item, index) => {
        return <div key={index} className={`table-item ${index % 2 == 0 ? "table-stripe" : ""}`}>
          <span>{index + 1}</span>
          <span>{item.course_name}</span>
          <span>{item.num}</span>
        </div>
      }}></Slider>
      <Title className="wrap-10" text="赛事成果动态分析"></Title>
      <Slider className='images' autoplay={false} allowTouchMove={true} slidesPerView={2} data={[...chunkBySix(majorList, 3), ...chunkBySix(majorList, 3)]} renderSlide={(item, index) => {
        return <>
          {
            item.map(value => {
              return <Image className="image-item" src={value.img}></Image>
            })
          }
        </>
      }}>
      </Slider>
    </div>
    <div className="center">

      <div className="center-data">
        <div className="center-data-item">
          <Num data={count.year_sale}></Num>
          <div className="center-data-text">年销售额</div>
        </div>
        <div className="center-data-item center-data-center">
          <Num data={count.month_sale}></Num>
          <div className="center-data-text">月销售额</div>
        </div>
        <div className="center-data-item">
          <Num data={count.day_sale}></Num>
          <div className="center-data-text">日销售额</div>
        </div>
      </div>
      <div className="china-map">

      </div>
      <div className="center-back">
        <div className="back">
          <img onClick={() => goBackArea()} src={goBack} alt="" />
          <span onClick={() => goBackArea()}>返回大区数据中台</span>
        </div>
        <div className="center-back-text">产业做大 专业做强</div>
      </div>
    </div>
    <div className="right">
      <Title className="text-yellow" text="线上销售额数据"></Title>
      <div className={`headers ${lineData.length > 5 ? 'headers-scr' : ''} header-right`}>
        <span>岗位名称</span>
        <span>销售额</span>
        <span>排名</span>
      </div>
      <Slider autoplay={false} allowTouchMove={true} className='table-wrap' slidesPerView={5} data={[...lineData.map((item, index) => {
        item.index = index
        return item
      }), ...lineData.map((item, index) => {
        item.index = index
        return item
      })]} renderSlide={(item, index) => {
        return <div key={item.index} className={`table-item ${item.index % 2 == 0 ? "table-stripe" : ""}`}>
          <span>{item.type}</span>
          <span>{formatNumber(item.month_sale)}</span>
          <span className={`${item.index < 3 ? 'school-coin' : ''}`}>{item.index + 1}</span>
        </div>
      }}></Slider>
      <Title className="wrap-10 text-yellow" text="线下销售额数据"></Title>
      <Slider autoplay={false} allowTouchMove={true} className='table-wrap' slidesPerView={5} data={[...offLineValue, ...offLineValue]} renderSlide={(item, index) => {
        return <div className="company-item">
          <div className={`company-name ${item.index <= 2 ? 'company-top' : ''}`}>
            <span className="index">
              <span className={item.index <= 2 && 'top3-text'}>{item.index + 1}</span>
              <span className="name">{item.store_name}</span>
            </span>
            <span className={`count ${item.index <= 2 && 'top3'}`}>{formatNumber(item.month_sale, '')}万元</span>
          </div>
          <Progress size="small" percent={item.month_sale / offLineMax * 100} showInfo={false} strokeColor={{
            '0%': item.index <= 2 ? '#FF6D3E35' : '#EFF4FF35',
            '100%': item.index <= 2 ? '#FFD03B' : '#EFF4FF'
          }} />
        </div>
      }}></Slider>
      <Title className="wrap-10" text="TOP10岗位"></Title>
      <div className={`headers ${jobList.length > 5 ? 'headers-scr' : ''}`}>
        <span>岗位</span>
        <span>人数</span>
        <span>排名</span>
      </div>
      <Slider autoplay={false} allowTouchMove={true} className='table-wrap' slidesPerView={5} data={top10} renderSlide={(item, index) => {
        return <div key={index} className={`table-item ${index % 2 == 0 ? "table-stripe" : ""}`}>
          <span>{item.job_name}</span>
          <span>{item.num}</span>
          <span className={`${index < 3 ? 'school-coin' : ''}`}>{index + 1}</span>
        </div>
      }}></Slider>
      <Title className="wrap-10" text="创新创业的孵化成功"></Title>
      <Slider autoplay={false} allowTouchMove={true} className='comp-name' slidesPerView={3} data={chunkBySix(achievementList, 2)} renderSlide={(item, index) => {
        return <div className={`lines ${index % 2 == 0 ? 'line-stripe' : ''}`}>
          {
            item.map(value => {
              return <div>{value.company_name}</div>
            })
          }
        </div>
      }}></Slider>
    </div>
  </div>
}

export default School