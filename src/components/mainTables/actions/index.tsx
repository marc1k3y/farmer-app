import { ReactNode, useEffect, useState } from "react"
import { roleId } from "../../../constants"
import { ReturnAction } from "./ReturnAction"

interface IProps {
	payload: string | null
	status: number
}

interface IAction {
	status: number[]
	access: number[]
	element: ReactNode
}

export const TableActions: React.FC<IProps> = ({ payload, status }) => {
	const [result, setResult] = useState<IAction[] | null>(null)

	const library: IAction[] = [
		{ status: [], access: [], element: <ReturnAction orderId={payload} /> }
	]

	useEffect(() => {
		// @ts-ignore
		const filteredLibrary = library.filter(action => action.status.includes(status) && action.access.includes(roleId))
		setResult(filteredLibrary)
	}, [])
	if (result) return (
		<div>
			{/* @ts-ignore */}
			{result.map((item) => { item.element })}
		</div>
	)
	return null
}