import { ButtonContainer } from './Button.module.ts'
import { ButtonVariant } from '../@types'

interface ButtonProps {
  color?: ButtonVariant
}

export const Button = ({ color = 'primary' }: ButtonProps) => {
  return (
    <>
      <ButtonContainer variant={color}>Botao</ButtonContainer>
    </>
  )
}
