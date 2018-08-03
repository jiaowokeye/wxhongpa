import Taro, { Component } from '@tarojs/taro'
import { View,Image} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import BgImg from "./bg.png"
import Scope1 from "./scope1.png"
import GameRuleData from './../../gameData/index'
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({

}))
export default class SSS extends Component {
  config = {
    navigationBarTitleText: '游戏',
    navigationStyle:"default"
  }
  state = {
    scope:0,
    visible:false,
    type:false
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
        Taro.onSocketOpen((res)=> {
          console.log('WebSocket连接已打开！');
          //发送一条注册
          Taro.sendSocketMessage({
            data:JSON.stringify({
              resourceType:1,
              userId:this.props.counter.USER_ID,
              roomId:this.props.counter.ROOM_ID,
              data:""
            }),
            success:()=>{
            }})
          Taro.onSocketMessage((res)=> {
            console.log('收到服务器内容：' + res.data);
            let results = JSON.parse(res.data);
            if(results.resourceType==2){//分数
              this.setState({
                visible:false,
                scope:JSON.parse(results.data)[this.props.counter.GROUP_INFO]
              })
            }else if(results.resourceType==3){//同步规则
              this.setState({
                visible:true,
                type:results.data
              })
            }else if(results.resourceType==4){//退出房间
              Taro.reLaunch({
                url: './../index/index'
              })
            }
          })
        })
        Taro.onSocketClose((res)=> {
          console.log('WebSocket 已关闭！')
        })

      },
      fail:()=>{

      }
    })
    this.getInfoById();
  }
  //获取房间信息
  getInfoById = ()=> {
    Taro.request({
      url: 'https://application.idaowei.com/party/room/basic/findById',
      data: {
        room_id: this.props.counter.ROOM_ID
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.data.result !== 1) {
          Taro.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false,
            success: function (res) {

            }
          })
        } else {

          try {
            let score = JSON.parse(res.data.data.score);
            console.log(score[this.props.counter.GROUP_INFO]);
            this.setState({
              scope:score[this.props.counter.GROUP_INFO]
            })
          }catch (err){

          }
          console.log();

        }
      }
    })
  }

  componentDidShow () {

   }

  componentDidHide () {

  }
  render () {
    let groupClassName=this.props.counter.GROUP_INFO==1?"red":"white";
    let teamInfoText = this.props.counter.GROUP_INFO==1?"红队":"白队";
    let coverClassName = this.state.visible?"cover-control":"cover-control hide";
    let ruleDate = GameRuleData[this.state.type];
    let scope = String(this.state.scope).split("");
    return (
      <View className='index'>
        <Image className='bg-img' src={BgImg} />
        <View className="team-info">
          <View className={groupClassName}>{teamInfoText}</View>
        </View>
        <View className='team-real'>实时积分</View>
        <View className='scope'>
          {
            scope.map((e,i)=>{
              let className = "font-icon font"+e;
              return (<Image className={className} key={i}/>)
            })
          }
        </View>
        <View  className={coverClassName}>
          <View className='cover-content'>
            <View className='cover-close' onClick={this.hideCover}></View>
            <View className='cover-title'>{ruleDate.title}</View>
            <View className='cover-rule'>游戏规则</View>
            <View className='cover-des'>
              <Text>{ruleDate.des}</Text>
            </View>
            <View className='cover-prop'>
              <Text>{ruleDate.prop}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

