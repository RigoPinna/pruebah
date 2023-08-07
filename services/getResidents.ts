import { _character } from '@/types';

export type _url_character =
	`https://rickandmortyapi.com/api/character/${number}`;

export interface _resident {
	id: number;
	name: string;
	image: string;
}
export const getResidents = async (url: _url_character) => {
	const resp = await fetch(url, {
		method: 'GET',
		headers: new Headers({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		}),
	});
	const data = (await resp.json()) as _character;

	return {
		id: data.id,
		name: data.name,
		image: data.image,
	};
};
