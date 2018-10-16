import "./styles/main.css";
import * as React from "react";
import * as ReactDOM from "react-dom";

function HACK_UPDATERESULT() {

}

function HACK_CLICKBUTTON() {
    // "document.getElementById('keyfile').click();"
}

class UIRoot extends React.Component {
    public render() {
        return (
            <div className="container">
                <h1>Make password, yes?</h1>
                <hr />
                <p className="formsection">
                    <span id="input_desc">Enter the URL of your site:</span>
                    <input autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} type="url" id="input" />
                    <span id="actualurl" className="style_hint"></span>
                </p>
                <p className="formsection">
                    <span id="keyfile_desc">Choose your key file:</span>
                    <input type="file" id="keyfile" />
                    <button onClick={HACK_CLICKBUTTON} className="fake_button">
                        <b><span id="fake_filename">No file selected </span></b>
                    </button>
                    <div className="style_warning">WARNING: you will lose your passwords losing this file, or changing it in any way!</div>
                </p>
                <p className="formsection">
                    Passphrase
                <input autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} type="password" id="passphrase" />
                    <span className="style_hint">(optional) protect your key file</span>
                </p>
                <p className="formsection">
                    Set the password length: <input type="number" id="length" value="20" />
                </p>
                <p className="formsection">
                    Allow symbols (/+): <input type="checkbox" id="includeSymbols" checked />
                </p>
                <div className="outdiv" id="result">
                    <span id="password_field" onClick={HACK_UPDATERESULT}>Click to generate, or press Enter</span>
                    <button className="btn" id="copy-button" data-clipboard-target="#password_field" title="Click to copy me.">Copy!</button>
                </div>
                <div className="outdiv" id="qrcode"></div>
            </div>);
    }
}

ReactDOM.render(
    <UIRoot />,
    document.body.appendChild(document.createElement("div")),
);