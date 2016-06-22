# readme-tester
> parse all READMEs in the npm registry with MarkyMarkdown

This application uses [`changes-stream`] to read in all `README`s from the 
npm Registry and then parses them using [`marky-markdown`].

We use this application to test [`marky-markdown`] for regressions before
deploying to the [npm website].

[`changes-stream`]: https://www.npmjs.com/package/changes-stream
[`marky-markdown`]: https://www.npmjs.com/package/marky-markdown
[npm website]: https://www.npmjs.com/

## up and running

1. fork and clone this repository
2. `cd readme-tester`
3. `npm install`
4. `node index.js`
