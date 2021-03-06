import * as Constants from "./../constants/counter"

const INITIAL_STATE = {
  IDENTITY_TYPE: 1,//玩家身份 1-玩家 2-裁判
  GROUP_INFO:1,//队伍  1-红  2-白
  OPEN_ID:"",
  PHOTO_URL:"",
  USER_ID:"",
  ROOM_ID:""
}
export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Constants.IDENTITY:
      return {
        ...state,
        IDENTITY_TYPE: action.indentityType
      }
      break;
    case Constants.GROUP:
      return {
        ...state,
        GROUP_INFO: action.GroupType
      }
      break;
    case Constants.OPENID:
      return {
        ...state,
        OPEN_ID: action.OPEN_ID
      }
      break;
    case Constants.PHOTO:
      return {
        ...state,
        PHOTO_URL: action.PHOTO_URL
      }
      break;
    case Constants.USERID:
      return {
        ...state,
        USER_ID: action.USER_ID
      }
      break;
    case Constants.ROOMID:
      return {
        ...state,
        ROOM_ID: action.ROOM_ID
      }
      break;
    default:
      return state
  }
}
