import React, { FC } from "react";
import styles from '@/styles/CharacterCard.module.css'
import { CharacterCardPropsType } from "@/pages";
import Image from 'next/image';




const CharacterCard: FC<CharacterCardPropsType> = ({id, name, image}) => {
    return (<div className={styles.card}>
        <Image src={image} alt={name} width={300} height={300} />
        <h2>{name}</h2>
      </div>)
}

export default CharacterCard;