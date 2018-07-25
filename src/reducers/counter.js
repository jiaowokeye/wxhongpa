import * as Constants from "./../constants/counter"

const INITIAL_STATE = {
  IDENTITY_TYPE: 1,//玩家身份 1-玩家 2-裁判
  GROUP_INFO:1//队伍  1-红  2-白
}
export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Constants.IDENTITY:
      return {
        ...state,
        IDENTITY_TYPE: action.indentityType
      }
    case Constants.GROUP:
      return {
        ...state,
        GROUP_INFO: action.GroupType
      }
    default:
      return state
  }
}
