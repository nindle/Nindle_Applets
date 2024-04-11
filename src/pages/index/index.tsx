import { Checkbox, Input, View, CheckboxGroup, Picker } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import { useEffect, useState } from "react";
export default function Index() {

  const [taskList, setTaskList] = useState<object[]>([])
  const [inputText, setInputText] = useState('')
  const [time, setTime] = useState('')
  const [openId, setOpenId] = useState<any>('')

  useEffect(() => {
    Taro.login({
      success: async(e) => {
        const {data}  = await Taro.request({url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx7eebef0766987258&secret=6fce5237f28df7fa14dd114211b16b44&js_code=${e.code}&grant_type=authorization_code`})
        setOpenId(data.openid)
        handleGetData(data.openid);
      }
    })

  }, []);

  definePageConfig({
    navigationBarTitleText: '任务列表',
    navigationBarBackgroundColor: '#6eb7ef',
    navigationBarTextStyle: 'white'
  })

  const handleGetData = (openid) => {
    const res = Taro.request({ 
                  url: "http://localhost:3000/wx",
                  method: 'POST',
                  header: {
                    'Content-Type': 'application/json',
                  },
                  data: {
                    openId: openid,
                    data: {
                      "thing1": { "value": "测试消息标题" },
                      "time2": { "value": "2020年10月1日" },
                      "thing3": { "value": "测试消息内容" }
                    }
                  } 
                });
    return res;
  };

 

  const handleInput = (text) => {
    setInputText(text)
  }

  const handleAddTask = () => {
    handleMessage() 
    return
    if (!inputText) return Taro.showToast({
      title: '请输入任务',
      icon: 'none',
      duration: 2000
    })

    if (taskList.find((e: { name }) => e.name == inputText)) return Taro.showToast({
      title: '任务重复',
      icon: 'none',
      duration: 2000
    })
    setTaskList([{ name: inputText, value: false, time }, ...taskList])
    setInputText('')
    setTime('')
  }

  const handleSelete = (e) => {
    setTime(e.detail.value)
  }

  const handleMessage = ()=> {
    Taro.requestSubscribeMessage({
      tmplIds: ['dtR3VQ16DtXKNMpqOZ7jeszVR71_V7k-ApkgU5bzXI8'],
      success: (res) => {
        if(res['dtR3VQ16DtXKNMpqOZ7jeszVR71_V7k-ApkgU5bzXI8'] == 'accept'){
          Taro.showToast({
            title: '订阅成功',
            icon: 'none',
            duration: 2000
          })
        }else{
          Taro.showToast({
            title: '订阅失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      entityIds: ['']
    })
  }

  return (
    <View className="box">
      <View className='add_task'>
        <View className='form'>
          <Input
            value={inputText}
            className='input'
            placeholder='请添加任务'
            focus
            onInput={({ detail }) => handleInput(detail.value)}
          />
          <View className='picker'>
            <Picker mode='time' onChange={(e)=>{handleSelete(e)}}>
              <View>
                { time ? time : '选择开始时间'}
              </View>
            </Picker>
          </View>
        </View>
        <View className='add_btn' onClick={() => { handleAddTask() }}>添加任务</View>
      </View>


      <CheckboxGroup className='list' onChange={(e) => {
      }}>
        {taskList.map((item: { name, value, time }) =>
          <View className='item'>
            <Checkbox
              className='checkbox'
              value={item.name}
              checked={item.value}
              onClick={() => { item.value = !item.value }}
            />
            <View className='name'>{item.name}</View>
            <View className='time'>{item.time}</View>
          </View>
        )}
      </CheckboxGroup>
    </View>
  );
}
