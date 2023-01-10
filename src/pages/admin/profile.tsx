import type { NextPage } from 'next'
import LoggedInHeader from '../../components/loggedInHeader'
import { requireAuth } from '../../utils/requireAuth';

export const getServerSideProps = requireAuth(async (_) => {
    return { props: {} };
}, '/admin/links');

const Profile: NextPage = () => {
    return (
        <div>
            <LoggedInHeader />
            profile
        </div>
    )
}

export default Profile