import COLORS_LIST from './list/listColors';
import FONTS_LIST from './list/listFonts';
import IMAGES_LIST from './list/listImages';

class Themes {
	theme = 'theme1';
	constructor(name = 'theme1') {
		this.theme = name;
	}

	getColor(color, origin = false) {
		const colorResult = origin
			? COLORS_LIST['theme1'][color]
			: COLORS_LIST[this.theme][color];
		return colorResult;
	}

	getImages(image, origin = false) {
		const imageResult = origin
			? IMAGES_LIST['theme1'][image]
			: IMAGES_LIST[this.theme][image];
		return imageResult;
	}

	getFonts(font, origin = false) {
		const fontResult = origin
			? FONTS_LIST['theme1'][font]
			: FONTS_LIST[this.theme][font];
		return fontResult;
	}

	setThemes(theme) {
		this.theme = theme;
	}
}

export default new Themes('theme1');
