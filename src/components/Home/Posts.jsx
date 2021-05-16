import { useEffect } from "react";
import { Comment } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../gql/post";

const Posts = ({ auth }) => {
    const { data, loading } = useQuery(GET_POSTS);
    useEffect(() => {
        console.log(data);
        console.log(auth);
    }, [loading]);

    const Render = ({ data }) => {
        if (!data) return null;
        return (
            data.getPosts.map(item => (
                <Comment.Group key={item.id}>
                    <Comment>
                    <Comment.Avatar as='a' src={`data:image/jpeg; base64,${item.idUser.avatar}`} />
                    <Comment.Content>
                        <Comment.Author>{ item.idUser.username }</Comment.Author>
                        <Comment.Text>{ item.post }</Comment.Text>
                        <Comment.Actions>
                        <Comment.Action>Agregar</Comment.Action>
                        { auth.id === item.idUser.id && <Comment.Action>Editar</Comment.Action>}
                        { auth.id === item.idUser.id && <Comment.Action>Eliminar</Comment.Action>}
                        </Comment.Actions>
                    </Comment.Content>
                    </Comment>
                </Comment.Group>
            ))   
        )
    }

    return(
        <Render data={data}/>
    )
};
export default Posts;