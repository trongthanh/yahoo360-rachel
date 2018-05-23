//!/usr/local/bin/node

const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.join(__dirname, './y360-rachel-st3-process.html'), 'utf-8');
const rawPosts = text.split('<-------->');

// split comments and article
const posts = rawPosts.map(post => {
	const commentStartIdx = post.indexOf('-----\nCOMMENT');

	const body = post.substr(0, commentStartIdx).trim(); //
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

posts.forEach((post, index) => {
	let md = `${post.body}
<aside>
${post.comments.reduce((str, comment) => {
		if (str) {
			return `${str}</div>\n<div class="comment">${comment}`;
		}
		return `<div class="comment">${comment}`;
	}, '')}
</div>
</aside>
`;
	const dateStr = /date: ?(.*)/.exec(md)[1];
	const title = /title: ?(.*)/.exec(md)[1];
	const date = new Date(dateStr);
	// fix timezone (time in the backup is UTC)
	date.setHours(date.getHours() + 7);

	// prettier-ignore
	const fileName = `../_posts/${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${slugify(title)}.html`;

	// normalize date string
	md = md.replace(/date: ?(.*)/g, `date: ${toIsoString(date)}`);

	fs.writeFile(path.join(__dirname, fileName), md, err => {
		if (err) {
			throw err;
		}
		console.log(`The file ${fileName} has been saved!`);
	});
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
