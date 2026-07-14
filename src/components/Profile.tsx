import EditProfile from './EditProfile'
import { useAppSelector } from "../utils/hooks";


const Profile = () => {
  const user = useAppSelector((store) => store.user)
  return (
    user && (
    <div className=''>
      <EditProfile user= {user}  />
    </div>)
  )
}

export default Profile