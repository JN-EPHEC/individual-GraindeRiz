import express from 'express';
import type { Request, Response} from 'express';

const router = express.Router();

router.get('/:name',(req: Request, res: Response) =>{
    let name = req.params.name;
    res.json({
        message: `Bonjour ${name}`,
        timestamp: new Date().toISOString()
    });

});

export default router;