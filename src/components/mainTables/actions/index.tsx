import React, { useEffect, useState } from "react"
import { uid, statusOfTables, tableActionAccess } from "../../../constants"
import { useAppSelector } from "../../../hooks/redux"
import { CancelAction } from "./CancelAction"
import { CompleteAction } from "./CompleteAction"
import { ReturnAction } from "./ReturnAction"
import { TakeAction } from "./TakeAction"
import { UpdateAction } from "./UpdateAction"

interface IProps {
	status: string
	rowId: string
}

interface IAction {
	status: string[]
	access: string[]
	element: JSX.Element
}

const library: IAction[] = [
	{
		status: [statusOfTables.pending],
		access: tableActionAccess.cancel,
		element: <CancelAction />
	},
	{
		status: [statusOfTables.inWork],
		access: tableActionAccess.complete,
		element: <CompleteAction />
	},
	{
		status: [statusOfTables.declined],
		access: tableActionAccess.return,
		element: <ReturnAction />
	},
	{
		status: [statusOfTables.pending],
		access: tableActionAccess.take,
		element: <TakeAction />
	},
	{
		status: [statusOfTables.pending,
		statusOfTables.inWork, statusOfTables.completed],
		access: tableActionAccess.update, element: <UpdateAction />
	}
]

export const TableActions: React.FC<IProps> = ({ status, rowId }) => {
	const [result, setResult] = useState<IAction[] | null>(null)
	const { currentOrder } = useAppSelector(state => state.mainTables)

	useEffect(() => {
		const filteredLibrary = library.filter(action => action.status.includes(status) && action.access.includes(uid.roleId))
		setResult(filteredLibrary)
	}, [status])

	if (result) return (
		<td style={{ display: rowId === currentOrder ? "flex" : "none" }}>
			{result.map((item, i) => (
				<React.Fragment key={i}>
					{item.element}
				</React.Fragment>))}
		</td>
	)
	return null
}