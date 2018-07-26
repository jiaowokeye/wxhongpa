import Taro, { Component } from '@tarojs/taro'
import { View ,Input,Text,OpenData} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import BgImg from "./bg.png"

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({

}))
export default class SSS extends Component {
  config = {
    navigationBarTitleText: '游戏'
  }
  state = {
    step:1,  //1发起或者加入派对按钮   2-输入数字  3-等人满然后进入游戏
    userInfo:{},
    hasUserInfo:false,
    password:"····",
    focus:false
  }

  componentDidMount () {
      let [code,openid] = ["",""];
      console.log(this.props.counter.IDENTITY_TYPE);//玩家身份 1-玩家 2-裁判
      this.setState({
        step:1
      })
  }
  changeStep=(step)=>{
    this.setState({
      step:step,
      focus:false
    })
    if(step==2){
      this.setState({
        focus:true
      })
    }
  }
  enterGame=()=>{
    console.log(this.state);
    //这里处理一些东西保存信息啊之类的
    //然后跳转
    if(this.props.counter.IDENTITY_TYPE==1){//玩家身份点确认 进去选队伍积分页面
      Taro.navigateTo({
        url: './../realTime/index'
      })
    }else{//裁判身份点确认，进去游戏控制中心
      Taro.navigateTo({
        url: './../gameControl/index'
      })
    }

  }
  changePassWord = (e)=>{
    let value = e.target.value;
    if(value.length<4){
      value = value + "····".substr(value.length,4);
      this.setState({
        password:value
      })
    }else{
      this.setState({
        password:value
      });
      this.changeStep(3);
    }


  }
  onBlur = ()=>{
    this.setState({
      focus:false
    })
  }

  render () {
    let partyText = this.props.counter.IDENTITY_TYPE==1?"进入":"发起";
    let step1ClassName = this.state.step==1?"step1":"hide";
    let step2ClassName = this.state.step==2?"step2":"hide";
    let step3ClassName = this.state.step==3?"step3":"hide";
    return (
      <View className='index'>
        <Image className='bg-img' src={BgImg} />
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
                <Input type='number' onBlur={this.onBlur} onInput={this.changePassWord} focus={this.state.focus} confirm-hold={true}/>
                <View onClick={this.changeStep.bind(this,2)}>{this.state.password}</View>
                <Button onClick={this.changeStep.bind(this,3)}>进入第三步(pc拉不起键盘，开发用按钮，手机请直接输入)</Button>
            </View>
          </View>
        </View>
        <View className={step3ClassName}>
          <View className='top'>
            <View className='title'>2926</View>
            <View className='des'>
              <Text>这些朋友也将进入派对</Text>
            </View>
            <View className='content'>
              <OpenData type='userAvatarUrl' />
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

