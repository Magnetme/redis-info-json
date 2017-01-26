'use strict';

process.stdin.setEncoding('utf8');

// This saves the redis data to a variable
var data = "";
var EMPTY_LINE = '';

function isNumeric(num){
	return !isNaN(num)
}

function isTrue(value) {
	return value && (value === true || value === 'true');
}

function startProcessing(data) {
	const lines = data.split(/\r?\n|\r/).filter((line) => line !== EMPTY_LINE);

	const res = {};
	let currentLevel;
	lines.forEach((line) => {
		if (line.startsWith('#')) {
			currentLevel = line.substring(1).trim().toLowerCase();
			res[currentLevel] = {};
			return;
		}
		const splitted = line.split(':');
		const key = splitted[0];
		const value = isNumeric(splitted[1]) ? parseFloat(splitted[1]) : splitted[1];

		if(currentLevel) {
			res[currentLevel][key] = value;
		} else {
			res[key] = value;
		}
	});
	writeOutputAsJson(res);
}

function writeOutputAsJson(data) {
	console.log(JSON.stringify(data, null, isTrue(process.env.PRETTY_PRINT) ? 4 : 0));
}

process.stdin.on('readable', () => {
	const chunk = process.stdin.read();
	if (chunk !== null) {
		data += chunk
	}
});

process.stdin.on('end', () => {
	startProcessing(data);
});
