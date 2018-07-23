import Taro, { Component } from '@tarojs/taro'
import { View ,Button,Text} from '@tarojs/components'
import './index.scss'
export default class SSS extends Component {
  config = {
    navigationBarTitleText: '这个页面'
  }
  state = {
    num:1,
    dao:60,
    time:1,
    Timer:null
  }
  componentWillMount () { }

  componentDidMount () {
    this.TImer = setInterval(()=>{
      this.setState({
        dao:this.state.dao-1,
        time:this.state.time+1
      })
    },1000)
  }

  componentWillUnmount () { }

  componentDidShow () {
    if(this.Timer){
      clearInterval(this.Timer);
    }
    
    this.setState({
      num:1,
      dao:60,
      time:1,
    })
   }

  componentDidHide () { 
   
  }
  add = ()=>{
    this.setState({
      num:this.state.num+1
    })
  }
  jian = ()=>{
    this.setState({
      num:this.state.num-1
    })
  }
  render () {
    return (
      <View className='index'>
        <View className="number">{this.state.num}</View>
        <Button onClick={this.add}>+</Button>
        <Button onClick={this.jian}>-</Button>

        <View>
          <Text>这是倒计时</Text>
          <Text>{this.state.dao}</Text>
        </View>

        <View>
          <Text>这是计时</Text>
          <Text>{this.state.time}</Text>
        </View>
      </View>
    )
  }
}

