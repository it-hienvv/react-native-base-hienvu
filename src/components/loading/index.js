import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {PADDING_COMMON} from 'contants/themes/size';
import themes from 'assets/themes';

export default function Loading() {
	return (
		<ActivityIndicator
			style={{alignSelf: 'center', marginVertical: PADDING_COMMON}}
			size="small"
			color={themes.getColor('blueLight')}
		/>
	);
}
