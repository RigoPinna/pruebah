import { _character, _result_api } from '@/types';
const statusColors = {
	Alive: 'green',
	Dead: 'orange',
	unknown: 'grey',
};
Object.freeze(statusColors);
export const fomatterCharacters = (data: _character[]) => {
	return data.map(character => ({
		id: character.id,
		image: character.image,
		name: character.name,
		species: character.species,
		status: character.status,
		statusColor: statusColors[character.status] || 'blue',
	}));
};
