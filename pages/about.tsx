import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import {gql, useQuery} from '@apollo/client';

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

const query = gql`
  query($id:ID!) {
    Hot(id:$id) {
      id
      title
    }
  }
`;

const About: React.FC<Props> = (props) =>  {
  const {loading, error, data} = useQuery(query,{
    variables: {
      id: 2
    }
  });

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error</p>
  return (
    <div>
      <StyledP>アバウトです</StyledP>
      <StyledP2 size='s'>アバウトです</StyledP2>
      <StyledP2 size='l'>アバウトです</StyledP2>
      <StyledP2 size={props.size ? props.size : 's'}>RESTで取得したコーヒーは{props.coffee.title}</StyledP2>
      <StyledP2 size='l'>grapphqlで取得したコーヒーは{data.Hot.title}です</StyledP2>
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