import styled from 'styled-components'
import { Link } from 'react-router-dom'
import colors from './colors'



export const StyledLink = styled(Link)`
    padding: 10px 15px;
    color: ${colors.primary};
    text-decoration: none;
    font-size: 18px;
    text-align: center;
    background-color: white;
    border: 1px solid grey;
`

export const HeaderCol = styled.div`
    display: flex;
    height: auto;
`