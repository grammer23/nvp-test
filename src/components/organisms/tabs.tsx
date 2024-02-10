import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react"
import { Redirect, Route } from "react-router-dom"
import Home from "@/components/pages/home"
import Detail from "@/components/pages/detail"
import Bookmark from "@/components/pages/bookmark"
import { bookmarkOutline, homeOutline } from "ionicons/icons"

/**
 * Represents a tab navigation component.
 */
const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/home" render={() => <Home />} />
        <Route path="/tabs/detail/:id" render={() => <Detail />} exact={true} />
        <Route path="/tabs/bookmark" render={() => <Bookmark />} />
        <Route path="/" render={() => <Redirect to="/tabs/home" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/bookmark">
          <IonIcon icon={bookmarkOutline} />
          <IonLabel>Bookmark</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Tabs
