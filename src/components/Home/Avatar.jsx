import { useState, useCallback } from "react"; 
import { Modal, Header, Button, Icon} from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { UPDATE_AVATAR } from "../../gql/user";
import Storage from "../../plugins/Storage";
import { useHistory } from "react-router-dom";

const Avatar = ({ getAvatar, id, open, setOpen }) => {
    const history = useHistory();
    const [updateAvatar] = useMutation(UPDATE_AVATAR);
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState(false);
    const onDrop = useCallback((oFile) => {
        console.log(oFile);
        const reader = new FileReader();
        reader.onload = () => {
            const sFile = reader.result.replace("data:", "").replace(/^.+,/, "");
            setFile(sFile);
        }
        reader.readAsDataURL(oFile[0]);
    }, []);

    const { getRootProps, getInputProps} = useDropzone({
        accept: "image/jpeg",
        noKeyboard: true,
        multiple: false,
        onDrop
    });

    const logout = () => {
        Storage.reset();
        history.push('/login');
    }

    const sendFile = async () => {
        try {
            setStatus(!status);
            await updateAvatar({
                variables: {
                    input: {
                        id,
                        file
                    }
                }
            });
            setStatus(false);
            setOpen(false);
            getAvatar(file);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='mini'
            >
            <Header icon>
                <Icon name='upload' />
                Subir mi foto de perfil
            </Header>
            <Modal.Content className="flex flex-row flex-align-center flex-justify-center">
                <Button secondary onClick={logout}>
                    <Icon name="logout"/> Cerrar sesion
                </Button>
                <Button {...getRootProps()} primary>Seleccionar mi foto de perfil</Button>
                <input {...getInputProps()}/>
            </Modal.Content>
            <Modal.Actions className="flex flex-row flex-align-center flex-justify-center">
                <Button basic color='red' inverted onClick={() => setOpen(false)}>
                    <Icon name='remove' /> Cancelar
                </Button>
                <Button disabled={status} loading={status} color='green' inverted onClick={sendFile}>
                    <Icon name='checkmark' /> Actualizar foto
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default Avatar;