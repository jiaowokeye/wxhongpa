import Taro, { Component } from '@tarojs/taro'
import { View,Image,CoverView,CoverImage,Button} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { changeIndentityType,saveOpenid,savePhoto } from '../../actions/counter'
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
  },
  savePhoto(url){
    dispatch(savePhoto(url))
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
    this.setState({
      visible:false
    })
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
          this.props.saveOpenid(res.data.openid);

        }}).then((res)=>{
          Taro.request({
            url: 'https://application.idaowei.com/party/user/basic.do?validate&open_id='+res.data.openid,
            data: {},
            header: {
              'content-type': 'application/json'
            },
            //验证用户完了处理  看是否在房间 跳转
            success: function(res) {
              

            }})
      });
      this.props.saveOpenid('oJn1_4q9mpiqEyXWTn93ua5s2XbA');
    }).then(()=>{
      //获取用户信息 存入store
      Taro.getUserInfo({
        success: res => {
          console.log(res.userInfo.avatarUrl);
          this.props.savePhoto(res.userInfo.avatarUrl);
        }
      })
    }).then(()=>{

    })
  }
  componentWillUnmount () { }

  componentDidShow () {

   }

  componentDidHide () {

  }
  //显示角色内容
  showCover = (type)=>{
    Taro.getUserInfo({
      success: res => {
        console.log(res.userInfo.avatarUrl);
        this.props.savePhoto(res.userInfo.avatarUrl);
      }
    }).then(()=>{
      this.setState({
        visible:true
      })
      this.props.changeIndentityType(type);
    })
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
            <View className={buttonClassName} onClick={this.showCover.bind(this,1)}>
              <Button open-type='getUserInfo'>玩家</Button>
            </View>
          </View>
          <View className='button'>
            <View className={buttonClassName} onClick={this.showCover.bind(this,2)}>
              <Button open-type='getUserInfo'>裁判</Button>
            </View>
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

