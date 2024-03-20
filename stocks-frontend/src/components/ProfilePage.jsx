import { useDispatch, useSelector } from "react-redux"
import { setter } from "../tokenSlice";


function ProfilePage() {
    const token = useSelector((state) => state.token.value)
    const dispatch = useDispatch();

}

export default ProfilePage