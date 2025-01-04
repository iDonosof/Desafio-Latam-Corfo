import { Client, Credential } from "../models";

export default interface CredentialWithClient extends Credential {
    client: Client;
}