import React, { useEffect, useState } from "react"
import { roleId } from "../../constants"
import { CreateAccountRequestButton } from "./CreateAccountRequest"

interface IAction {
	access: string[]
	element: JSX.Element
}

const library: IAction[] = [
	{ access: ["3", "4", "7"], element: <CreateAccountRequestButton /> }
]
const filteredLibrary = library.filter(action => action.access.includes(roleId))

export const OutTableActions = () => {
	const [result, setResult] = useState<IAction[] | null>(null)

	useEffect(() => {
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