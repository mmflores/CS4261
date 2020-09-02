import React, { useState } from 'react';
import { IonRow, IonCol, IonImg, IonLoading, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonAvatar, IonGrid, IonSegment, IonSegmentButton, IonIcon, IonMenuToggle } from '@ionic/react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logoutUser } from '../firebaseConf';
import { optionsOutline, logOut } from 'ionicons/icons';
import './Profile.scss';
import { usePhotoGallery } from '../hooks/usePhotoGallery';


const Profile: React.FC = () => {

  const history = useHistory();
  const [busy, setBusy] = useState<boolean>(false);

  //initialize photos
  const { photos } = usePhotoGallery();

  async function logout() {
    setBusy(true);
    await logoutUser();
    setBusy(false);
    history.replace('./login');
  }
  const username = useSelector((state: any) => state.user.username);
  const displayName:string = (username + "").split('@')[0];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonTitle>{displayName}</IonTitle>
              </IonCol>
              <IonCol>
                <IonButton class="options-button" onClick={logout}>
                  <IonIcon icon={optionsOutline}></IonIcon>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid class="profile-intro">
          <IonRow>
            <IonCol col-8>
              <IonAvatar>
                <IonImg  src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"/>
              </IonAvatar>
            </IonCol>
            <IonCol col-8>
              <div>
                <p># Posts</p>
              </div>
            </IonCol>
            <IonCol col-8>
              <div>
                <p># Followers</p>
              </div>
            </IonCol>
            <IonCol col-8>
              <div>
                <p># Following</p>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonButton class="follow-button">Follow</IonButton>
          </IonRow>
        </IonGrid>

        <div>
          <p ><strong>{displayName}</strong></p>
          <p>Bio Here</p>
        </div>

        <IonGrid class="image-grid">
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.base64 ?? photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage >
  );
};

export default Profile;
