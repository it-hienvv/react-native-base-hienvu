// import I18nTran from 'assets/language';
const START_VALID_PHONE_NUMBER = [
	'86',
	'96',
	'97',
	'98',
	'162',
	'163',
	'164',
	'165',
	'166',
	'167',
	'168',
	'169',
	'90',
	'93',
	'120',
	'121',
	'122',
	'126',
	'128',
	'91',
	'94',
	'123',
	'124',
	'125',
	'127',
	'129',
	'88',
	'92',
	'188',
	'186',
	'52',
	'99',
	'199',
	'89',
	'868',
	'32',
	'33',
	'34',
	'35',
	'36',
	'37',
	'38',
	'39',
	'70',
	'79',
	'77',
	'76',
	'78',
	'83',
	'84',
	'85',
	'81',
	'82',
	'56',
	'58',
	'59',
	'24',
	'296',
	'254',
];
export const isValidPhoneNumber = str => {
	if (!str) return false;
	if (str.length < 10 || str.length > 15) return false;
	if (str[0] === 0 && str.length < 10) return false;
	let validStart = [
		...START_VALID_PHONE_NUMBER,
		...START_VALID_PHONE_NUMBER.map(number => '0' + number),
		...START_VALID_PHONE_NUMBER.map(number => '84' + number),
		...START_VALID_PHONE_NUMBER.map(number => '\\+84' + number),
		// ...START_VALID_PHONE_NUMBER.map(number => '\\(84\\)' + number),
		// ...START_VALID_PHONE_NUMBER.map(number => '\\(\\+84\\)' + number),
	];

	let joinCondition = validStart.join('|');
	let phoneRegexStr = '^(' + joinCondition + ')';
	// \\d{7}$
	let phoneRegex = new RegExp(phoneRegexStr);
	return phoneRegex.test(str);
};

export const isValidEmail = str => {
	if (!str) return false;
	// ^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$
	let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	let result = emailRegex.test(str);

	if (result === true) {
		if (str[str.indexOf('@') + 1] === '-' || str[str.length - 1] === '-') {
			return false;
		}
	}

	return result;
};
