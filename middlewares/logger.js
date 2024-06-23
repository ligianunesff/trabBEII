const logCacheRequest = (req, res, next) => {
    console.log(`[CACHE] Requisição para ${req.method} ${req.originalUrl}`);
    next();
  };
  
  const logDatabaseRequest = (req, res, next) => {
    console.log(`[DB] Requisição para ${req.method} ${req.originalUrl}`);
    next();
  };
  
  module.exports = {
    logCacheRequest,
    logDatabaseRequest,
  };
  