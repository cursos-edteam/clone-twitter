import { gql } from "@apollo/client";

export const GET_POSTS = gql`
   query obtenerPublicaciones {
        getPosts {
            idUser {
                name
                username
                id
                avatar
                email
            }
            id
            post
        }
    }
`;