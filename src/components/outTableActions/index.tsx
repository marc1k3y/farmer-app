import React, { useEffect, useState } from "react"
import { BuyerListButton } from "./BuyerList"
import { CreateAccountRequestButton } from "./CreateAccountRequest"
import { FarmerListButton } from "./FarmerList"
import { TeamleadListButton } from "./TeamleadList"
import { TeamManageButton } from "./TeamManageList"

interface IAction {
	access: string[]
	element: JSX.Element
}

const library: IAction[] = [
	{ access: ["1", "2"], element: <BuyerListButton /> },
	{ access: ["3", "4", "7"], element: <CreateAccountRequestButton /> },
	{ access: ["1"], element: <FarmerListButton /> },
	{ access: ["1"], element: <TeamleadListButton /> },
	{ access: ["5"], element: <TeamManageButton /> },
]

export const OutTableActions = () => {
	const [result, setResult] = useState<IAction[] | null>(null)

	useEffect(() => {
		const filteredLibrary = library.filter(action => action.access.includes(localStorage.getItem("roleId")))
		setResult(filteredLibrary)
	}, [])
	if (result) return (
		<div>
			{result.map((item, i) => (
				<React.Fragment key={i}>
					{item.element}
				</React.Fragment>))}
		</div>
	)
}