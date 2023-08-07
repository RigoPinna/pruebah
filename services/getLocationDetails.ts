import { _url_character, getResidents } from './getResidents';

export interface _location_details {
	id: number;
	name: string;
	type: string;
	dimension: string;
	residents: _url_character[];
	url: string;
	created: Date;
}
export interface _location_details_mim {
	name: string;
	type: string;
	dimension: string;
	residents: _url_character[];
}

export const getLocationDetails = async (url: string) => {
	const resp = await fetch(url);
	const data = (await resp.json()) as _location_details;
	return {
		name: data.name,
		type: data.type,
		dimension: data.dimension,
		residents: data.residents,
	};
};
