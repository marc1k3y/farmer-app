import React, { useEffect, useState } from "react"
import { roleId } from "../../constants"
import { CreateAccountRequestButton } from "./CreateAccountRequest"

interface IAction {
	access: string[]
	element: JSX.Element
}

export const OutTableActions = () => {
	const [result, setResult] = useState<IAction[] | null>(null)

	const library: IAction[] = [
		{ access: ["1", "3", "4", "7"], element: <CreateAccountRequestButton /> }
	]

	useEffect(() => {
		// @ts-ignore
		const filteredLibrary = library.filter(action => action.access.includes(roleId))
		setResult(filteredLibrary)
	}, [])
	if (result) return (
		<div>
			{/* @ts-ignore */}
			{result.map((item, i) => (
				<React.Fragment key={i}>
					{item.element}
				</React.Fragment>))}
		</div>
	)
}