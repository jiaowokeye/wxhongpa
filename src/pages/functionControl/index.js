import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import './index.scss'
import BgImg from "./bg.png"
let Time1 = null;
export default class Index extends Component {
  config = {
    navigationBarTitleText: '游戏'
  }
  state={
    scope1:0,//红队分
    scope2:0,//白队分
    minutes:0,
    second:0
  }
  componentWillMount () { }

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

  componentWillUnmount () { }

  componentDidShow () {

  }

  componentDidHide () {

  }
  render () {
    let types1ClassName = this.$router.params.type=="1"?"types1":"hide";
    let types2ClassName = this.$router.params.type!=="1"?"types2":"hide";
    let types3ClassName = this.$router.params.type=="2"?"rowspan types3":"hide";
    let timeDes = this.$router.params.type=="2"?"秒表":"倒计时";
    let timeStr = this.getDate(this.state.minutes)+"."+this.getDate(this.state.second);
    return (
      <View className='index'>
        <Image className='bg-img' src={BgImg} />
        <View className={types1ClassName}>
          <View className='top'>计分器</View>
          <View className='middle'>
            <View className='colspan'>
              <View className='rowspan group'>
                红
              </View>
              <View className='rowspan' onClick={this.changeScope.bind(this,1,1)}>
                <View className='red'>+</View>
              </View>
              <View className='rowspan scope'>
                {
                  this.state.scope1
                }
              </View>
              <View className='rowspan' onClick={this.changeScope.bind(this,1,2)}>
                <View className='red'>-</View>
              </View>
            </View>
            <View className='colspan colspan-middle'>
              <View className='rowspan group'></View>
              <View className='rowspan add'></View>
              <View className='rowspan scope'>:</View>
              <View className='rowspan less'></View>
            </View>
            <View className='colspan'>
              <View className='rowspan group'>
                白
              </View>
              <View className='rowspan' onClick={this.changeScope.bind(this,2,1)}>
                <View className='white'>+</View>
              </View>
              <View className='rowspan scope'>
                {
                  this.state.scope2
                }
              </View>
              <View className='rowspan' onClick={this.changeScope.bind(this,2,2)}>
                <View className='white'>-</View>
              </View>
            </View>
          </View>
          <View className='bottom'></View>
        </View>
        <View className={types2ClassName}>
          <View className='top'>{timeDes}</View>
          <View className='middle'>
            {timeStr}
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

