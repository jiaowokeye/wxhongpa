import Taro, { Component } from '@tarojs/taro'
import { View ,Input,Text,OpenData} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import BgImg from "./bg.png"
import { saveRoomId } from '../../actions/counter'
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  saveRoomId(room_id){
    dispatch(saveRoomId(room_id))
  }
}))
export default class SSS extends Component {
  config = {
    navigationBarTitleText: '游戏'
  }
  state = {
    step:1,  //1发起或者加入派对按钮   2-输入数字  3-等人满然后进入游戏
    userInfo:{},
    hasUserInfo:false,
    password:"",
    focus:false,
    room_id:"",
    user:[]
  }

  componentDidMount () {
      let [code,openid] = ["",""];
      console.log(this.props.counter.IDENTITY_TYPE);//玩家身份 1-玩家 2-裁判
      this.setState({
        step:1,
        userInfo:{},
        hasUserInfo:false,
        password:"",
        focus:false,
        room_id:"",
        user:[]
      })
  }
  changeStep=(step)=>{

    switch (step){
      case 1:
          this.setState({
            step:step,
            focus:false
          })
          break;
      case 2:
          this.setState({
            step:step,
            focus:true,
            password:""
          })
          break;
      case 3:
          this.setState({
            focus:false
          })
          if(step==3){
            if(this.props.counter.IDENTITY_TYPE==1){//玩家身份验证队伍
              this.checkRoom();
            }else{//裁判身份创建房间
              this.addRoom();
            }

          }
          break;
    }


  }
  //验证密码
  checkRoom = ()=>{
    Taro.request({
      url: 'https://application.idaowei.com/party/room/basic/check',
      data: {
        password:this.state.password
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res)=> {
        if(res.data.result!==1){
          this.setState({
            password:"",
          })
          Taro.showModal({
            title: '提示',
            content: res.data.message,
            showCancel:false,
            success: (res) =>{
              this.changeStep(2);
            }
          })
        }else{
          this.setState({
            room_id:res.data.data.room_id,
            step:3
          })
          setTimeout(()=>{
            this.getInfoById();
          },200)
        }
      }})
  }
  //新建房间
  addRoom = ()=>{
    Taro.request({
      url: 'https://application.idaowei.com/party/room/basic/add',
      data: {
        user_id:this.props.counter.USER_ID,
        password:this.state.password
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res)=> {
        if(res.data.result!==1){
          Taro.showModal({
            title: '提示',
            content: res.data.message,
            showCancel:false,
            success: function(res) {

            }
          })
        }else{
          this.setState({
            room_id:res.data.data,
            step:2
          })
          setTimeout(()=>{
            this.enterGame();
          },200)
        }
      }})
  }
  //获取房间信息
  getInfoById = ()=>{
    Taro.request({
      url: 'https://application.idaowei.com/party/room/basic/findById',
      data: {
        room_id:this.state.room_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res)=> {
        if(res.data.result!==1){
          Taro.showModal({
            title: '提示',
            content: res.data.message,
            showCancel:false,
            success: function(res) {

            }
          })
        }else{

        }
      }}).then((res)=>{
        //获取房间成员信息
        Taro.request({
          url: 'https://application.idaowei.com/party/room/user/query',
          data: {
            room_id:this.state.room_id,
            type:0
          },
          header: {
            'content-type': 'application/json'
          },
          success: (res)=> {
            if(res.data.result!==1){
              Taro.showModal({
                title: '提示',
                content: res.data.message,
                showCancel:false,
                success: function(res) {

                }
              })
            }else{
              this.setState({
                user:res.data.data
              })
            }
          }})
    })
  }

  //进入游戏
  enterGame=()=>{
    console.log(this.state);
    let type = 1;
    if(this.props.counter.IDENTITY_TYPE==1){
      if(this.props.counter.GROUP_INFO==1){
        type = 1;
      }else{
        type = 2;
      }
    }else{
      type = 3;
    }
    //获取房间成员信息
    Taro.request({
      url: 'https://application.idaowei.com/party/room/user/enter',
      data: {
        room_id:this.state.room_id,
        user_id:this.props.counter.USER_ID,
        type:type
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res)=> {
        if(res.data.result!==1){
          Taro.showModal({
            title: '提示',
            content: res.data.message,
            showCancel:false,
            success: function(res) {

            }
          })
        }else{
          //这里处理一些东西保存信息啊之类的
          //然后跳转
          this.props.saveRoomId(this.state.room_id);
          if(this.props.counter.IDENTITY_TYPE==1){//玩家身份点确认 进去选队伍积分页面
            Taro.reLaunch({
              url: './../realTime/index'
            })
          }else{//裁判身份点确认，进去游戏控制中心
            Taro.reLaunch({
              url: './../gameControl/index'
            })
          }
        }
      }})
  }
  //改变密码事件
  changePassWord = (e)=>{
    let value = e.target.value;
    if(value.length<4){
      this.setState({
        password:value
      })
    }else{
      this.setState({
        password:value
      });
      setTimeout(()=>{
        this.changeStep(3);
      },300)

    }


  }
  onBlur = ()=>{
    this.setState({
      focus:false
    })
  }
  returnEvent = ()=>{
    this.changeStep(this.state.step-1);
  }
  render () {
    let partyText = this.props.counter.IDENTITY_TYPE==1?"进入":"发起";
    let step1ClassName = this.state.step==1?"step1":"hide";
    let step2ClassName = this.state.step==2?"step2":"hide";
    let step3ClassName = this.state.step==3?"step3":"hide";
    let returnButtonClassName = this.state.step==1?'returnPre hide':'returnPre';
    let showNum = this.state.password + "····".substr(this.state.password.length,4);
    return (
      <View className='index'>
        <Image className='bg-img' src={BgImg} />
        <View className={returnButtonClassName} onClick={this.returnEvent}><View className='fontReturn'/></View>
        <View className={step1ClassName}>
          <View className='party-button' onClick={this.changeStep.bind(this,2)}>
            <Text>{partyText+"\n派对"}</Text>
          </View>
        </View>
        <View className={step2ClassName}>
          <View className='top'>
            <View className='title'>{partyText+"派对"}</View>
            <View className='des'>
              <Text>和身边的朋友输入同样的四个数字, \n进入同一场派对</Text>
            </View>
            <View className='content'>
                  <Input ref='input' type='number' onBlur={this.onBlur} value={this.state.password} onInput={this.changePassWord} focus={this.state.focus} confirm-hold={true}/>
                <View onClick={this.changeStep.bind(this,2)}>{showNum}</View>
            </View>
          </View>
        </View>
        <View className={step3ClassName}>
          <View className='top'>
            <View className='title'>{this.state.room_id}</View>
            <View className='des'>
              <Text>这些朋友也将进入派对</Text>
            </View>
            <View className='content'>
              {
                this.state.user.map((e,i)=>{
                  return  <Image src={e.head_photo} key={i} />
                })
              }
            </View>
          </View>
          <View className='bottom'>
            <View className='start-game' onClick={this.enterGame}>进入本场派对游戏</View>
          </View>
        </View>
      </View>
    )
  }
}

