import Taro, { Component } from '@tarojs/taro'
import { View ,Image} from '@tarojs/components'
import './index.scss'
import BgImg from './bg.png'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '游戏'
  }
  componentWillMount () { }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () {

   }
  toGameRule=(type)=>{
    Taro.navigateTo({
      url: './../gameRule/index?type='+type
    })
  }
  toFunctionControl = (type)=>{
    Taro.navigateTo({
      url: './../functionControl/index?type='+type
    })
  }
  componentDidHide () {

  }
  render () {
    return (
      <View className='index'>
        <Image className='bg-img' src={BgImg} />
        <View className='top'></View>
        <View className='content'>
          <View className='colspan'>
            <View className='rowspan white' onClick={this.toGameRule.bind(this,1)}>
              倾囊相吹
            </View>
            <View className='rowspan red' onClick={this.toGameRule.bind(this,3)}>
              空间对接
            </View>
            <View className='rowspan white' onClick={this.toGameRule.bind(this,5)}>
              酒杯定律
            </View>
            <View className='rowspan red' onClick={this.toGameRule.bind(this,7)}>
              精准倒塔
            </View>
            <View className='rowspan white' onClick={this.toGameRule.bind(this,9)}>
              高塔传奇
            </View>
          </View>
          <View className='colspan'>
            <View className='rowspan red' onClick={this.toGameRule.bind(this,2)}>
              叠影重重
            </View>
            <View className='rowspan white' onClick={this.toGameRule.bind(this,4)}>
              拼图达人
            </View>
            <View className='rowspan red' onClick={this.toGameRule.bind(this,6)}>
              快手辨色
            </View>
            <View className='rowspan white' onClick={this.toGameRule.bind(this,8)}>
              物资空运
            </View>
            <View className='rowspan red' onClick={this.toGameRule.bind(this,10)}>
              弹射飞椅
            </View>
          </View>
        </View>
        <View className='footer-button'>
          <View className='rowspan'>
            <Text>退出派对</Text>
          </View>
          <View className='rowspan'>
            <View onClick={this.toFunctionControl.bind(this,1)}>
              计分器
            </View>
            <View onClick={this.toFunctionControl.bind(this,2)}>
              秒表
            </View>
            <View onClick={this.toFunctionControl.bind(this,3)}>
              倒计时
            </View>
          </View>
        </View>
      </View>
    )
  }
}

