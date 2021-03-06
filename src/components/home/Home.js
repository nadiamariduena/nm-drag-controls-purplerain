import React from "react";

import Header from "../navigation/Header";
import TropicDragTest from "../3dScenes/Tropic_drag-test";
// import HomePortfolioGallery from "./HomePortfolioGallery";
// import ContactSection from "./HomeContact";
// import FooterTextAnimation from "./HomeFooterText";

//

function Home() {
  return (
    <React.Fragment>
      {/* --------------- */}
      {/* --------------- */}
      {/* --------------- */}
      {/* <Header /> */}
      {/* --------------- */}
      {/* --------------- */}
      {/* --------------- */}
      <section className="container-section-scene-home">
        {/* ----------------------------------------- */}
        {/*             FLAG SECTION                  */}
        {/* ----------------------------------------- */}
        <div className="scene-threejs">
          <div className="wrapper-flag-scene-threejs">
            {/* ----------------------------------------- */}

            <div className="wrapper-scene-oblivion">
              <TropicDragTest />
            </div>
            {/* ----------------------------------------- */}

            {/* <div className="scene-description-home">
              <div className="wrapper-scene-description-home">
                <h3 className="h3-text-img-home">3D TESTS</h3>
                <p>
                  I created this 3d scenes using threejs during my time at DCI.
                  Additional information about the references used for this
                  project, can be found in my github.
                </p>
              </div>
            </div> */}
            {/* ----------------------------------------- */}
          </div>
        </div>
      </section>
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* <section className="container-gallery">
        <HomePortfolioGallery />
      </section> */}

      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}

      {/* ----------------------------------------- */}
      {/*             CONTACT SECTION               */}
      {/* ----------------------------------------- */}
      {/* <ContactSection /> */}
      {/* --------------- */}
      {/* <FooterTextAnimation /> */}
    </React.Fragment>
  );
}

export default Home;
