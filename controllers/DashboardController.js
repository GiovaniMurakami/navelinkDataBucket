const Data = require("../models/Data");
const User = require("../models/User");

module.exports = class DashboardController {
    static async home(req, res) {
        const userId = req.session.userid;
        const user = await User.findOne({
            where: { id: userId },
            include: Data,
            plain: true,
        });
        const data = user.Data.map((r) => r.dataValues);
        res.render("dashboard/home", { data: data });
    }
    static create(req, res) {
        res.render("dashboard/create");
    }
    static async createPost(req, res) {
        const { username, password, link, description } = req.body;
        const userId = req.session.userid;
        /*Encriptação*/

        /*/ Encriptação */
        const data = {
            username,
            password,
            link,
            description,
            UserId: userId,
        };
        try {
            await Data.create(data);
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
            const data = (await Data.findOne({ where: { id: id } })).dataValues;
            res.render("dashboard/visualize", { data: data });
        } catch (e) {
            console.log(e);
        }
    }
    static async editData(req, res) {
        const id = req.body.id;
        const { username, password, link, description } = req.body;
        const newData = {
            username,
            password,
            link,
            description,
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
