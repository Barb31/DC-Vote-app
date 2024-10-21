import React from "react";
import Header from "./components/Header";
import VoterRegistration from "./components/VoterRegistration";
import Voting from "./components/Voting";
import Results from "./components/Results";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <div className="main-content">
        <VoterRegistration />
        <Voting />
        <Results />
      </div>
      <Footer />
    </div>
  );
};

export default App;
