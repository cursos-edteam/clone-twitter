import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Grid, Image, Form, Button, Modal, Message, Container } from "semantic-ui-react";
import BgLogin from '../../assets/img/bgLogin.jpg';
import useForm from "././../../hooks/useForm";
import { NEW_USER, AUTHENTICATION } from "../../gql/user";
import Storage from '../../plugins/Storage';
import useAuth from "../../hooks/useAuth";
import "./Login.scss";
const Login = () => {
    const history = useHistory();
    const { setUser } = useAuth();
    const [addUser] = useMutation(NEW_USER);
    const [logeandome] = useMutation(AUTHENTICATION);
    const [open, setOpen ] = useState(false);
    const [message, setMessage ] = useState({
        status: null,
        header: null,
        message: null 
    });
    const [formLogin] = useForm({
        email: '',
        password: ''
    });
    const [formLoginRegister] = useForm({
        name: '',
        username: '',
        email: '',
        password: ''
    });

    const closeModal = () => setOpen(!open);

    const ShowMessage = () => {
        return message.status === 'SUCCESS' ? (
        <Container textAlign="center">
          <Message
            compact
            success
            header={ message.header }
            content={ message.message}
          />
        </Container>) : message.status === 'ERROR' ? (
        <Container textAlign="center">
          <Message
            compact
            error
            header={ message.header }
            content={ message.message }
          />
        </Container>) : null
    }

    const handleClickLogin = async (e) => {
        e.preventDefault();
        if(formLogin.handleErrors) {
            setMessage({
                status: 'ERROR',
                header: 'Faltan campos por llenar',
                message: 'El campo email o contraseña se encuentra vacios' 
            });
        } else {
            try {
                const response = await logeandome({
                    variables: {
                        input: formLogin.values
                    }
                });

                const { data: { authentication: { token } } } = response;

                Storage.set('token', token);
                setUser(token);
                history.push('/home');

                setMessage({
                    status: 'SUCCESS',
                    header: 'Datos llenados exitosamente',
                    message: 'Espere unos segundos por favor...' 
                });

            } catch (error) {
                setMessage({
                    status: 'ERROR',
                    header: 'Ocurrio un error',
                    message: error.message 
                });
            }
        }
    }


    const handleClickRegister = async (e) => {
        e.preventDefault();
        if(formLoginRegister.handleErrors) {
            setMessage({
                status: 'ERROR',
                header: 'Faltan campos por llenar',
                message: 'El campo email o contraseña se encuentra vacios' 
            });
        } else {
            try {
                const response = await addUser({
                    variables: {
                        input: formLoginRegister.values
                    }
                });
                closeModal();
                formLoginRegister.handleReset();
                setMessage({
                    status: 'SUCCESS',
                    header: 'Datos llenados exitosamente',
                    message: 'Espere unos segundos por favor...' 
                });
                console.log("todo bien");
            } catch (error) {
                setMessage({
                    status: 'ERROR',
                    header: 'Ocurrio un error',
                    message: error.message 
                });
            }
        }
    }

    return (
        <>
        <Grid columns={2} className="login">
            <Grid.Row>
                <Grid.Column>
                    <Image src={BgLogin} className="img"></Image>
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                    <ShowMessage/>
                    <Form onSubmit={handleClickLogin}>
                        <Form.Field required>
                            <Form.Input
                                label="Email"
                                className=""
                                name="email"
                                placeholder="Email"
                                onBlur={formLogin.handleTouched}
                                onChange={formLogin.handleChange}
                                value={formLogin.values.email}
                                error={
                                    formLogin.touched.email && 
                                    formLogin.errors.email ? 
                                    { content: 'Tu correo esta mal escrito', pointing: 'below'}
                                    : null
                                }
                            ></Form.Input>
                        </Form.Field>
                        <Form.Field required>
                            <Form.Input
                                label="Contraseña"
                                name="password"
                                placeholder="Contraseña"
                                type="password"
                                onBlur={formLogin.handleTouched}
                                onChange={formLogin.handleChange}
                                value={formLogin.values.password}
                                error={
                                    formLogin.touched.password && 
                                    formLogin.errors.password ? 
                                    { content: 'La contraseña es requerida', pointing: 'below'} 
                                    : null }
                            ></Form.Input>
                        </Form.Field>
                        <Button primary floated="left">Ingresar</Button>
                        <Button secondary floated="right" onClick={() => closeModal()}>Registrarme</Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        {/* Creando el Modal para registro */}
      <Modal
        closeOnEscape={true}
        closeOnDimmerClick={true}
        open={open}
        size="mini"
        >
        <Modal.Header>Registrar un nuevo usuario</Modal.Header>
            <Modal.Content>
                <ShowMessage/>
                <Form onSubmit={handleClickRegister}>
                    <Form.Field required>
                        <Form.Input
                            label="Nombres"
                            placeholder="Nombres"
                            name="name"
                            fluid
                            onBlur={formLoginRegister.handleTouched}
                            onChange={formLoginRegister.handleChange}
                            value={formLoginRegister.values.name}
                            error={
                                formLoginRegister.touched.name &&
                                formLoginRegister.errors.name ? 
                                { content: 'Tu nombre no es valido', pointing: 'below'}
                                : null
                            }
                            ></Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <Form.Input
                        label="Username"
                        placeholder="Nombre de usuario"
                        name="username"
                        fluid
                        onBlur={formLoginRegister.handleTouched}
                        onChange={formLoginRegister.handleChange}
                        value={formLoginRegister.values.username}
                        error={
                            formLoginRegister.touched.username &&
                            formLoginRegister.errors.username ? 
                            { content: 'Tu nombre de usuario no es valido', pointing: 'below'}
                            : null
                        }
                        ></Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <Form.Input
                        label="Email"
                        placeholder="Email"
                        name="email"
                        fluid
                        onBlur={formLoginRegister.handleTouched}
                        onChange={formLoginRegister.handleChange}
                        value={formLoginRegister.values.email}
                        error={
                            formLoginRegister.touched.email &&
                            formLoginRegister.errors.email ? 
                            { content: 'Tu email no es valido', pointing: 'below'}
                            : null
                        }
                        ></Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <Form.Input
                        label="Contrasena"
                        placeholder="Contrasena"
                        name="password"
                        type="password"
                        fluid
                        onBlur={formLoginRegister.handleTouched}
                        onChange={formLoginRegister.handleChange}
                        value={formLoginRegister.values.password}
                        error={
                            formLoginRegister.touched.password &&
                            formLoginRegister.errors.password ? 
                            { content: 'Tu cotraseña no es valido', pointing: 'below'}
                            : null
                        }
                        ></Form.Input>
                    </Form.Field>
                    <Modal.Actions>
                        <Button secondary onClick={() => closeModal()}>Cancelar</Button>
                        <Button primary type="submit">Registrar usuario</Button>
                    </Modal.Actions>
                </Form>
            </Modal.Content>
        </Modal>
        </>
    )
}

export default Login;