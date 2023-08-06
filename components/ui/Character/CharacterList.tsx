import { Row } from 'antd';
import React, { FC } from 'react';
import { CharacterCard, _character_minify } from './CharacterCard';
interface _props {
	characters: _character_minify[];
}
export const CharacterList: FC<_props> = ({ characters }) => {
	return (
		<Row gutter={[20, 20]}>
			{characters.map(character => {
				return <CharacterCard key={character.id} {...character} />;
			})}
		</Row>
	);
};
