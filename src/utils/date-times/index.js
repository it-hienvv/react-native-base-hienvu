import moment from 'moment';

export const formatTime = value => moment(value).format('HH:mm DD/MM/YYYY');

export const formatDate = value => moment(value).format('DD/MM/YYYY');

export const getCurrentTimeMilliseconds = () => moment().unix();

export const getRangeYears = startYear => {
	const currentYear = new Date().getFullYear();
	const years = [];
	startYear = startYear || 1980;
	let index = 0;
	while (startYear <= currentYear) {
		let year = startYear++;
		const obj = {
			key: index++,
			text: year.toString(),
		};
		years.push(obj);
	}
	return years;
};

export const subTractMonth = number =>
	moment()
		.subtract(number, 'months')
		.format('YYYY/MM');
export const subTractYear = number =>
	moment()
		.subtract(number, 'years')
		.format('YYYY');
export const formatYear = str => moment(str).format('YYYY');

export const formatMonth = str => moment(str).format('MM');

export const getCurrentYear = () => moment().format('YYYY');
