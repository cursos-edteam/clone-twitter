import { useEffect, useState } from "react";
import { Header, Image, Divider } from 'semantic-ui-react';
import useAuth from "../../hooks/useAuth";
import Avatar from "./Avatar";
import Histories from "./Histories";

const Navbar = () => {
    const { auth } = useAuth();
    const [open, setOpen] = useState(false);
    const [sFile, setSFile] = useState(null);
    useEffect(() => {
        console.log(auth);
    }, [])

    // https://randomuser.me/api/portraits/thumb/women/99.jpg
    const getAvatar = (sFile) => setSFile(sFile);
    return(
        <>
            <Header as='h3' className="d-flex flex-column flex-align-start flex-justify-center mt-5 mb-5">
                <Image
                    onClick={() => setOpen(!open)}
                    circular
                    src={
                        sFile ? `data:image/jpeg; base64,${sFile}` :
                        auth.avatar ? `data:image/jpeg; base64,${auth.avatar}` : 
                        'https://randomuser.me/api/portraits/thumb/men/99.jpg'}
                    />
                    { auth.name }
            </Header>
            <Avatar getAvatar={getAvatar} id={auth.id} open={open} setOpen={setOpen}/>
            <Divider className="mt-5 mb-5"/>
            <Histories/>
        </>
    )
};

export default Navbar;