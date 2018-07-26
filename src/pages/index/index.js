import Taro, { Component } from '@tarojs/taro'
import { View,Image,CoverView,CoverImage,Button} from '@tarojs/components'
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
  },
  saveOpenid(openid){
    dispatch(saveOpenid(openid))
  }
}))


export default class Index extends Component {
  config = {
    navigationBarTitleText: '游戏'
  }
  state={
    visible:false,
    login:false
  }
  componentWillMount () { }

  componentDidMount () {
    this.setState({
      visible:false
    })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    Taro.login({
      //获取code
      success: function (res) {
        console.log(res.code);
      }
    }).then((res)=>{
      //通过res.code 去后台取openid
      //然后 this.props.saveOpenid(openid); 、、存到store
      Taro.request({
        url: 'https://application.idaowei.com/party/user/basic.do?getOpenId&code='+res.code,
        data: {},
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res);
          this.props.saveOpenid(res.data.openid);

        }});
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
      if(this.props.counter.IDENTITY_TYPE==1){//玩家身份点确认 进去选队伍界面
        Taro.navigateTo({
          url: './../chooseGroup/index'
        })
      }else{//裁判身份点确认，进去输入信息页面
        Taro.navigateTo({
          url: './../fillInfo/index'
        })
      }
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
          {/*<Button open-type='getUserInfo'>登录啊</Button>*/}
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

