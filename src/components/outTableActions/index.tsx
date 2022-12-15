import { useEffect, useState } from "react"
import { roleId } from "../../constants"
import { CreateAccountRequestButton } from "./CreateAccountRequest"

interface IAction {
	access: number[]
	element: JSX.Element
}

export const OutTableActions = () => {
	const [result, setResult] = useState<IAction[] | null>(null)

	const library: IAction[] = [
		{ access: [3, 4, 7], element: <CreateAccountRequestButton /> }
	]

	useEffect(() => {
		// @ts-ignore
		const filteredLibrary = library.filter(action => action.access.includes(roleId))
		setResult(filteredLibrary)
	}, [])
	return (
		<div>
			{/* @ts-ignore */}
			{result.map((item) => { item.element })}
		</div>
	)
}