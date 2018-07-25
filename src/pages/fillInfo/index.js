import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import BgImg from "./bg.png"
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({

}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '游戏'
  }
  state={
    name:"",
    tel:"",
    code:""
  }
  componentWillMount () { }

  componentDidMount () {
    console.log(this.props);
  }

  componentWillUnmount () { }

  componentDidShow () {

   }
   //改变昵称
  changeName=(e)=>{
    this.setState({
      name:e.target.value
    })
  }
  //改变手机号
  changeTel=(e)=>{
    this.setState({
      tel:e.target.value
    })
  }
  //改变验证码
  changeCode=(e)=>{
    this.setState({
      code:e.target.value
    })
  }
  enterGame=()=>{
    console.log(this.state);
    //这里处理一些东西保存信息啊之类的
    //然后跳转
    if(this.props.counter.IDENTITY_TYPE==2){//裁判
      Taro.navigateTo({
        url: './../gameControl/index'
      })
    }else{//成员
      Taro.navigateTo({
        url: './../realTime/index'
      })
    }

  }
  componentDidHide () {

  }
  render () {
    return (
      <View className='index'>
        <Image className='bg-img' src={BgImg} />
        <View className='content'>
          <View className='des-text'>
            <View>为了保证游戏的顺畅</View>
            <View>我们需要验证你角色的唯一性</View>
          </View>

          <View className="form-group">
            <View>昵称</View>
            <Input type='text' onChange={this.changeName} />
          </View>
          <View className="form-group">
            <View>手机号</View>
            <Input type="number" onChange={this.changeTel} />
          </View>
          <View className="form-group">
            <View>验证码</View>
            <Input type="text" onChange={this.changeCode} />
          </View>
        </View>
        <View className='footer-button'>
          <View className='start-game' onClick={this.enterGame}>进入游戏</View>
        </View>
      </View>
    )
  }
}

