import { fomatterCharacters } from '@/utils';

export const getCharacterByNameOrSpecie = async (name = '', specie = '') => {
	let query = '';
	try {
		switch (true) {
			case name !== '' && specie !== '':
				query = `/character/?name=${name}&species=${specie}`;
				const resp1 = await fetch(
					`${process.env.NEXT_PUBLIC_API_DOMAIN}${query}`,
				);
				const data1 = await resp1.json();
				return { ...data1, results: fomatterCharacters(data1.results) };
			case name !== '':
				query = `/character/?name=${name}`;
				const resp2 = await fetch(
					`${process.env.NEXT_PUBLIC_API_DOMAIN}${query}`,
				);
				const data2 = await resp2.json();
				return { ...data2, results: fomatterCharacters(data2.results) };
			case specie !== '':
				query = `/character/?species=${specie}`;
				const resp3 = await fetch(
					`${process.env.NEXT_PUBLIC_API_DOMAIN}${query}`,
				);
				const data3 = await resp3.json();
				return { ...data3, results: fomatterCharacters(data3.results) };

			default:
				break;
		}
	} catch (error) {
		return {};
	}
};
