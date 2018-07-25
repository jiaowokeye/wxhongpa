import Taro, { Component } from '@tarojs/taro'
import { View,Image,CoverView,Button,CoverImage} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { changeIndentityType } from '../../actions/counter'
import Cover1Img from "./cover1.png"
import Cover2Img from "./cover2.png"
import BgImg from "./bg-index.png"
import './index.scss'
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  changeIndentityType (type) {
    dispatch(changeIndentityType(type))
  }
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
      console.log(this.props);
    this.setState({
      visible:false
    })
  }

  componentWillUnmount () { }

  componentDidShow () {

   }

  componentDidHide () {

  }
  //显示角色内容
  showCover = (type)=>{
    this.setState({
      visible:true
    })
    this.props.changeIndentityType(type);
  }
  //隐藏角色内容
  hideCover = ()=>{
    this.setState({
      visible:false
    })
  }
  //角色内容里点击确认
  handleOk = function () {
      // if(this.props.counter.IDENTITY_TYPE==1){//玩家身份点确认 进去选队伍界面
      //   Taro.navigateTo({
      //     url: './../chooseGroup/index'
      //   })
      // }else{//裁判身份点确认，进去输入信息页面
      //   Taro.navigateTo({
      //     url: './../fillInfo/index'
      //   })
      // }
      Taro.navigateTo({
          url: './../InitiateParty/index'
        })
  }
  render () {
    let coverClassName = this.state.visible?"cover-control":"cover-control hide";
    let buttonClassName = this.state.visible?"active":"";
    let coverImg = this.props.counter.IDENTITY_TYPE==1?Cover1Img:Cover2Img;
    return (
      <View className='index'>
        <Image className='bg-img' src={BgImg} />
        <View className='content' />
        <View className='button-group'>
            <View className='button'>
              <View className={buttonClassName} onClick={this.showCover.bind(this,1)}>玩家</View>
            </View>
            <View className='button'>
              <View className={buttonClassName} onClick={this.showCover.bind(this,2)}>裁判</View>
            </View>
        </View>
        <CoverView  className={coverClassName}>
            <CoverView className='cover-content'>
              <CoverImage className='cover-img' src={coverImg} />
              <CoverView className='button' style='left:0'>
                <CoverView onClick={this.hideCover}>取消</CoverView>
              </CoverView>
              <CoverView className='button'>
                <CoverView onClick={this.handleOk}>确定</CoverView>
              </CoverView>
            </CoverView>
        </CoverView>
      </View>
    )
  }
}

