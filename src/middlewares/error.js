export default class Error {

    static PageNotFound(req, res) {
        res.status(404).json({
            error: -2,
            description: `Page ${ req.url } was not found on this server`
        });
    }
}