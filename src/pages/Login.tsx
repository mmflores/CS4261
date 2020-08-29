import React, {useState , useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonLoading } from '@ionic/react';
import {Link, useHistory} from 'react-router-dom';
import {loginUser} from '../firebaseConf';
import { toast } from '../toast';
import { setUserState } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { totalmem } from 'os';

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [busy, setBusy] = useState<boolean>(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function login(){
        setBusy(true);
        const res: any = await loginUser(username, password);

        if (res){
            dispatch(setUserState(res));
            history.replace('./dashboard');
            toast('Login sucessful!');
        }else {
          toast('Login Failed');
        }
        setBusy(false);
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={busy}/>
      <IonContent className="ion-padding">
          <IonInput placeholder="Username" onIonChange= {(e:any) => setUsername(e.target.value)}/>
          <IonInput type="password" placeholder="Password" onIonChange= {(e:any) => setPassword(e.target.value)}/>
          <IonButton onClick={login}>Login</IonButton> 

          <p>New Here? <Link to="/register">Register</Link></p>

      </IonContent>

    </IonPage>
  );
};

export default Login;
