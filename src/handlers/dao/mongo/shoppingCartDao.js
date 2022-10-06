import ShoppingCartService from "../../../services/mongo/shoppingCart.service.js";

let instance;

export default class ShoppingCartDao extends ShoppingCartService {
    constructor() {
        super();
    }

    static setInstance() {
        if (!instance) {
            instance = new ShoppingCartDao();
        }
        return instance;
    }
}