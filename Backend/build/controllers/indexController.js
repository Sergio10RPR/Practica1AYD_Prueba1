"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        //res.send('Hello');
        res.json({ text: 'API is /api/games' });
    }
}
exports.indexController = new IndexController();
