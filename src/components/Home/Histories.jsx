import { useEffect, useState } from "react";
import { List, Image, Transition } from "semantic-ui-react";
const Histories = () => {
    const [ready, setReady] = useState(false);
    useEffect (() => {
        setTimeout(() => {
            setReady(!ready);
        }, 500);
    }, []);
    return (
        <List horizontal className="flex flex-row flex-no-wrap overflow-x avatar--height">
        {
          [...Array(10).keys()].map(item => (
            <List.Item key={item} className="item--avatar">
              <Transition visible={ready} animation="scale" duration={500}>
                <Image
                  avatar
                  className="avatar--image"
                  src='https://react.semantic-ui.com/images/avatar/small/tom.jpg'
                />
              </Transition>
            </List.Item>
          ))
        }
      </List>
    )
};

export default Histories;