
import useAuthContext from "../contexts/AuthContext";

export default function KezdolapUser() {
     const { user } = useAuthContext(); 

    return (
        <div>
            <h1>Kezdőlap user</h1>
            <p>Bejelentkezett felhasználó: { user==null?"Nincs bejelentkezett felhasználó!":user.name }</p>
        </div>
    );
}
