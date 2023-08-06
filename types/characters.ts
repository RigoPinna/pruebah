export interface _result_api {
	info: _info_api;
	results: _character[];
}

export interface _info_api {
	count: number;
	pages: number;
	next: string;
	prev: null;
}

export interface _character {
	id: number;
	name: string;
	status: _status_character;
	species: string;
	type: string;
	gender: _gender;
	origin: _location;
	location: Location;
	image: string;
	episode: string[];
	url: string;
	created: Date;
}

export enum _gender {
	Female = 'Female',
	Male = 'Male',
	Unknown = 'unknown',
}

export interface _location {
	name: string;
	url: string;
}
export enum _status_character {
	Alive = 'Alive',
	Dead = 'Dead',
	Unknown = 'unknown',
}
