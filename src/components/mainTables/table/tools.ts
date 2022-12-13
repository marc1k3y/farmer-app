// @ts-ignore
export function converDate(unixDate) {
  const date = new Date(unixDate * 1000).toLocaleDateString()
  return date
}

// @ts-ignore
export function setName(item) {
  if (item.farmer.fullName) {
    return item.farmer.fullName
  } else if (item.buyer.fullName) {
    return item.buyer.fullName
  } else if (item.team.teamlead.fullName) {
    return item.team.teamlead.fullName
  }
}