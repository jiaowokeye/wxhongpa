import Taro, { Component } from '@tarojs/taro'
import { View ,Image} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import BgImg from './bg.png'
import CoverImg from './0_03.png'
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({

}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '游戏'
  }
  state={
    visible:false
  }
  componentWillMount () { }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () {

  }
   //点击退出派对
  leaveParty = ()=>{
    this.setState({
      visible:true
    })

  }
  //隐藏弹出层
  hideCover = ()=>{
    this.setState({
      visible:false
    })
  }
  //确认退出派对
  handleOk = ()=>{
    Taro.request({
      url: 'http://application.idaowei.com:8080/party/room/basic/close',
      data: {
        room_id:this.props.counter.ROOM_ID
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res)=> {
        this.setState({
          visible:false
        })
        Taro.navigateTo({
          url: './../index/index'
        })
      }})
  }
  //前往游戏规则
  toGameRule=(type)=>{
    Taro.navigateTo({
      url: './../gameRule/index?type='+type
    })
  }
  //前往功能页面  计分器  秒表   倒计时
  toFunctionControl = (type)=>{
    Taro.navigateTo({
      url: './../functionControl/index?type='+type
    })
  }
  componentDidHide () {

  }
  render () {
    let coverClassName = this.state.visible?"cover-control":"cover-control hide";
    console.log(coverClassName);
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
            <Text className='leave-party' onClick={this.leaveParty}>退出派对</Text>
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
        <View  className={coverClassName}>
          <View className='cover-content'>
            <Image className='cover-img' src={CoverImg} />
            <View className='cover-des'>
              <Text>
                不玩了吗？\n退出后需要重新“发起派对”，\n你确定退出这场派对吗？
              </Text>
            </View>
            <View className='button' style='left:0'>
              <View onClick={this.hideCover}>取消</View>
            </View>
            <View className='button'>
              <View onClick={this.handleOk}>确定</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

