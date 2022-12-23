interface IProps {
  orderId: string | null
}

export const CancelAction = ({ orderId }: IProps) => {
  return (
    <button>cancel</button>
  )
}