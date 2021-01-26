// métodos que podemos ter dentro de um controller:
// -> index , show, update, store, destroy
/*
index: listagem de sessões
store: criar uma sessão
show: quando queremos listar uma única sessão
update: quando queremos alterar alguma sessão
destroy: quando queremos deletar alguma sessão
*/

import User from '../models/User';
import * as Yup from 'yup';
class SessionController{

    async store(req, res){
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        });

        const { email } = req.body;

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Falha na validação.'});
        }

        // verificando se esse usuário já existe
        let user = await User.findOne({ email });

        if(!user){
            user = await User.create({ email });
        }

        return res.json(user);
    }

}

export default new SessionController();