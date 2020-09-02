import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonSpinner
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { images , earthOutline, personCircleOutline } from 'ionicons/icons';
import Dashboard from './pages/Dashboard';
import Gallery from './pages/Gallery';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

//morre css
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

/* Theme variables */
import './theme/variables.css';

/*firebase variables */
import { getCurrentUser } from './firebaseConf';
import { useSelector, useDispatch } from 'react-redux';
import { setUserState } from './redux/actions';

const RoutingSystem: React.FC = () => {
  return <IonReactRouter>
      <IonRouterOutlet>
          <Route path="/dashboard" component={Dashboard} exact={true}/>
          <Route path="/login" component={Login} exact={true}/>
          <Route path="/register" component={Register} exact={true}/>
          <Route path="/gallery" component={Gallery} exact={true} />
          <Route path="/profile" component={Profile} />
          <Route path="/" render={() => <Redirect to="/landing" />} exact={true} />
        </IonRouterOutlet>
  </IonReactRouter>
}

const App: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(true);

  const dispatch = useDispatch();

  const firebase = require("firebase");
  // Required for side-effects
  require("firebase/firestore");

  useEffect(() => {
    getCurrentUser().then((user: any) =>{
      if (user){
        //logged in, go to dashboard
        dispatch(setUserState((user.email)));
        window.history.replaceState({}, '','./dashboard');
      } else {
        //not logged in, go to login page
        window.history.replaceState({}, '', './login');
      }
    })
  }, [])

  return (
  <IonApp>
    {busy ? <IonSpinner/> : <RoutingSystem />}
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
            <Route path="/dashboard" component={Dashboard} exact={true}/>
            <Route path="/login" component={Login} exact={true}/>
            <Route path="/register" component={Register} exact={true}/>
            <Route path="/gallery" component={Gallery} exact={true} />
            <Route path="/profile" component={Profile} />
            <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
          </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="dashboard" href="/dashboard">
            <IonIcon icon={earthOutline} />
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton tab="gallery" href="/gallery">
            <IonIcon icon={images} />
            <IonLabel>Gallery</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);
}
export default App;
