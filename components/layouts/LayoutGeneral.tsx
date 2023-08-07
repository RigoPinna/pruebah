import Head from 'next/head';
import React, { FC, ReactNode } from 'react';
import styles from './LayoutGeneral.module.css';
import { Navbar } from '../ui';
interface _props {
	metaTitle?: string;
	description?: string;
	image?: string;
	children: ReactNode;
}
export const LayoutGeneral: FC<_props> = ({
	metaTitle,
	description,
	image,
	children,
}) => {
	const title = !!metaTitle
		? `${metaTitle} | Rick and Morty`
		: `Rick and Morty`;
	const imageDescription = !!image
		? image
		: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg';
	const metaDescription = !!description
		? description
		: 'It is an American adult animated television series created by Justin Roiland and Dan Harmon in 2013 for Adult Swim, also aired on Cartoon Network. The series follows the misadventures of a scientist, Rick Sanchez, and his easily influenced grandson, Morty, who spend their time between domestic life and space, time and intergalactic travel.';
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={metaDescription} />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
				<meta property='og:title' content={title} />
				<meta
					property='og:url'
					content='https://rickandmorty-rcepeda.vercel.app/'
				/>
				<meta property='og:image' content={imageDescription} />
				<meta property='og:description' content={metaDescription} />
				<meta name='twitter:card' content='summary' />
				<meta property='twitter:title' content={title} />
				<meta
					property='twitter:url'
					content='https://rickandmorty-rcepeda.vercel.app/'
				/>
				<meta property='twitter:image' content={imageDescription} />
				<meta property='twitter:description' content={metaDescription} />
			</Head>
			<Navbar />
			<main className={styles.body}>{children}</main>
		</>
	);
};
