import styled from 'styled-components'
import colors from './colors'


export const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
`
export const HomeContainer = styled.div`
  width: 100%;
  height: 75vh;
  background-color: ${colors.secondary};
  padding: 50px 0px;
  display: flex;
  justify-content: space-around;
`

export const LeftCol = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: blue;
`
export const MiddleCol = styled.div`
  width: 60%;
  background-color: ${colors.tertiary};
`

export const RightCol = styled.div`
  width: 20%;
  background-color: ${colors.tertiary};
`


export const StyledTitle = styled.h2`
  text-align: center;
  color: ${colors.primary}
`
