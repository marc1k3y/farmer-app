interface IProps {
  orderId: string | null
}

export const ReturnAction = ({ orderId }: IProps) => {
  return (
    <button>return</button>
  )
}