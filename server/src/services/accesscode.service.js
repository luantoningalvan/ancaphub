const AccessCode = require('../models/AccessCodeModel');

const generateCode = async (numCodes) => {
    
    let codes = []

    for (let i = 0; i < numCodes;i++){
        let code = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let j = 0; j < 20; j++ ) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        const accessCode = await AccessCode.create({ code });
        codes = [...codes, accessCode]
    }

    return codes
}

const getCodes = async (filter) =>{
    const codes = await AccessCode.find(filter ? { used: filter } : {})
    return codes
}

const verifyCode = async (code) => {    
    const accessCode = await AccessCode.findOne({ code })

    if (!accessCode) throw new Error('Este código de acesso não existe.')

    if (accessCode.used) throw new Error('Este código de acesso já foi utilizado.')

    return;
}

const updateUserCode = async (code, userId) => {    
    const useCode = await AccessCode.findOneAndUpdate({ code }, { used: true, user: userId }, { new: true })

    return useCode
}

module.exports = { generateCode, getCodes, verifyCode, updateUserCode }