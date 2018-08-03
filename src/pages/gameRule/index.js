import Taro, { Component } from '@tarojs/taro'
import { View,Navigator} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import BgImg from "./bg.png"
import GameRuleData from './../../gameData/index'

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({

}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '游戏',
    navigationStyle:"default"
  }
  componentWillMount () { }

  componentDidMount () {
    Taro.connectSocket({
      url: 'wss://application.idaowei.com/party/websocket',
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
        Taro.onSocketOpen(function(res) {
          console.log('WebSocket连接已打开！');

          Taro.onSocketMessage(function(res) {
            console.log('收到服务器内容：' + res.data)
          })
        })
        Taro.onSocketClose(function(res) {
          console.log('WebSocket 已关闭！')
        })

      },
      fail:()=>{

      }
    })
  }

  componentWillUnmount () {
    Taro.closeSocket();
  }

  componentDidShow () {

   }

  componentDidHide () {

  }
  enterGame = ()=>{
    Taro.sendSocketMessage({
      data:JSON.stringify({
        resourceType:3,
        userId:this.props.counter.USER_ID,
        roomId:this.props.counter.ROOM_ID,
        data:this.$router.params.type
      }),
      success:()=>{
        Taro.showModal({
          title: '提示',
          content: "已同步",
          showCancel:false,
          success: function(res) {

          }
        })
      }
    })
  }
  render () {
    let groupClassName="red";
    let ruleDate = GameRuleData[this.$router.params.type];
    console.log(GameRuleData);
    console.log(this.$router.params);
    return (
      <View className='index'>
        <Image className='bg-img' src={BgImg} />
        <Navigator className='returnPre' open-type='navigateBack'><View className='fontReturn'/></Navigator>
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

