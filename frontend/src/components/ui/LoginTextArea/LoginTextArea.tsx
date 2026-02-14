import type { TextareaHTMLAttributes } from 'react'
import { cn } from '../../../lib/utils.ts'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText: string
  id: string
  className?: string
  isValid?: boolean
}

const LoginTextArea = ({
  labelText,
  id,
  className,
  isValid,
  ...props
}: Props) => {
  return (
    <div
      className={cn(
        'w-full text-18 leading-6.5 font-medium pt-6 border-b-2 border-current has-focus:border-pink-400 not-has-placeholder-shown:border-pink-400 transition duration-300',
        className,
        {
          'border-pink-400': isValid,
          '': !isValid,
        },
      )}
    >
      <div className={'relative'}>
        <textarea
          aria-invalid={isValid}
          {...props}
          className={
            'peer outline-none w-full py-1 px-0.5 resize-none overflow-auto max-h-50 field-sizing-content block'
          }
          id={id}
          placeholder={' '}
        />
        <label
          htmlFor={id}
          className={cn(
            'absolute left-0.5 pointer-events-none top-0 peer-focus:-translate-y-full peer-focus:scale-65 peer-not-placeholder-shown:-translate-y-full origin-left peer-not-placeholder-shown:scale-65 transition duration-300',
            {
              'text-pink-400': isValid,
            },
          )}
        >
          {labelText}
        </label>
      </div>
    </div>
  )
}

export default LoginTextArea
