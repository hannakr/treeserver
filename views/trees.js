var treeDB = {
  '1': { address: '256 East 2nd Ave', commonName: 'Maple', latinName: 'Acer' },
  '2': { address: '520 East 1st Ave', commonName: 'Ash', latinName: 'Fraxinus' },
  '3': { address: '189 Keefer St', commonName: 'Cherry', latinName: 'Prunus' }
};

module.exports = function (treeQuery, callback) {
  if (treeDB[treeQuery.id]) {
    callback(null, { contentType: 'application/json', data: JSON.stringify(treeDB[treeQuery.id]) });
  }
  else {
    return callback ('tree not found');
  }

}

//node -pe "require('url').parse('/test?q=1', true)"
