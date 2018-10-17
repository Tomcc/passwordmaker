import "./styles/main.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as QRCode from "qrcode.react";
import { UIDomainInput } from "./domain_component";
import { UIFileComponent } from "./file_component";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import { UIPassPhraseInput } from "./passphrase_input";

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
    private symbolsAllowed: boolean = true;

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
        this.symbolsAllowed = e.target.checked;
        this.updateInputs();
    }

    public render() {
        return (
            <div className="container">
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
                            onClick={this.startGeneration}>{this.renderPasswordField()}
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
        if (this.state.password) {
            return this.state.password;
        }
        if (this.state.generating) {
            return "Generating...";
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

            const raw = new TextEncoder().encode(buffer);

            crypto.digest("SHA-512", raw).then((value: ArrayBuffer) => {
                const base64String = btoa(String.fromCharCode(...new Uint8Array(value)))
                    .substring(0, this.getPasswordLength());

                // todo verify the format and restart if needed
                console.log(this.symbolsAllowed);

                this.setState({
                    generating: false,
                    password: base64String,
                });
            });
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
