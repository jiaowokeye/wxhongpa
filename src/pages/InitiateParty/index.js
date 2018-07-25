import Taro, { Component } from '@tarojs/taro'
import { View ,Input,Text} from '@tarojs/components'
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
    step:1  //1发起或者加入派对按钮   2-输入数字  3-等人满然后进入游戏
  }
  componentWillMount () { }

  componentDidMount () {
      console.log(this.props.counter.IDENTITY_TYPE);//玩家身份 1-玩家 2-裁判
      this.setState({
        step:1
      })
  }
  changeStep=(step)=>{
    this.setState({
      step:step
    })
  }
  enterGame=()=>{
    console.log(this.state);
    //这里处理一些东西保存信息啊之类的
    //然后跳转
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
  componentWillUnmount () { }

  componentDidShow () {

  }

  componentDidHide () {

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
                <Input />
                <Button onClick={this.changeStep.bind(this,3)}>进入第三部</Button>
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

