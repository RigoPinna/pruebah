import { Row } from 'antd';
import React from 'react';
import { CharacterCard } from './CharacterCard';

export const CharacterList = () => {
	return (
		<Row gutter={[16, 16]}>
			<CharacterCard />
		</Row>
	);
};
