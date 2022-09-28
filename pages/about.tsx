import React from 'react'
import styled from '@emotion/styled'

type prpos = {
  size: "l" | "s"
}

const StyledP = styled.p`
  color: blue;
`

const StyledP2 = styled.p<prpos>`
  color: orange;
  font-size: ${(props) => props.size === "l" ? "20px" : "5px"};
`

const About = () =>  {
  return (
    <div>
      <StyledP>アバウトです</StyledP>
      <StyledP2 size='s'>アバウトです</StyledP2>
      <StyledP2 size='l'>アバウトです</StyledP2>
    </div>
  )
}

export default About;