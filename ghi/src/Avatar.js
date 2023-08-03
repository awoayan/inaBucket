import { useGetTokenQuery } from "./app/api";
import { mdiAccountCircle } from '@mdi/js';
import Icon from '@mdi/react';

function UseDisplayAvatar({ size }) {
    const { data: tokenData } = useGetTokenQuery();

    if (tokenData) {
        let avatar = tokenData.avatar;


        if (avatar === undefined) {
            return (
                <figure id='avatar-profile-page' className="image is-64x64 mt-4 ml-5">
                    <Icon path={mdiAccountCircle} title="Profile" size={2} color="hsl(207, 61%, 51%)" />

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