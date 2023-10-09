import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import CharacterCard from '@/components/CharacterCard';
import Pagination from '@/components/Pagination';
import { useState } from 'react';
import { GetServerSideProps } from 'next';

export type CharacterCardPropsType = {
  id: number,
  name: string,
  image: string,
}

type HomePropsType = {
  characters: CharacterCardPropsType[],
  totalPage: number
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get the current page from the query string. If not provided, default to 1.
  const clientPage = Number(context.query.page) || 1;

  const serverPage = clientPage % 2 ? (clientPage + 1) / 2 : clientPage / 2;
  const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${serverPage}`);

  // If fetch is unsuccessful, return notFound or redirect.
  if (!res.ok) {
    return {
      notFound: true
    };
  }

  const data = await res.json();
  return {
    props: {
      characters: data.results,
      totalPage: Math.ceil(data.info.count / 10)
    }
  };
}



export default function Home({ characters, totalPage }: HomePropsType) {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = currentPage % 2 === 0 ? 10 : 0;
  const endIndex = startIndex + 10;
  const displayedCharacters = characters.slice(startIndex, endIndex);
  return (
    <>
      <Head>
        <title>Rick and Morty App</title>
        <meta name="description" content="Rick and Morty Characters" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>Rick And Morty Characters</h1>
      <div className={styles.container}>
        {displayedCharacters.map(character => (
          <CharacterCard key={character.id} {...character} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
      />
    </>
  );
}
