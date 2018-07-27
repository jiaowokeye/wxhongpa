import * as Constants from "./../constants/counter"
export const changeIndentityType = (indentityType) => {
  return {
    type: Constants.IDENTITY,
    indentityType:indentityType
  }
}

export const changeGroupType = (GroupType) => {
  return {
    type: Constants.GROUP,
    GroupType:GroupType
  }
}

export const saveOpenid = (openid) => {
  return {
    type: Constants.OPENID,
    OPEN_ID:openid
  }
}

export const savePhoto = (url) => {
  return {
    type: Constants.PHOTO,
    PHOTO_URL:url
  }
}

export const saveUserId = (userid) => {
  return {
    type: Constants.USERID,
    USER_ID:userid
  }
}

