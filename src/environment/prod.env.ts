import { Environment } from "./env";

export const ProdEnvironment:Environment = {
    db_url: 'mongodb+srv://admin:admin1@cluster101.nsbgg.mongodb.net/?retryWrites=true&w=majority',
    jwt_secret: 'prodSecret'
}