import "./styles/main.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { UIDomainInput } from "./domain_component";
import { UIFileComponent } from "./file_component";
import "react-toggle/style.css";
import Toggle from "react-toggle";

function HACK_UPDATERESULT() {
    alert("LOL");
}

class UIRootState {
    public canGenerate: boolean = false;
}

class UIRoot extends React.Component {
    public state = new UIRootState();

    private filename: string | undefined;
    private domain: string | undefined;

    public onFilePicked = (name: string) => {
        this.filename = name;
        this.updateState();
    }

    public onDomainPicked = (domain: string) => {
        this.domain = domain;
        this.updateState();
    }

    public onSymbolsAllowedUpdated = () => {

    }

    public render() {
        return (
            <div className="container">
                <h1>Make password, yes?</h1>
                <hr />
                <UIDomainInput onDomainPicked={this.onDomainPicked} />
                <UIFileComponent onFilePicked={this.onFilePicked} />
                <p className="formsection">
                    Passphrase
                <input
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        type="password"
                        id="passphrase"
                    />
                    <span className="style_hint">(optional) protect your key file</span>
                </p>
                <p className="formsection">
                    Set the password length: <input type="number" id="length" value="20" />
                </p>
                <p className="formsection">
                    Allow symbols (/+): <Toggle
                        defaultChecked={true}
                        icons={false}
                        onChange={this.onSymbolsAllowedUpdated}
                    />
                </p>
                <div className="outdiv" id="result">
                    <span id="password_field" onClick={HACK_UPDATERESULT}>Click to generate, or press Enter</span>
                    <button
                        className="btn"
                        id="copy-button"
                        data-clipboard-target="#password_field"
                        title="Click to copy me.">📋</button>
                </div>
                <div className="outdiv" id="qrcode"></div>
            </div>);
    }

    private updateState() {
        this.setState({
            canGenerate: this.filename && this.domain,
        });
    }
}

ReactDOM.render(
    <UIRoot />,
    document.body.appendChild(document.createElement("div")),
);
