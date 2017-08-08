// @flow

declare var module: {
	hot: {
		accept(path: string, callback: () => void): void
	}
};

export type Comic = {
	'alt-text': string,
	comic_img_url: string,
	date: string
};
