import React, { Fragment } from "react";
import MegaMenuFooter from "./Components/FooterMegaMenu";
import FooterDots from "./Components/FooterDots";
import { connect } from "react-redux";

class AppFooter extends React.Component {
  render() {
    const {colorScheme} =this.props;
    return (
      <Fragment>
        <div className="app-footer"  >
          <div className={`app-footer__inner dhl-bg-${colorScheme}`} >
            <div className="app-footer-left">
              <FooterDots />
            </div>
            <div className="app-footer-right">
              <MegaMenuFooter />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  colorScheme: state.ThemeOptions.colorScheme
});

const mapDispatchToProps = (dispatch) => ({
});
// export default AppFooter;
export default connect(mapStateToProps, mapDispatchToProps)(AppFooter);

