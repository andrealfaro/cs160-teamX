import { Client, Databases, Account, Functions } from "appwrite";

const client = new Client();
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68157c70002d1b09c4e2');

const account = new Account(client);
const functions = new Functions(client);
const databases = new Databases(client);
export { account, databases, functions }; // ✅ Exp
