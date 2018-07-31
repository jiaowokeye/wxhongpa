import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'
import BgImg from "./bg.png"
import redImg from "./font-red.png"
import whiteImg from "./font-white.png"
let Time1 = null;

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({

}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '游戏'
  }
  state={
    scope1:0,//红队分
    scope2:0,//白队分
    minutes:0,
    second:0,
    isConnectSocket:false
  }
  componentWillMount () { }
  newWebSocket = ()=>{
    Taro.connectSocket({
      url: 'ws://application.idaowei.com:8080/party/websocket',
      data:{
        x: '',
        y: ''
      },
      header:{
        'content-type': 'application/json'
      },
      protocols: [],
      method:"GET",
      success:(res)=>{
        console.log(res);
        Taro.onSocketOpen((res)=>{
          this.state.isConnectSocket = true;
          console.log('WebSocket连接已打开！');
          console.log({
            resourceType:1,
            userId:this.props.counter.USER_ID,
            roomId:this.props.counter.ROOM_ID,
            data:""
          });
            Taro.sendSocketMessage({
              data:JSON.stringify({
                resourceType:1,
                userId:this.props.counter.USER_ID,
                roomId:this.props.counter.ROOM_ID,
                data:""
              }),
              success:()=>{
              }})
          Taro.onSocketMessage(function(res) {
            console.log('收到服务器内容：' + res.data)
          })
        })

        Taro.onSocketClose(function(res) {
          console.log('WebSocket 已关闭！')
          this.state.isConnectSocket = false;
        })

      },
      fail:()=>{

      }
    })
  }
  componentDidMount () {
    if(Time1!==null){
      clearInterval(Time1);
    }
    switch (this.$router.params.type){
      case "1"://1 计分器
          this.setState({
            scope1:0,
            scope2:0,
          });
          break;
      case "2"://2 秒表
          this.setState({
            minutes:0,
            second:0
          });
          break;
      case "3"://3倒计时
          this.setState({
            minutes:0,
            second:30
          });
          break;
      default:
          break;
    }
    if(!this.state.isConnectSocket){
      this.newWebSocket();
    }
  }
  //开始
  timeStart = ()=>{
    if(Time1!==null){
      clearInterval(Time1);
    }
    switch (this.$router.params.type){
      case "2"://2 秒表
        Time1 = setInterval(()=>{
          if(this.state.second+1>59){
            this.setState({
              minutes:this.state.minutes+1,
              second:0
            })
          }else{
            this.setState({
              second:this.state.second+1
            })
          }
        },1000);
        break;
      case "3"://3倒计时
        Time1 = setInterval(()=>{
          if(this.state.second-1<0){
            clearInterval(Time1);
          }else{
            this.setState({
              second:this.state.second-1
            })
          }
        },1000);
        break;
      default:
        break;
    }
  }

  //改变分数  type 1-红 2-白  eval 1-加 2-减
  changeScope = (type,eval_type)=>{
    let num = eval_type==1?1:-1;
    Taro.sendSocketMessage({
      data:JSON.stringify({
        resourceType:2,
        userId:this.props.counter.USER_ID,
        roomId:this.props.counter.ROOM_ID,
        data:{
          1:type==1?(this.state.scope1+num<0?0:this.state.scope1+num):this.state.scope1,
          2:type==2?(this.state.scope2+num<0?0:this.state.scope2+num):this.state.scope2
        }
      }),
      success:()=>{
        if(type==1){
          this.setState({
            scope1:(this.state.scope1+num<0?0:this.state.scope1+num)
          })

        }else{
          this.setState({
            scope2:(this.state.scope2+num<0?0:this.state.scope2+num)
          })
        }
      }
    })
  }
  //暂停
  timePause = ()=>{
    clearInterval(Time1);
  }
  //清零
  timeClear = ()=>{
    clearInterval(Time1);
    switch (this.$router.params.type){
      case "2"://2 秒表
        this.setState({
          minutes:0,
          second:0
        });
        break;
      case "3"://3倒计时
        this.setState({
          minutes:0,
          second:30
        });
        break;
      default:
        break;
    }
  }
  getDate = (time)=>{
    if(time<10){
      return "0"+time;
    }else{
      return time
    }
  }

  componentWillUnmount () {
    Taro.closeSocket()
  }

  componentDidShow () {

  }

  componentDidHide () {

  }
  render () {
    let types1ClassName = this.$router.params.type=="1"?"types1":"hide";
    let types2ClassName = this.$router.params.type!=="1"?"types2":"hide";
    let types3ClassName = this.$router.params.type=="2"?"rowspan types3":"hide";
    let timeDes = this.$router.params.type=="2"?"秒表":"倒计时";
    let timeStr = (this.getDate(this.state.minutes)+"."+this.getDate(this.state.second)).split("");
    let scope1Arr = String(this.state.scope1).split("");
    let scope2Arr = String(this.state.scope2).split("");
    return (
      <View className='index'>
        <Image className='bg-img' src={BgImg} />
        <View className={types1ClassName}>
          <View className='top'>计分器</View>
          <View className='middle'>
            <View className='colspan'>
              <View className='rowspan group'>
                <Image src={redImg}/>
              </View>
              <View className='rowspan' onClick={this.changeScope.bind(this,1,1)}>
                <View className='red'>
                  <View className='font-icon fontAdd'/>
                </View>
              </View>
              <View className='rowspan scope'>
                {
                  scope1Arr.map((e,i)=>{
                    let className = "font-icon font"+e;
                    return (<Image className={className} key={i}/>)
                  })
                }
              </View>
              <View className='rowspan' onClick={this.changeScope.bind(this,1,2)}>
                <View className='red'>
                  <View className='font-icon fontSub'/>
                </View>
              </View>
            </View>
            <View className='colspan colspan-middle'>
              <View className='rowspan group'></View>
              <View className='rowspan add'></View>
              <View className='rowspan scope'>
                <View className='font-icon fontMao' style='width:52rpx;height:102rpx;background-size:52rpx 102rpx'/>
              </View>
              <View className='rowspan less'></View>
            </View>
            <View className='colspan'>
              <View className='rowspan group'>
                <Image src={whiteImg}/>
              </View>
              <View className='rowspan' onClick={this.changeScope.bind(this,2,1)}>
                <View className='white'>
                  <View className='font-icon fontAdd'/>
                </View>
              </View>
              <View className='rowspan scope'>
                {
                  scope2Arr.map((e,i)=>{
                    let className = "font-icon font"+e;
                    return (<Image className={className} key={i}/>)
                  })
                }
              </View>
              <View className='rowspan' onClick={this.changeScope.bind(this,2,2)}>
                <View className='white'>
                  <View className='font-icon fontSub'/>
                </View>
              </View>
            </View>
          </View>
          <View className='bottom'></View>
        </View>
        <View className={types2ClassName}>
          <View className='top'>{timeDes}</View>
          <View className='middle'>
            {
              timeStr.map((e,i)=>{
                let className = e!=="."?"font-icon font"+e:"font-icon fontDian";
                return (<Image className={className} key={i}/>)
              })
            }
          </View>
          <View className='bottom'>
            <View className='rowspan'>
              <View className='red' onClick={this.timeStart}>开始</View>
              <View className='red' onClick={this.timeClear}>清零</View>
            </View>
            <View className={types3ClassName}>
              <View className='white' onClick={this.timePause}>暂停</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

