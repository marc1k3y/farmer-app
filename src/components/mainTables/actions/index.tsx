import React, { useEffect, useState } from "react"
import { roleId, statusOfTables, tableActionAccess } from "../../../constants"
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

export const TableActions: React.FC<IProps> = ({ status, rowId }) => {
	const [result, setResult] = useState<IAction[] | null>(null)
	const { currentOrder } = useAppSelector(state => state.mainTables)

	const library: IAction[] = [
		{
			status: [statusOfTables.pending],
			access: tableActionAccess.cancel,
			element: <CancelAction orderId={currentOrder} />
		},
		{
			status: [statusOfTables.inWork],
			access: tableActionAccess.complete,
			element: <CompleteAction orderId={currentOrder} />
		},
		{
			status: [statusOfTables.declined],
			access: tableActionAccess.return,
			element: <ReturnAction orderId={currentOrder} />
		},
		{
			status: [statusOfTables.pending],
			access: tableActionAccess.take,
			element: <TakeAction orderId={currentOrder} />
		},
		{
			status: [statusOfTables.pending,
			statusOfTables.inWork, statusOfTables.completed],
			access: tableActionAccess.update, element: <UpdateAction orderId={currentOrder} />
		}
	]

	useEffect(() => {
		// @ts-ignore
		const filteredLibrary = library.filter(action => action.status.includes(status) && action.access.includes(roleId))
		setResult(filteredLibrary)
		// eslint-disable-next-line
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