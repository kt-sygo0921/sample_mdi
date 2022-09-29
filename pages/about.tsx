import React, { useEffect } from 'react'
import styled from '@emotion/styled'

type Size = "l" | "s";

type Coffee = {
  title: String;
  description: String;
  ingredients: String[];
  image: String;
  id: Number;
}

type Props = {
  size: Size
  coffee: Coffee
}

type StyledPprops = {
  size: Size
}

const StyledP = styled.p`
  color: blue;
`

const StyledP2 = styled.p<StyledPprops>`
  color: orange;
  font-size: ${(props) => props.size === "l" ? "20px" : "5px"};
`

const About: React.FC<Props> = (props) =>  {
  return (
    <div>
      <StyledP>アバウトです</StyledP>
      <StyledP2 size='s'>アバウトです</StyledP2>
      <StyledP2 size='l'>アバウトです</StyledP2>
      <StyledP2 size={props.size ? props.size : 's'}>{props.coffee.title}</StyledP2>
    </div>
  )
}

export const getServerSideProps = async () => {
  const baseURL = 'https://api.sampleapis.com/coffee/hot';
  const coffee: Coffee = await fetch(baseURL)
  .then(resp => resp.json())
  return {
    props: {
      size: 'l',
      coffee: coffee[0]
    }
  }
}

export default About;