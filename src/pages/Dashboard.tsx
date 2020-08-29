import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLoading } from '@ionic/react';
import { useSelector } from 'react-redux';
import {logoutUser} from '../firebaseConf';
import { useHistory } from 'react-router';


const Dashboard: React.FC = () => {
  const history = useHistory();
  const [busy, setBusy] = useState<boolean>(false);

  const username = useSelector((state: any) => state.user.username);

  async function logout(){
    setBusy(true);
    await logoutUser();
    setBusy(false);
    history.replace('./login');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonLoading message="Logging out..." duration={0} isOpen={busy}/>
        <p>Hello {username}</p>

        <IonButton onClick={logout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
