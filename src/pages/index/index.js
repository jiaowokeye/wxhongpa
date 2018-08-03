import Taro, { Component } from '@tarojs/taro'
import { View,Image,CoverView,CoverImage,Button} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { changeIndentityType,saveOpenid,savePhoto,saveRoomId,saveUserId ,changeGroupType} from '../../actions/counter'
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
  },
  saveRoomId(room_id){
    dispatch(saveRoomId(room_id))
  }
  ,
  saveUserId(user_id){
    dispatch(saveUserId(user_id))
  },
  changeGroupType(type){
    dispatch(changeGroupType(type))
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
        url: 'https://application.idaowei.com/party/user/basic/getOpenId',
        data: {
          code:res.code
        },
        header: {
          'content-type': 'application/json'
        },
        success: (res)=> {
          let openId = '';
          try{
            openId = JSON.parse(res.data.data).openid;
          }catch(err){

          }
          this.props.saveOpenid(openId);
        }}).then((res)=>{
          Taro.request({
            url: 'https://application.idaowei.com/party/user/basic/validate',
            data: {open_id:JSON.parse(res.data.data).openid},
            header: {
              'content-type': 'application/json'
            },
            //验证用户完了处理  看是否在房间 跳转
            success: (res)=> {
              if(res.data.result!==1){

              }else{
                if(res.data.data.isActive){
                  this.props.saveRoomId(res.data.data.roomId);
                  this.props.saveUserId(res.data.data.userId);

                  switch (res.data.data.type){
                    case 3:
                        this.props.changeIndentityType(2);
                        Taro.redirectTo({
                          url: './../gameControl/index'
                        })
                        break;
                    case 2:
                        this.props.changeIndentityType(1);
                        this.props.changeGroupType(2);
                        Taro.redirectTo({
                          url: './../realTime/index'
                        })
                        break;
                    case 1:
                        this.props.changeIndentityType(1);
                        this.props.changeGroupType(1);
                        Taro.redirectTo({
                          url: './../realTime/index'
                        })
                        break;
                  }

                  if(res.data.data.type==3){//裁判

                    if(this.props.counter.IDENTITY_TYPE==1){//玩家身份点确认 进去选队伍积分页面

                    }else{//裁判身份点确认，进去游戏控制中心

                    }
                  }
                }
              }

            }})
      });
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

        <View  className={coverClassName}>
          <View className='cover-content'>
            <Image className='cover-img' src={coverImg} />
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

