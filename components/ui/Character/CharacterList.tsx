import { Empty, Row, Typography } from 'antd';
import React, { FC } from 'react';
import { CharacterCard, _character_minify } from './CharacterCard';
import no_data_img from '../../../public/no-data.png';
import Image from 'next/image';
import styles from './CharacterList.module.css';
import { MehOutlined } from '@ant-design/icons';
interface _props {
	characters: _character_minify[];
}
export const CharacterList: FC<_props> = ({ characters }) => {
	if (characters.length <= 0) {
		return (
			<Empty
				image={
					<Image
						className={styles.illustration}
						src={no_data_img}
						alt='Empty'
					/>
				}
				imageStyle={{ height: '222px', marginTop: '25px' }}
				description={
					<>
						<Typography.Title level={3}>
							<span>
								<MehOutlined />
							</span>
							No results found
						</Typography.Title>
						<Typography.Text type='secondary'>
							It seems we can’t find any results based on your search.
						</Typography.Text>
					</>
				}
			/>
		);
	}
	return (
		<Row gutter={[20, 20]}>
			{characters.map(character => {
				return <CharacterCard key={character.id} {...character} />;
			})}
		</Row>
	);
};
