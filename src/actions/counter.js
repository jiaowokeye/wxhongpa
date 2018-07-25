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
