import { useState } from "react"

interface ILibrary {
	status: number[],
	access: number[],
	type: string,
	cb: (orderId: string) => void
}

export const TableActions = () => {
	const [payload, setPayload] = useState("")

	const library: ILibrary[] = [
		{ status: [], access: [], type: "return_order", cb: (orderId) => setPayload(orderId) }
	]
	return (
		<td>
			{/* filter by status and access and return TableActionButtons with cb */}
		</td>
	)
}