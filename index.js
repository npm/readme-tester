const ChangesStream = require('changes-stream');
const Marky = require('marky-markdown');
const Request = require('request');
const Summarize = require('summary-statistics');

const db = 'https://replicate.npmjs.com';

var parseTimes = [];

var changes = new ChangesStream({
  db: db,
  include_docs: true
});

var printHRTime = function(response) {
  return response/1000000 + "ms";
};

var parseReadme = function (change) {
  const start = process.hrtime();
  var readme = (change.doc.readme || "").toString();
  Marky(readme, { pkg: change.doc }).html();
  const elapsed = process.hrtime(start)[1];
  console.log("parsed: " + change.doc.name + ", " + change.seq +
              " [" + printHRTime(elapsed) + "]");
  return elapsed/1000000;
};

Request.get(db, function(err, req, body) {
  var end_sequence = JSON.parse(body).update_seq;
  changes.on('data', function (change) {
    // stop after we've parsed all the things
    if (change.seq >= end_sequence) {
      console.log(Summarize(parseTimes));
      process.exit(0);
    }
    // do not parse CouchDB design docs
    if (change.doc.name) {
      parseTimes.push(parseReadme(change));
    }
  });
});
