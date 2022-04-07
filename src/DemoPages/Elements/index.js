import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// BUTTONS

// Standard

import ButtonsStandard from "./Button/Standard/";

// Pills

import ButtonsPill from "./Button/Pill/";

// Shadows

import ButtonsShadow from "./Button/Shadow/";

// Square

import ButtonsSquare from "./Button/Square/";

// Icons

import ButtonsIcons from "./Button/Icons/";

// DROPDOWNS

import DropdownExamples from "./Dropdowns/";

// BADGES & LABELS

import BadgesLabels from "./BadgesLabels/";

// ICONS

import IconsExamples from "./Icons/";

// CARDS

import CardsExamples from "./Cards/";

// LOADERS

import LoadersExample from "../Elements/Loaders/";

// LIST GROUP

import ListGroupExample from "../Elements/ListGroup/";

// TIMELINE

import TimelineExample from "../Elements/Timeline/";

// NAVIGATION

import NavigationExample from "./Navs/";

// DRAG & DROP

import ScreenVisibilityExamples from "./ScreenVisibility/";

// UTILITIES

import UtilitiesExamples from "../Elements/Utilities/";

// Layout
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";

// Theme Options

import ThemeOptions from "../../Layout/ThemeOptions/";

const Elements = ({ match }) => (
  <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          {/* Buttons */}
          <Route path={`${match.url}/addnewcompany`} component={ButtonsStandard}/>
          <Route path={`${match.url}/adduser`} component={ButtonsStandard}/>
          <Route path={`${match.url}/refreshuserdata`} component={ButtonsSquare} />
          <Route path={`${match.url}/tablemanagement`} component={ButtonsPill} />

          
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default Elements;
