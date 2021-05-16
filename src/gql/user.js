import { gql } from "@apollo/client";

export const NEW_USER = gql`
    mutation addUser($input: UserInput) {
        newUser(input: $input) {
            password
            username
        }
    }
`;

export const AUTHENTICATION = gql`
   mutation logeandome ($input: LoginInput){
        authentication (input: $input) {
            token
        }
    }
`;

export const UPDATE_AVATAR = gql`
   mutation updateAvatar ($input: AvatarInput) {
        updateAvatar (input: $input) {
            id
        }
    }
`;