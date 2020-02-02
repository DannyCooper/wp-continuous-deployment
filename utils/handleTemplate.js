const fs = require("fs");
const path = require("path");
const makeDir = require("make-dir");
const handlebars = require("handlebars");
handlebars.registerHelper("raw-helper", options => options.fn());

module.exports = async slug => {
	const files = [`assets`, `release`];
	for (file of files) {
		const fileContents = fs.readFileSync(
			path.join(__dirname, `./../template/${file}.yml`),
			`utf8`
		);
		const source = fileContents.toString();
		const template = handlebars.compile(source);
		const rendered = template({ slug: slug.slug });
		await makeDir(`./.github/workflow/`);
		await makeDir(`./.wordpress-org/`);
		const done = fs.writeFileSync(
			`./.github/workflow/${file}.yml`,
			rendered,
			`utf8`
		);
	}
};