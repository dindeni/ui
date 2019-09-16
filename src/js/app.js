const req = require.context('../blocks', true, /\.(scss|js)$/);
req.keys().forEach(req);
