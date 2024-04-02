const Data = require("../models/Data");
const User = require("../models/User");
const { encrypt, decrypt } = require("../helpers/cryto");

module.exports = class DashboardController {
    static async home(req, res) {
        const userId = req.session.userid;
        const user = await User.findOne({
            where: { id: userId },
            include: Data,
            plain: true,
        });

        const data = user.Data.map((r) => r.dataValues);
        data.map(function (r) {
            r.username = decrypt(JSON.parse(r.username));
            r.password = decrypt(JSON.parse(r.password));
            r.link = decrypt(JSON.parse(r.link));
            r.description = decrypt(JSON.parse(r.description));
        });

        res.render("dashboard/home", { data: data });
    }
    static create(req, res) {
        res.render("dashboard/create");
    }
    static async createPost(req, res) {
        const { username, password, link, description } = req.body;
        const userId = req.session.userid;

        const encryptedData = {
            username: JSON.stringify(encrypt(username)),
            password: JSON.stringify(encrypt(password)),
            link: JSON.stringify(encrypt(link)),
            description: JSON.stringify(encrypt(description)),
            UserId: userId,
        };

        try {
            await Data.create(encryptedData);
            req.flash("message", "Dado armazenado com sucesso!");
            DashboardController.home(req, res);
        } catch (e) {
            console.log(e);
        }
    }

    static async removeData(req, res) {
        const id = req.body.id;
        try {
            await Data.destroy({ where: { id: id } });
            req.flash("message", "Dado excluído com sucesso");
            DashboardController.home(req, res);
        } catch (e) {
            console.log(e);
        }
    }

    static async visualize(req, res) {
        const id = req.params.id;
        try {
            const data = await Data.findOne({ where: { id: id } });
            if (!data) {
                req.flash("message", "Dado não encontrado");
                DashboardController.home(req, res);
                return;
            }

            console.log(data.dataValues);

            const decryptedData = {
                id: data.id,
                username: decrypt(JSON.parse(data.username)),
                password: decrypt(JSON.parse(data.password)),
                link: decrypt(JSON.parse(data.link)),
                description: decrypt(JSON.parse(data.description)),
                createdAt: data.createdAt,
                updateAt: data.updateAt,
                UserId: data.UserId,
            };

            if (decryptedData.UserId != req.session.userid) {
                req.flash("message", "Erro, escolha um dado que te pertence");
                DashboardController.home(req, res);
                return;
            }

            res.render("dashboard/visualize", { data: decryptedData });
        } catch (e) {
            console.log(e);
        }
    }

    static async editData(req, res) {
        const id = req.body.id;
        const { username, password, link, description } = req.body;
        const newData = {
            username: JSON.stringify(encrypt(username)),
            password: JSON.stringify(encrypt(password)),
            link: JSON.stringify(encrypt(link)),
            description: JSON.stringify(encrypt(description)),
        };
        try {
            await Data.update(newData, { where: { id: id } });
            req.flash("message", "Dado alterado com sucesso");
            DashboardController.home(req, res);
        } catch (e) {
            console.log(e);
        }
    }
};
