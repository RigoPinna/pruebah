import { _result_api } from '@/types';
const statusColors = {
	Alive: 'green',
	Dead: 'orange',
	unknown: 'grey',
};
Object.freeze(statusColors);
export const fomatterCharacters = (data: _result_api) => {
	return data.results.map(character => ({
		id: character.id,
		image: character.image,
		name: character.name,
		species: character.species,
		status: character.status,
		statusColor: statusColors[character.status] || 'blue',
	}));
};
