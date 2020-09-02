import React, {useState , useEffect} from 'react';
import {IonLoading, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import {Link, useHistory} from 'react-router-dom';
import { toast } from '../toast';
import {registerUser} from '../firebaseConf';
import { useDispatch } from 'react-redux';
import { setUserState } from '../redux/actions';


const Register: React.FC = () => {

    const [busy, setBusy] = useState<boolean>(false);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')

    const dispatch = useDispatch();
    const history = useHistory();

    async function register(){
        setBusy(true);
        //validation
        if (password !== cPassword){
            return toast('Passwords do not match');
        }

        if(username.trim() === '' || password.trim() === ''){
            return toast('Username and password are required');
        }

        const res = await registerUser(username, password);

        if (res){
          dispatch(setUserState(res));
            history.replace('./dashboard');
            toast('Registration sucessful!');

        }
        setBusy(false);
    }
    
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create an Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading message="Registration in progress" duration={0} isOpen={busy}/>

          <IonInput placeholder="Username" onIonChange= {(e:any) => setUsername(e.target.value)}/>
          <IonInput type="password" placeholder="Password" onIonChange= {(e:any) => setPassword(e.target.value)}/>
          <IonInput type = "password" placeholder="Confirm Password" onIonChange= {(e:any) => setCPassword(e.target.value)}/>
          
          <IonButton onClick={register}>Register</IonButton> 
          <p>Already have an account? <Link to="/login">Login</Link></p>

      </IonContent>
    </IonPage>
  );
};

export default Register;
