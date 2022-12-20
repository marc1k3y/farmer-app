export function formatUnixDate(unixDate: number) {
  const date = new Date(unixDate * 1000).toLocaleDateString()
  return date
}

export function setRoleName(item: any) {
  if (item.farmer.fullName) {
    return item.farmer.fullName
  } else if (item.buyer.fullName) {
    return item.buyer.fullName
  } else if (item.team.teamlead.fullName) {
    return item.team.teamlead.fullName
  }
}

export function getTableNameByStatus(object: any, status: any) {
  return Object.keys(object).find(key => object[key] === status)
}