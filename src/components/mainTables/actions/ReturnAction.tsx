interface IProps {
  orderId: string | null
}

export const ReturnAction = ({ orderId }: IProps) => {
  console.log(orderId)
  
  return (
    <button>return</button>
  )
}