import Taro, { Component } from '@tarojs/taro'
import { View,Image} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { changeGroupType } from '../../actions/counter'
import './index.scss'
import BgImg from "./bg.png"
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  changeGroupType (type) {
    dispatch(changeGroupType(type))
  }
}))
export default class ChooseGroup extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  componentDidMount(){

  }

  /**
   * 选择队伍   红-1  白-2
   * @param type
   */
  chooseGroup=(type)=>{
    this.props.changeGroupType(type);
    Taro.navigateTo({
      url: './../fillInfo/index'
    })
  }
  render () {
    return (
      <View className='index'>
        <Image className='bg-img' src={BgImg} />
        <View className='contect'>
          <View className='button-row'>
            <View className='red' onClick={this.chooseGroup.bind(this,1)}>
                红
            </View>
          </View>
          <View className="text">请选择你的队伍</View>
          <View className='button-row'>
            <View className='white'  onClick={this.chooseGroup.bind(this,2)}>
              白
            </View>
          </View>
        </View>
      </View>
    )
  }
}

