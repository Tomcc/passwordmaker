import * as React from "react";

declare class UIPassPhraseInputProps {
    public onPassPhraseSelected: (phrase: string | undefined) => void;
}

class UIPassPhraseInputState {
    public selectedPhrase: string | undefined;
}

export class UIPassPhraseInput extends React.Component {
    // @ts-ignore
    public props: UIPassPhraseInputProps;
    public state = new UIPassPhraseInputState();

    public render() {
        return (<p className="formsection">
            Passphrase{this.okText()}
            <input
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                type="password"
                onChange={this.onChange}
            /><br />
            <span className="style_hint">{this.hintText()}</span>
        </p>);
    }

    private okPhrase(): boolean {
        if (this.state.selectedPhrase) {
            return this.state.selectedPhrase.length > 5;
        }
        return false;
    }

    private okText(): string {
        if (this.okPhrase()) {
            return " ✔️";
        }
        return ":";
    }

    private hintText(): string {
        if (this.state.selectedPhrase) {
            if (this.state.selectedPhrase.length < 5) {
                return "Too short. At least 5 characters";
            }
        }
        return "(optional) protect your key file";
    }

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let phrase: string | undefined;

        if (e.target.value.length > 5) {
            phrase = e.target.value;
        }

        if (this.state.selectedPhrase !== phrase) {
            this.props.onPassPhraseSelected(phrase);
        }
        this.setState({ selectedPhrase: e.target.value });
    }
}
