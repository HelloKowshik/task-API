const notFound = (req, res) => res.status(404).send('Route does Not EXIST');

module.exports = notFound;
