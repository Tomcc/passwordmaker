import "./styles/main.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as QRCode from "qrcode.react";
import { UIDomainInput } from "./domain_component";
import { UIFileComponent } from "./file_component";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import { UIPassPhraseInput } from "./passphrase_input";

function isCorrectCharset(
    password: string,
    includeLowercase: boolean,
    includeNumbers: boolean,
    includeSymbols: boolean,
    includeUppercase: boolean) {

    let hasNumber = false;
    let hasSymbol = false;
    let hasUppercase = false;
    let hasLowercase = false;

    for (let i = password.length - 1; i >= 0; i--) {
        const c = password[i];

        if (c >= "a" && c <= "z") {
            hasLowercase = true;
        }
        else if (c >= "A" && c <= "Z") {
            hasUppercase = true;
        }
        else if (c >= "0" && c <= "9") {
            hasNumber = true;
        }
        else {
            hasSymbol = true;
        }
    }

    return (
        hasLowercase === includeLowercase &&
        hasNumber === includeNumbers &&
        hasSymbol === includeSymbols &&
        hasUppercase === includeUppercase
    );
}

class UIRootState {
    public canGenerate: boolean = false;
    public generating: boolean = false;
    public password: string | undefined;
}

class UIRoot extends React.Component {
    public state = new UIRootState();

    private file: File | undefined;
    private domain: string | undefined;
    private phrase: string | undefined;
    private requireSymbols: boolean = true;

    private passwordLengthRef = React.createRef<HTMLInputElement>();

    public onFilePicked = (name: File | undefined) => {
        this.file = name;
        this.updateInputs();
    }

    public onDomainPicked = (domain: string) => {
        this.domain = domain;
        this.updateInputs();
    }

    public onPassPhraseSelected = (phrase: string | undefined) => {
        this.phrase = phrase;
        this.updateInputs();
    }

    public getPasswordLength(): number | undefined {
        if (!this.passwordLengthRef.current) {
            return;
        }

        let len = this.passwordLengthRef.current.valueAsNumber || undefined;
        if (len && len < 10) {
            len = undefined;
        }
        return len;
    }

    public onSymbolsAllowedUpdated = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.requireSymbols = e.target.checked;
        this.updateInputs();
    }

    public onKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && this.state.canGenerate) {
            this.startGeneration();
        }
    }

    public render() {
        return (
            <div className="container" onKeyPress={this.onKeyPress}>
                <h1>Make password, yes?</h1>
                <hr />
                <UIDomainInput onDomainPicked={this.onDomainPicked} />
                <UIFileComponent onFilePicked={this.onFilePicked} />
                <UIPassPhraseInput onPassPhraseSelected={this.onPassPhraseSelected} />
                <p className="formsection">
                    Set the password length: <input
                        type="number"
                        defaultValue="20"
                        ref={this.passwordLengthRef}
                    />
                </p>
                <p className="formsection">
                    Allow symbols (/+): <Toggle
                        defaultChecked={true}
                        icons={false}
                        onChange={this.onSymbolsAllowedUpdated}
                    />
                </p>
                {this.renderOutDiv()}
            </div>);
    }

    private renderCopyButton(): JSX.Element | undefined {
        if (this.state.password) {
            return (
                <button
                    className="btn"
                    data-clipboard-target="#password_field"
                    title="Click to copy me.">
                    📋
            </button>);
        }
        return;
    }

    private renderOutDiv(): JSX.Element | undefined {
        if (this.state.canGenerate) {
            return (<>
                <div className="outdiv" id="result">
                    <p>
                        <span
                            onClick={this.startGeneration}>
                            {this.renderPasswordField()}
                        </span>
                        {this.renderCopyButton()}
                    </p>
                    {this.renderQRCode()}
                </div>
            </>);
        }
        return undefined;
    }

    private renderPasswordField(): string {
        if (this.state.generating) {
            return "Generating...";
        }
        if (this.state.password) {
            return this.state.password;
        }
        if (this.state.canGenerate) {
            return "Generate!";
        }
        return "";
    }

    private renderQRCode(): JSX.Element | undefined {
        if (this.state.password) {
            return <QRCode value={this.state.password} />;
        }
        return undefined;
    }

    private startGeneration = () => {
        if (!this.file || !this.domain) {
            return;
        }

        this.setState({ generating: true });

        const reader = new FileReader();

        reader.onload = () => {
            // hack?
            const crypto = window.crypto.subtle;

            let buffer = reader.result as string;

            // append the domain
            buffer += this.domain;
            // append the phrase if any
            if (this.phrase) {
                buffer += this.phrase;
            }

            // this function calls itself until the password fits the requirements
            const generateIteration = () => {
                const raw = new TextEncoder().encode(buffer);

                crypto.digest("SHA-512", raw).then((value: ArrayBuffer) => {
                    const base64String = btoa(String.fromCharCode(...new Uint8Array(value)))
                        .substring(0, this.getPasswordLength());

                    // check if we good. If not, run append the current password 
                    // to the end of the blob, and restart
                    if (isCorrectCharset(base64String, true, true, this.requireSymbols, true)) {
                        this.setState({
                            generating: false,
                            password: base64String,
                        });
                    }
                    else {
                        buffer += base64String;
                        generateIteration();
                    }
                });
            };

            // start the iterations
            generateIteration();
        };

        reader.readAsBinaryString(this.file);
    }

    private updateInputs() {
        this.setState({
            canGenerate: this.file && this.domain && this.getPasswordLength(),
        });
    }
}

ReactDOM.render(
    <UIRoot />,
    document.body.appendChild(document.createElement("div")),
);
