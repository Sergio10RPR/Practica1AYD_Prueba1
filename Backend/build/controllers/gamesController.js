"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
;
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //pool.query('DESCRIBE games');
            //res.send('Games');
            //res.json({text: 'listing games'});
            const games = yield database_1.default.query('SELECT * FROM estudiante');
            res.json(games);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({text: 'this is game' + req.params.id});
            const { id } = req.params;
            const games = yield database_1.default.query('SELECT * FROM estudiante WHERE carnet = ?', [id]);
            if (games.length > 0) {
                return res.json(games[0]);
            }
            res.status(404).json({ text: "The game doesn't exists" });
            /*console.log(games);
            res.json({text: 'Game Founded'});*/
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body);
            yield database_1.default.query('INSERT INTO estudiante set ?', [req.body]);
            res.json({ message: 'Game Saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE estudiante set ? WHERE carnet = ?', [req.body, id]);
            res.json({ text: 'game was update' });
            //res.json({text: 'updating a game' + req.params.id});
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM estudiante WHERE carnet = ?', [id]);
            res.json({ text: 'The game deleted' + req.params.id });
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
