const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 30 }); // Tempo de cache de 30 segundos

module.exports = cache;
