const req = require.context('../', true, /\.(scss|js)$/);
req.keys().forEach(req);
