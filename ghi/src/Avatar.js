import { useGetTokenQuery } from "./app/api";
import { mdiAccountCircle } from '@mdi/js';
import Icon from '@mdi/react';

function UseDisplayAvatar({ size }) {
    const { data: tokenData } = useGetTokenQuery();

    if (tokenData) {
        let avatar = tokenData.avatar;


        if (avatar === undefined) {
            return (
                <figure id='avatar-profile-page' className="image is-64x64">
                    <Icon path={mdiAccountCircle} size={size} />

                </figure>
            );
        } else {
            return (
                <figure className="image is-64x64">
                    <img
                        className="is-rounded"
                        src={avatar}
                        alt="avatar, ya'll"
                    />
                </figure>
            );
        }
    }
}

export default UseDisplayAvatar