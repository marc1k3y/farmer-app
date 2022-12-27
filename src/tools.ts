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

export function createPeriodForRequest(period) {
  const startDate = period.from?.toISOString().split('T')[0]
  const endDate = period.to?.toISOString().split('T')[0]
  return { startDate, endDate }
}

// export function getTableNameByStatus(object: any, status: any) {
//   return Object.keys(object).find(key => object[key] === status)
// }