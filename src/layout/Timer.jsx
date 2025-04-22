import { useEffect, useState } from "react"
import dayjs from "dayjs"
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(weekday);
const Timer = () => {
  const [time, setTime] = useState(null)
  const weekMap = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '日'
  }
  let times = null
  useEffect(() => {
    times = setInterval(() => {
      const timedata = dayjs().format('HH:mm:ss')
      console.log(timedata)
      setTime(timedata)
    }, 1000)
    return () => {
      clearInterval(times)
    }
  }, [])
  return <div>
    <span>{dayjs().format('YYYY.MM.DD')} 星期{weekMap[dayjs().weekday()]}</span>
    <span>{time}</span>
  </div>
}

export default Timer