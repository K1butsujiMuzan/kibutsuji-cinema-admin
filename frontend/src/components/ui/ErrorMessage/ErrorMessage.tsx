interface Props {
  message: string
}

const ErrorMessage = ({ message }: Props) => {
  return (
    <small
      className={'text-xs leading-4 font-semibold py-1 text-red-400'}
      role={'alert'}
    >
      {message}
    </small>
  )
}

export default ErrorMessage
