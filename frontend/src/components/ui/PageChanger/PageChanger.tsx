import ActionButton from '../ActionButton/ActionButton.tsx'

interface Props {
  page: number
  count: number
  onBack: () => void
  onForward: () => void
  disabled: boolean
}

const PageChanger = ({ page, count, onBack, onForward, disabled }: Props) => {
  return (
    <div className={'flex items-center gap-3 mx-auto'}>
      <ActionButton
        label={'previous page'}
        onClick={onBack}
        type={'left'}
        disabled={disabled || page === 1}
      />
      <span>
        {page} of {Math.ceil(count / 10)}
      </span>
      <ActionButton
        label={'next page'}
        onClick={onForward}
        type={'right'}
        disabled={disabled || page >= Math.ceil(count / 10)}
      />
    </div>
  )
}

export default PageChanger
