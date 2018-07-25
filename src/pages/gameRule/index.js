import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import './index.scss'
import BgImg from "./bg.png"
import GameRuleData from './../../gameData/index'
export default class Index extends Component {
  config = {
    navigationBarTitleText: '游戏'
  }
  componentWillMount () { }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () {

   }

  componentDidHide () {

  }
  render () {
    let groupClassName="red";
    let ruleDate = GameRuleData[this.$router.params.type];
    console.log(GameRuleData);
    console.log(this.$router.params);
    return (
      <View className='index'>
        <Image className='bg-img' src={BgImg} />
        <View className="team-info">
          <View className={groupClassName}>{ruleDate.title}</View>
        </View>
        <View className='content'>
          <View className='cover-rule'>游戏规则</View>
          <View className='cover-des'>
            <Text>{ruleDate.des}</Text>
          </View>
          <View className='cover-prop'>
            <Text>{ruleDate.prop}</Text>
          </View>
        </View>
        <View className='footer-button'>
          <View className='start-game' onClick={this.enterGame}>同步至现场玩家</View>
        </View>
      </View>
    )
  }
}

