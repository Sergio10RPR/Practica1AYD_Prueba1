import {Request,Response } from 'express';
import pool from '../database/database';;

class GamesController {
    
    public async list(req:Request,res:Response){
        //pool.query('DESCRIBE games');
        //res.send('Games');
        //res.json({text: 'listing games'});
        const games = await pool.query('SELECT * FROM estudiante');
        res.json(games);

    }
    public async getOne(req:Request,res:Response): Promise<any>{
        //res.json({text: 'this is game' + req.params.id});
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM estudiante WHERE carnet = ?',[id]);
        if(games.length > 0){
            return res.json(games[0]);
        }
        res.status(404).json({text: "The game doesn't exists" });
        /*console.log(games);
        res.json({text: 'Game Founded'});*/

    }
    public async create(req:Request,res:Response): Promise<void>{
        //console.log(req.body);
        await pool.query('INSERT INTO estudiante set ?',[req.body]);
        res.json({message: 'Game Saved'});
    }
    public async update(req:Request,res:Response){
        const { id } = req.params;
        await pool.query('UPDATE estudiante set ? WHERE carnet = ?',[req.body,id]);
        res.json({text: 'game was update'});
        //res.json({text: 'updating a game' + req.params.id});
    }
    public async delete(req:Request,res:Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM estudiante WHERE carnet = ?',[id]);
        res.json({text: 'The game deleted' + req.params.id});
    }
   
}

const gamesController = new GamesController();
export default gamesController;