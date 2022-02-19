import React from 'react';
import Toast, { SuccessToast, ErrorToast, InfoToast } from 'react-native-toast-message';

export function toastSuccess(text1, text2) {
	Toast.show({ type: 'success', text1, text2 });
}

export function toastError(text1, text2) {
	Toast.show({ type: 'error', text1: text1 || 'Something went wrong', text2 });
}

export function toastInfo(text1, text2) {
	Toast.show({ type: 'info', text1, text2 });
}

export const toastConfig = {
	success: (props) => (
		<SuccessToast
			{...props}
			text1NumberOfLines={0}
			text2NumberOfLines={0}
			style={{ maxWidth: '80%', borderLeftColor: '#69C779' }}
		/>
	),
	error: (props) => (
		<ErrorToast
			{...props}
			text1NumberOfLines={0}
			text2NumberOfLines={0}
			style={{ maxWidth: '80%', borderLeftColor: '#FE6301' }}
		/>
	),
	info: (props) => (
		<InfoToast
			{...props}
			text1NumberOfLines={0}
			text2NumberOfLines={0}
			style={{ maxWidth: '80%', borderLeftColor: '#FE6301' }}
		/>
	),
};
