import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import "./firebaseConfig.js";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getApp } from "firebase/app";

export default function Page() {
  const [step, setStep] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [gifIndex, setGifIndex] = useState(0);

  const gifs = [
    "https://media.tenor.com/BrSW_82G4xkAAAAM/pa-ti-bb.gif",
    "https://media.tenor.com/QEBKoB2neogAAAAM/321.gif",
    "https://media.tenor.com/Chg0oODf1cQAAAAj/emojify.gif",
    "https://media.tenor.com/YwAdyDsdvB0AAAAM/orange-cat.gif",
    "https://media.tenor.com/Do2tfm6klgQAAAAM/cat-kitten.gif",
    "https://media.tenor.com/D1oizgORkXQAAAAM/cat-heart.gif",
    "https://media.tenor.com/I_zREsLlX4sAAAAM/huh-cat.gif",
    "https://media.tenor.com/PIY9VhI_apYAAAAM/hello-hi.gif",
    "https://media.tenor.com/sIf1VJDSfSkAAAAM/cat-woof.gif",
    "https://media.tenor.com/fv3JzoFdPBYAAAAM/cat.gif",
    "https://media.tenor.com/xxPgBuwmddQAAAAj/cat.gif",
    "https://media.tenor.com/ciBqGIR2OnAAAAAj/what-mochi.gif",
    "https://media.tenor.com/fCeQVrKw5ikAAAAM/white-cat-why.gif",
    "https://media.tenor.com/M6hQzq3Ay-sAAAAM/cute-cat-cute.gif",
    "https://media.tenor.com/eRGU5l2v-_wAAAAj/cat-meme.gif",
    "https://media.tenor.com/q_EjOyz1BicAAAAM/felipearaujokaraoke-staaaar.gif",
  ];

  const yesButtonSize = noCount * 20 + 15;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    setGifIndex((gifIndex + 1) % gifs.length);
  };

  const handleYesClick = async () => {
    setYesPressed(true);
    await sendResponse({ response: "yes" });
  };

  interface Response {
    response: string;
  }
  const db = getFirestore(getApp());

  const sendResponse = async (response: Response): Promise<void> => {
    try {
      await addDoc(collection(db, "responses"), response);
    } catch (error) {
      console.error("Error sending response:", error);
    }
  };

  const getNoButtonText = () => {
    const phrases = [
      'No',
      'Are you sure?',
      'sure ka?',
      'Talaga ba?',
      'Weh???',
      'sure na ba yan?',
      'eh?',
      'sure na ba talaga?',
      'Wews',
      'Sure ka na?',
      'Sure na sure?',
      'Sure na sure na sure?',
      'Final na ba yan?',
      'ayaw mo talaga?',
      'Last chance',
      'ok... DD:',
    ];
  
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const renderContent = (): JSX.Element => {
    switch (step) {
      case 0:
        return (
          <div className="centered-container background-image">
            <div className="landing-container" style={{ fontFamily: "Andale Mono, Monospace", fontSize: "25px" }}>
              <h1>Welcome to the Valentine's Day Special!</h1>
              <button className='start-button' style={{fontFamily: "Andale Mono, Monospace"}} onClick={() => setStep(1)}> Start </button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="centered-container background-image">
            <div className="question1-container" style={{ fontFamily: "Andale Mono, Monospace", fontSize: "30px" }}>
              <h1>Ready ka na ba?</h1>
              <button className='ready-button' style={{fontFamily: "Andale Mono, Monospace"}} onClick={() => setStep(2)}> Ready na! </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="centered-container background-image">
            <div className="question2-container" style={{ fontFamily: "Andale Mono, Monospace", fontSize: "28px" }}>
              <h1>Alright kung ready ka na click the button</h1>
              <button className='begin-button' style={{fontFamily: "Andale Mono, Monospace"}} onClick={() => setStep(3)}> Begin </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="centered-container background-image">      
            <div className="valentine-container">
              {yesPressed ? (
                <>
                  <img src="https://media1.tenor.com/m/P-BP8euzsd0AAAAC/mochi-mochimons.gif" width="300" height="300" />
                  <div className="text-container" style={{ fontFamily: "Andale Mono, Monospace", fontSize: "40px" }}>
                    Send ko sayo yung details via chat :DD
                  </div>
                </>
              ) : (
                <>
                  <img
                    className="h-[200px]"
                    style={{ width: "400x", height: "240px" }}
                    src={gifs[gifIndex]}
                  />
                    <h1 className="text-container" style={{ fontFamily: "Andale Mono, Monospace", fontSize: "40px" }}> Will you be my Valentine? </h1>
                  <div>
                    <button
                      className={"yes-button"}
                      style={{ fontFamily: "Andale Mono, Monospace", fontSize: yesButtonSize }}
                      onClick={handleYesClick}
                    >
                      Yes
                    </button>
                    <button onClick={handleNoClick} className="no-button">
                      {noCount === 0 ? "No" : getNoButtonText()}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="centered-container background-image">
            <div className="thank-you-container" style={{ fontFamily: "Andale Mono, Monospace", fontSize: "22px" }}>
              <img src="https://media.tenor.com/YnwqgR1lBGYAAAAi/good.gif" />
              <h1>Thank you for responding!</h1>
            </div>
          </div>
        );
      default:
        return <div></div>;
    }
  };

  useEffect(() => {
    if (noCount >= 16) {
      setStep(4);
    }
  }, [noCount]);

return renderContent();
}