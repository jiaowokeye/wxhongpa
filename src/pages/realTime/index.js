import Taro, { Component } from '@tarojs/taro'
import { View,Image,CoverView} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import BgImg from "./bg.png"
import Scope1 from "./scope1.png"
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({

}))
export default class SSS extends Component {
  config = {
    navigationBarTitleText: '游戏'
  }
  state = {
    scope:0,
    visible:true
  }
  showCover = ()=>{
    this.setState({
      visible:true
    })
  }
  hideCover = ()=>{
    this.setState({
      visible:false
    })
  }
  componentWillMount () { }

  componentDidMount () {
    console.log(this.props.counter.GROUP_INFO);//1-红  2-白
  }

  componentWillUnmount () { }

  componentDidShow () {

   }

  componentDidHide () {

  }
  render () {
    let groupClassName=this.props.counter.GROUP_INFO==1?"red":"white";
    let teamInfoText = this.props.counter.GROUP_INFO==1?"红队":"白队";
    let coverClassName = this.state.visible?"cover-control":"cover-control hide";
    let des = "在一张桌子上，排列20个一次性杯子.\n给到玩家一个气球,玩家需要\n通过吹气球，再把气球里的\n气对向杯子，把杯子吹到地上.\n在最短时间内将所有杯子\n吹到地上的获胜";
    let prop = "所需道具\n小红杯*20\n气球*2\n秒表*1";
    return (
      <View className='index'>
        <Image className='bg-img' src={BgImg} />
        <View className="team-info">
          <View className={groupClassName}>{teamInfoText}</View>
        </View>
        <View className='team-real'>实时积分</View>
        <View className='scope'>
          {/*{this.state.scope}*/}
          <Image src={Scope1} />
        </View>
        <View  className={coverClassName}>
          <View className='cover-content'>
            <View className='cover-close' onClick={this.hideCover}></View>
            <View className='cover-title'>倾囊相吹</View>
            <View className='cover-rule'>游戏规则</View>
            <View className='cover-des'>
              <Text>{des}</Text>
            </View>
            <View className='cover-prop'>
              <Text>{prop}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

