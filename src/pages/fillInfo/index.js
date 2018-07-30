import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { saveUserId } from '../../actions/counter'
import './index.scss'
import BgImg from "./bg.png"
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  saveUserId(user_id){
    dispatch(saveUserId(user_id))
  }
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '游戏'
  }
  state={
    name:"",
    tel:"",
    code:"",
    visible:false
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
  //进入游戏
  enterGame=()=>{
    let TelReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if(this.state.name==""){
      Taro.showModal({
        title: '提示',
        content: '请先填写用户昵称',
        showCancel:false,
        success: function(res) {

        }
      })
      return;
    }
    if(!TelReg.test(this.state.tel)){
      Taro.showModal({
        title: '提示',
        content: '用户手机号输入错误',
        showCancel:false,
        success: function(res) {

        }
      })
      return;
    }
    if(this.state.code==''){
      Taro.showModal({
        title: '提示',
        content: '请输入验证码',
        showCancel:false,
        success: function(res) {

        }
      })
      return;
    }
    Taro.request({
      url: 'https://application.idaowei.com/party/user/basic.do?login',
      data: {
        user_id:this.props.counter.USER_ID,
        login_code:this.state.code
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {

      }}).then((res)=>{
        //应该写到success里
        Taro.navigateTo({
          url: './../InitiateParty/index'
        })
    });

  }
  //隐藏遮遭层
  hideCover = ()=>{
    this.setState({
      visible:false
    })
  }
  //显示遮遭层
  showCover = ()=>{
    this.setState({
      visible:true
    })
  }
  sendCode = ()=>{
    let TelReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if(this.state.name==""){
      Taro.showModal({
        title: '提示',
        content: '请先填写用户昵称',
        showCancel:false,
        success: function(res) {

        }
      })
      return;
    }
    if(!TelReg.test(this.state.tel)){
      Taro.showModal({
        title: '提示',
        content: '用户手机号输入错误',
        showCancel:false,
        success: function(res) {

        }
      })
      return;
    }
    //先去创建一个用户
    Taro.request({
      url: 'https://application.idaowei.com/party/user/basic.do?add',
      data: {
        open_id:this.props.counter.OPEN_ID,
        nickname:this.state.name,
        head_photo:this.props.counter.PHOTO_URL
      },
      header: {
        'content-type': 'application/json'
      },
      //成功store保存user_id
      success: (res)=> {
        this.props.saveUserId(res.data.data);
      },
      fail:(res)=>{
        //失败提示网络错误
        Taro.showModal({
          title: '提示',
          content: '网络错误！',
          showCancel:false,
          success: function(res) {

          }
        })
      }
    }).then((res)=>{
        this.sendCodeRequest();
    });
  }
  //发送验证码
  sendCodeRequest = ()=>{
    Taro.request({
      url: 'https://application.idaowei.com/party/user/basic.do?sendCode',
      data: {
        user_id:this.props.counter.USER_ID,
        nickname:this.state.name,
        phone:this.state.tel
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if(res.data.result==1){
          Taro.showModal({
            title: '提示',
            content: '验证码发送成功，请注意接收',
            showCancel:false,
            success: function(res) {

            }
          })
        }else{
          Taro.showModal({
            title: '提示',
            content: '验证码发送失败',
            showCancel:false,
            success: function(res) {

            }
          })
        }

      }});
  }
  componentDidHide () {

  }
  render () {
    let coverClassName = this.state.visible?"cover-control":"hide";
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
            <View className='code'>
              <Input type="text" onChange={this.changeCode} /><Text onClick={this.sendCode}>获取验证码</Text>
            </View>
          </View>
        </View>
        <View className='footer-button'>
          <View className='start-game' onClick={this.enterGame}>进入游戏</View>
        </View>
        <View className={coverClassName}>
          <View className='cover-content'>
            <View className='cover-close' onClick={this.hideCover}></View>
            <Text>你输入的验证码有误\n请重新输入</Text>
          </View>
        </View>
      </View>
    )
  }
}

