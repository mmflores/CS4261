import React, { useState } from 'react';
import { IonLoading, IonButton, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonMenuButton } from '@ionic/react';
import { logoutUser } from '../firebaseConf';
import { useHistory, withRouter } from 'react-router';



const Menu: React.FC = () => {
    const history = useHistory();
    const [busy, setBusy] = useState<boolean>(false);

    async function logout() {
        setBusy(true);
        await logoutUser();
        setBusy(false);
        history.replace('./login');
    }


    return (

        <>
            <IonMenu side="start" menuId="first" content-id="main">
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>User Settings</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem>
                            <IonLoading message="Logging out..." duration={0} isOpen={busy} />
                            <IonButton onClick={logout}>Logout</IonButton>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonMenu>
            <IonRouterOutlet></IonRouterOutlet>
        </>
    );
}

export default withRouter(Menu);