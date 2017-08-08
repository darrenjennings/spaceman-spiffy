import React from 'react';

const ComicImage = (
	props: { image: Comic } // eslint-disable-line flowtype/no-types-missing-file-annotation
) => (
	<div>
		<div>
			<div className="ui image">
				<img alt={props.image['alt-text']} title={props.image.date} src={props.image.comic_img_url} />
			</div>
		</div>
	</div>
);

export default ComicImage;
