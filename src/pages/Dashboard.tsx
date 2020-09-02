import React, { useState } from 'react';
import { IonGrid, IonImg, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLoading, IonCard, IonItem, IonAvatar, IonCardContent, IonRow, IonCol, IonIcon, IonFab } from '@ionic/react';
import { heartHalfOutline , chatboxOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import './Dashboard.scss';

const Dashboard: React.FC = () => {

  const username = useSelector((state: any) => state.user.username);
  const displayName:string = (username + "").split('@')[0];

  //initialize photos
  const { photos } = usePhotoGallery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonCard class="single-post-home">
        <IonGrid >
          <IonRow>
          <IonItem>
              <IonAvatar item-start>
               <IonImg  src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"/>
              </IonAvatar>
              <h2>{displayName}</h2>
            </IonItem>
          </IonRow>
          <IonRow>
            {photos.map((photo, index) => (
                <IonImg class='img-post' src={photo.base64 ?? photo.webviewPath} />
            ))}
          </IonRow>
        </IonGrid>        
        <IonCardContent>
          <p>Zoned Out 💥</p>
        </IonCardContent>
        <IonRow>
          <IonCol>
            <button ion-button icon-start>
              <IonIcon icon={heartHalfOutline}></IonIcon>
              <div>12 Likes</div>
            </button>
          </IonCol>
          <IonCol>
            <button ion-button icon-start>
              <IonIcon icon={chatboxOutline}></IonIcon>
              <div>4 Comments</div>
            </button>
          </IonCol>
        </IonRow>
      </IonCard>

      <IonFab>
        <button ion-fab><IonIcon name="add"></IonIcon></button>
      </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
