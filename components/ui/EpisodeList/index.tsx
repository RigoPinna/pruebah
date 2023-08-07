import { Timeline } from 'antd';
import { FC, useEffect } from 'react';
interface _props {
	episodes: string[];
}
const regex = /[0-9]+/g;
export const EpisodeList: FC<_props> = ({ episodes }) => {
	const numberOfChampers = episodes.map(url => {
		const [number] = url.match(regex) || [];
		return {
			label: `Chapter ${number}`,
			children: number,
		};
	});

	return <Timeline mode='left' items={numberOfChampers} />;
};
