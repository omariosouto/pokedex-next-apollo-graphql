import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import { apolloClientBuilder } from '../infra/apolloClientBuilder';

const ALL_COUNTRIES = gql`
  query {
    pokemons(first: 150) {
      name
    }
  }
`;

export default function Home({ initialData }) {
  // const { loading, error, data } = useQuery(ALL_COUNTRIES);
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
    query: ALL_COUNTRIES
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