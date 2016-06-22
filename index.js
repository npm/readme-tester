const ChangesStream = require('changes-stream');
const Marky = require('marky-markdown');
const Request = require('request');

const db = 'https://skimdb.npmjs.com/registry/';

var changes = new ChangesStream({
  db: db,
  include_docs: true
});

var parseReadme = function (change) {
  Marky(change.doc.readme || "", { pkg: change.doc }).html();
  console.log("parsed: " + change.doc.name + ", " + change.seq);
};

Request.get(db, function(err, req, body) {
  var end_sequence = JSON.parse(body).update_seq;
  changes.on('readable', function () {
    var change = this.read();
    if (change.seq >= end_sequence) {
      process.exit(0);
    }
    parseReadme(change);
  });
});
