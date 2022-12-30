// export const api = "https://g-go-farming.azurewebsites.net/v2/"
export const api = "http://localhost/v2/"

export enum Apps {
	farmer = "farmer",
	tech = "tech",
	creative = "creative"
}

export const uid = {
	roleId: localStorage.getItem("roleId"),
	token: localStorage.getItem("token"),
	username: localStorage.getItem("username"),
	teamId: localStorage.getItem("teamId"),
	userId: localStorage.getItem("userId")
}

export const workerTableNameByRoleId = {
	"1": "Buyer",
	"2": "Buyer",
	"3": "Farmer",
	"4": "Farmer",
	"5": "Buyer",
	"6": "Buyer",
	"7": "Farmer"
}

export const statusOfTables = {
	pending: "0",
	inWork: "1",
	completed: "2",
	declined: "3"
}

export const tableActionAccess = {
	cancel: ["3", "4", "7"],
	complete: ["5", "6"],
	return: ["1", "2", "3", "4", "5", "6", "7"],
	take: ["5", "6"],
	update: ["1", "2", "3", "4", "7"]
}

export const outTableActionAccess = {
	createAccountRequest: [2, 3, 4, 7],
	buyerList: [1, 2],
	farmerList: [1, 5],
	teamleadList: [1],
	teamManage: [5]
}

export const workerNameInTableByRole = {
	1: "Farmer",
	2: "Buyer",
	3: "Farmer",
	4: "Buyer",
	5: "Farmer",
	6: "Farmer",
	7: "Farmer"
}