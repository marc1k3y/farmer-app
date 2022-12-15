import { useEffect, useState } from "react"
import { roleId, statusOfTables, tableActionAccess } from "../../../constants"
import { CancelAction } from "./CancelAction"
import { CompleteAction } from "./CompleteAction"
import { ReturnAction } from "./ReturnAction"
import { TakeAction } from "./TakeAction"
import { UpdateAction } from "./UpdateAction"

interface IProps {
	payload: string | null
	status: number
}

interface IAction {
	status: number[]
	access: number[]
	element: JSX.Element
}

export const TableActions: React.FC<IProps> = ({ payload, status }) => {
	const [result, setResult] = useState<IAction[] | null>(null)

	const library: IAction[] = [
		{
			status: [statusOfTables.pending],
			access: tableActionAccess.cancel,
			element: <CancelAction orderId={payload} />
		},
		{
			status: [statusOfTables.inWork],
			access: tableActionAccess.complete,
			element: <CompleteAction orderId={payload} />
		},
		{
			status: [statusOfTables.declined],
			access: tableActionAccess.return,
			element: <ReturnAction orderId={payload} />
		},
		{
			status: [statusOfTables.pending],
			access: tableActionAccess.take,
			element: <TakeAction orderId={payload} />
		},
		{
			status: [statusOfTables.pending,
			statusOfTables.inWork, statusOfTables.completed],
			access: tableActionAccess.update, element: <UpdateAction orderId={payload} />
		}
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