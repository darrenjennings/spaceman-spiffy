// @flow

import React from 'react';

class ComicImage extends React.Component {
	shouldComponentUpdate() {
		return false;
	}

	props: { image: Comic }; // eslint-disable-line flowtype/no-types-missing-file-annotation

	render() {
		return (
			<div>
				<div>
					<div className="ui image">
						<img
							alt={this.props.image['alt-text']}
							title={this.props.image.date}
							src={this.props.image.comic_img_url.replace('http:', 'https:')}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ComicImage;
