export const api = "https://g-go-farming.azurewebsites.net/v2/"

export const roleId = localStorage.getItem("roleId")

export const statusOfTables = {
    pending: 0,
    inWork: 1,
    completed: 2,
    declined: 3
}

export const tableActionAccess = {
    cancel: [3, 4, 7],
    complete: [5, 6],
    return: [1, 2, 3, 4, 5, 6, 7],
    take: [5, 6],
    update: [1, 2, 3, 4, 7]
}

export const outTableActionAccess = {
    createAccountRequest: [2, 3, 4, 7],
    buyerList: [1, 2],
    farmerList: [1, 5],
    teamleadList: [1],
    teamManage: [5]
}