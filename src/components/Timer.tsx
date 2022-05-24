import React, {
  forwardRef,
  memo,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'

export default function Timer() {
  const [timeEnd, setTimeEnd] = useState(7400) //倒计时时间, 单位 ms, 修改此处可以直接调整网页预览
  const timerCpnRef = useRef<HTMLElement>(null!)
  const onTimeEndUp = useCallback(() => {
    console.log('倒计时结束')
  }, [timeEnd])
  const handleCountStopToggle = () => {
    //启动/暂停倒计时
    ;(timerCpnRef.current as any)?.handleCountStopToggle()
  }
  const handleReset = () => {
    //重置倒计时=>随后需要手动启动
    ;(timerCpnRef.current as any)?.handleReset()
  }
  const handleInputChange = (value: number) => {
    setTimeEnd(value)
  }
  return (
    <div>
      <TimerCpn
        ref={timerCpnRef}
        timeEnd={timeEnd}
        onTimeEndUp={onTimeEndUp}
        handleInputChange={handleInputChange}
      >
        <div>
          <h3>父组件插入的按钮</h3>
          <p>此处如果没有设置,子组件预留的默认插槽会替代父组件此处按钮</p>
          <div>
            <button onClick={() => handleCountStopToggle()}>暂停/启动</button>
          </div>
          <div>
            <button onClick={() => handleReset()}>重置</button>
          </div>
        </div>
      </TimerCpn>
    </div>
  )
}

interface ITimerProps {
  timeEnd: number //倒计时的时间长度,单外 ms
  onTimeEndUp?: VoidFunction //倒计时到期回调,
  children?: JSX.Element
  ref?: React.ReactNode
  handleInputChange?: (value: number) => void
}
interface ITimeTypes {
  second: number
  minute: number
  hour: number
  day: number
}

const TimerCpn = memo(
  React.forwardRef((props: ITimerProps, ref) => {
    const { timeEnd, onTimeEndUp, children } = props
    const [time, setTime] = useState({ ...parseTime(timeEnd) })
    const { second, minute, hour, day } = time
    const timeMemorized = useRef(timeEnd) //保存一个固定的倒计时时间引用
    const [isStop, setStop] = useState(true) //用于判断中止倒计时的 flag, true:暂停;false:启动

    useEffect(() => {
      setTime({ ...parseTime(timeEnd) })
      timeMemorized.current = timeEnd
      setStop(true)
    }, [timeEnd])

    useEffect(() => {
      if (isStop) return //如果设置暂停倒计时, 则不再继续倒计时
      const timerId = setInterval(() => {
        timeMemorized.current -= 1000
        setTime({ ...parseTime(timeMemorized.current) })
      }, 1000)
      if (timeMemorized.current <= 1000) {
        clearInterval(timerId)
        setStop(true) //isStop=>true, 停止倒计时
        onTimeEndUp && onTimeEndUp()
      }

      return () => clearInterval(timerId)
    }, [time, timeMemorized.current, isStop])

    const handleCountStopToggle = () => {
      if (timeMemorized.current < 1000) return
      setStop((prev) => !prev) //toggle, isStop值取反
    }
    const handleReset = () => {
      setStop(true) //isStop=>true, 停止倒计时
      timeMemorized.current = timeEnd //重设为原来的倒计时时长
      setTime({ ...parseTime(timeMemorized.current) })
      // setStop(false) //isStop=>false, 启动倒计时
    }
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = (e.target.value as any) * 1
      if (Number.isNaN(value)) value = 0
      if (typeof value === 'number') {
        props.handleInputChange && props.handleInputChange(value)
      }
    }
    useImperativeHandle(ref, () => ({
      handleCountStopToggle,
      handleReset
    }))
    return (
      <div>
        <h2>倒计时组件</h2>
        <div>
          请输入倒计时时间:
          <input
            type="text"
            value={timeEnd}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <h1>{`${day}天${hour}时${minute}分${second}秒`}</h1>
        <div>{children}</div>
        <div>
          {!children && (
            <>
              <h3>子组件默认插槽</h3>
              <div>
                <button onClick={() => handleCountStopToggle()}>
                  暂停/启动
                </button>
              </div>
              <div>
                <button onClick={() => handleReset()}>重置</button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  })
)

function parseTime(time: number): ITimeTypes {
  let timeObj = { second: 0, minute: 0, hour: 0, day: 0 }
  if (time > 0) {
    const second = Math.floor((time / 1000) % 60)
    const minute = Math.floor((time / 1000 / 60) % 60)
    const hour = Math.floor((time / 1000 / 60 / 60) % 60)
    const day = Math.floor((time / 1000 / 60 / 60 / 24) % 60)
    timeObj = { second, minute, hour, day }
  }
  return timeObj
}
