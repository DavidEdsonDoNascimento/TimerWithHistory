import styled from 'styled-components'
import { ButtonVariant } from '../@types'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const buttonColorMap = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  ${(props) => {
    return `background-color: ${buttonColorMap[props.variant]}`
  }}
`
