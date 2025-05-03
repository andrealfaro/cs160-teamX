import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68157c70002d1b09c4e2');

export const account = new Account(client);
export const databases = new Databases(client);
