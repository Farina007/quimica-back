
import express from 'express'
import sql from './database.js'

//192.168.1.10

const router = express.Router()

router.get('/', async (req, res)=>{
    try{
        const data = await sql`select * from usuario`;
        return res.status(200).json(data)
    }
    catch{
        return res.status(404).json(`error`)
    }
})

router.post('/login', async (req, res)=>{
    try {
        const { email, senha } = req.body;
        if(email != null && email != "" && senha != null && senha != "")
        {
            const data = await sql`select id, nome from Usuario where email = ${email} and senha = ${senha}`;
            if(data.length == 0)
            {   
                return res.status(204).json('usuario ou senha incorreta')
            }

            return res.status(200).json(data)
        }
            return res.status(400).json("bad request")
    } 
    catch (error){
        console.log(error)
        return res.status(500).json('Error on server!')
    }
})

router.get('/teste', async (req, res)=>{
    try{
        const teste = await sql`select q.id, q.enunciado, q.imagem, q.alternativa_a, q.alternativa_b, q.alternativa_c, alternativa_d, 
alternativa_e, correta, nivel_questao from materia as m inner join questao_materia as qm on qm.id_materia = m.id inner join questao as q 
on q.id = qm.id_questao where m.id = 1`
return res.status(200).json(teste)
    } 
    catch(error){
        console.log(error)
        return res.status(500).json('error ao encontrar')
    }
})

router.get("/testzin", async (req, res) => {
    try {
        const select = await sql`select * from teste`
        return res.status(200).json(select)
    } 
    catch (error) {
        return res.status(500).json('error ao encontrar')
    }
})  


export default router
