import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import configStore from './store'
import Index from './pages/index/index'
import './app.scss'
import './tongxin.css'
const store = configStore();
class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/InitiateParty/index',
      'pages/fillInfo/index',
      'pages/chooseGroup/index',
      'pages/realTime/index',
      'pages/gameControl/index',
      'pages/gameRule/index',
      'pages/functionControl/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationStyle: "custom",
      onReachBottomDistance:0
    }
  }

  componentDidMount () {

  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
