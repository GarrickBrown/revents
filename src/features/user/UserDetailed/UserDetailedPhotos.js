import React from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';

const UserDetailedPhotos = ({ photos }) => {
	return (
		<Segment attached>
			<Header icon="image" content={photos.length > 1 ? 'Photos' : 'Photo'} />

			<Image.Group size="small">
				{photos &&
					photos.map(photo => (
						<LazyLoad
							key={photo.id}
							height={150}
							offset={200}
							placeholder={<Image src="/assets/user.png" />}
						>
							<Image src={photo.url} />
						</LazyLoad>
					))}
			</Image.Group>
		</Segment>
	);
};

export default UserDetailedPhotos;
