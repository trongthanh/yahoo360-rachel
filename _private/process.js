//!/usr/local/bin/node

const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.join(__dirname, './y360-conan-preprocess.html'), 'utf-8');
const rawPosts = text.split('<-------->');
console.log('Found', rawPosts.length, 'posts');
// split comments and article
const posts = rawPosts.map((post, index) => {
	const commentStartIdx = post.indexOf('-----\nCOMMENT'); // first index of
	console.log(`Posts ${index}: Comments block starts at ${commentStartIdx}`);
	let body;
	if (commentStartIdx === -1) {
		// no comments
		body = post.trim();
	} else {
		body = post.substr(0, commentStartIdx).trim();
	}
	const commentSection = post.substr(commentStartIdx);
	const rawComments = commentSection.split('-----\nCOMMENT:');
	const comments = rawComments.filter(item => {
		return item.trim();
	});

	return {
		body,
		comments,
	};
});
// console.log('sample comments:', posts[0].comments);

// collect comments to a data file
const allComments = {};

posts.forEach((post, index) => {
	console.log('Processing', index, post.body.substr(0, 50).replace(/\n/g, '\\n'));
	let body = post.body;
	const dateStr = /date: ?(.*)/.exec(body)[1];
	const title = /title: ?(.*)/.exec(body)[1];
	console.log(`date: ${dateStr} - title: ${title}`);
	const date = new Date(dateStr);
	// fix timezone (time in the backup is UTC)
	date.setHours(date.getHours() + 7);

	// prettier-ignore
	const fileName = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${slugify(title)}`;

	// normalize date string
	body = body.replace(/date: ?(.*)/g, `date: ${toIsoString(date)}`);

	// write body text to _posts/
	fs.writeFile(path.join(__dirname, `../_posts/${fileName}.html`), body, err => {
		if (err) {
			throw err;
		}
		console.log(`The file ../_posts/${fileName}.html has been saved!`);
	});

	// process comments
	// console.log('comments', post.comments);
	const postComments = post.comments.map(comment => {
		const author = /author: ?(.*)/.exec(comment)[1];
		const content = /body:\n([\s\S]*)/.exec(comment)[1];
		let cmtDate = /date: ?(.*)/.exec(comment)[1];
		cmtDate = new Date(cmtDate);
		// fix timezone (time in the backup is UTC)
		cmtDate.setHours(cmtDate.getHours() + 7);
		cmtDate = toIsoString(cmtDate);

		return {
			author,
			content,
			date: cmtDate,
		};
	});

	allComments[`/blog/${fileName}.html`] = postComments;
});

// write comments data file to _data/
fs.writeFile(path.join(__dirname, '../_data/comments.json'), JSON.stringify(allComments, null, '\t'), err => {
	if (err) {
		throw err;
	}
	console.log('The file comments.json has been written!');
});

function slugify(str) {
	let newStr = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	newStr = newStr
		.trim()
		.toLowerCase()
		.replace(/[đĐ]/g, 'd') // Replace đ/Đ with d
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w-]+/g, '') // Remove all non-word chars
		.replace(/--+/g, '-'); // Replace multiple - with single -

	return newStr;
}

function toIsoString(date) {
	const tzo = -date.getTimezoneOffset();
	const dif = tzo >= 0 ? '+' : '-';
	const pad = function(num) {
		var norm = Math.floor(Math.abs(num));
		return (norm < 10 ? '0' : '') + norm;
	};
	return (
		date.getFullYear() +
		'-' +
		pad(date.getMonth() + 1) +
		'-' +
		pad(date.getDate()) +
		'T' +
		pad(date.getHours()) +
		':' +
		pad(date.getMinutes()) +
		':' +
		pad(date.getSeconds()) +
		dif +
		pad(tzo / 60) +
		':' +
		pad(tzo % 60)
	);
}
