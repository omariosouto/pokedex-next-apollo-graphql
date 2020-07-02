import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import { apolloClientBuilder } from '../infra/apolloClientBuilder';

const POKEMONS_FIRST_150 = gql`
  query {
    pokemons(first: 150) {
      name
    }
  }
`;

export default function Home({ initialData }) {
  // const { loading, error, data } = useQuery(POKEMONS_FIRST_150);
  // if(loading) return (<p>Cargando...</p>)
  // if(error) return (<p>Faiou :(</p>)
  // console.log('data', data);

  console.log('initialData', initialData)

  return (
    <div>
      <h1>PokeBank</h1>
      <Link href="/about">
        <a>
          Sobre?
        </a>
      </Link>
      
      {initialData.pokemons.map((country) => {
        return (
          <li key={country.name}>
            {country.name}
          </li>
        )
      })}
    </div>
     ) 
 } 
                         
export async function getStaticProps() {
  // Fazer uma abstração repository que da a opção de pegar a versão cacheada 
  // Quando constrói com um client passado.
  const apolloClient = apolloClientBuilder();

  const pokemonsQuery = {
    query: POKEMONS_FIRST_150
  };

  await apolloClient.query(pokemonsQuery)

  return {
    props: {
      initialData: {
        pokemons: apolloClient.cache.readQuery(pokemonsQuery)
      },
    },
  }
}


function PokemonsRepository() {
  const POKEMON_NAMES = gql`
    query {
      pokemons($first: Int!) {
        name
      }
    }
  `;


  return {
    getFirst(first = 150) {
      const queryStructure = {
        query: POKEMON_NAMES,
        variables: {
          first
        }
      } 
    }
  }
}