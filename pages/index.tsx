import { GetStaticProps, NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { LayoutHome } from '@/components/layouts';
import { CharacterList, _character_minify } from '@/components/ui';

import { _result_api } from '@/types';
import { useEffect, useState } from 'react';
const statusColors = {
	Alive: 'green',
	Dead: 'orange',
	unknown: 'grey',
};
Object.freeze(statusColors);
export const getStaticProps: GetStaticProps = async ctx => {
	try {
		const resp = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/character`,
			{
				method: 'GET',
			},
		);
		const data = (await resp.json()) as _result_api;
		const characters_minify = data.results.map(character => ({
			id: character.id,
			image: character.image,
			name: character.name,
			species: character.species,
			status: character.status,
			statusColor: statusColors[character.status] || 'blue',
		}));
		return {
			props: {
				characters: characters_minify,
				status: 'ok',
			},
		};
	} catch (error) {
		return {
			props: {
				characters: [],
				status: 'error',
			},
		};
	}
};
interface _props {
	characters: _character_minify[];
	status: 'ok' | 'error';
}
const Home: NextPage<_props> = ({ characters, status }) => {
	const [result, setResult] = useState<_character_minify[]>(characters);

	return (
		<>
			<LayoutHome>
				<CharacterList characters={result} />
			</LayoutHome>
		</>
	);
};
export default Home;
