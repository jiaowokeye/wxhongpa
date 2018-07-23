import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  toSSS = ()=>{
    Taro.navigateTo({
      url: './../sss/index'
    })
  }

  render () {
    return (
      <View className='index'>
        <View className='contect'>
          <View className='button-row'>
            <View className='red'>红</View>
          </View>
          <Text>请选择你的队伍</Text>
          <View className='button-row'>
            <View className='white'>白</View>
          </View>
        </View>
      </View>
    )
  }
}

