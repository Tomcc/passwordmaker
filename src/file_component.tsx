import * as React from "react";

declare class UIFileComponentProps {
    public onFilePicked: (name: File | undefined) => void;
}

class UIFileComponentState {
    public selectedFile: File | undefined;
}

export class UIFileComponent extends React.Component {
    // @ts-ignore
    public props: UIFileComponentProps;
    public state = new UIFileComponentState();

    private filePicker = React.createRef<HTMLInputElement>();

    public onClick = () => {
        if (this.filePicker.current) {
            this.filePicker.current.click();
        }
    }

    public onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        function validateFile(): File | undefined {
            if (!e.target.files || e.target.files.length === 0) {
                return;
            }

            if (e.target.files.length > 1) {
                alert("Select only one file");
                return;
            }
            return e.target.files[0];
        }

        const file = validateFile();

        this.props.onFilePicked(file);
        this.setState({ selectedFile: file });
    }

    public render() {
        return <p className="formsection">
            <span>Choose your key file{this.okText()}</span>
            <input
                className="invisible_picker"
                type="file"
                ref={this.filePicker}
                onChange={this.onFileSelected}
            />
            <button
                onClick={this.onClick}
                className="fake_button">
                <b>{this.fileFieldContent()}</b>
            </button>
            <p className="style_warning">
                WARNING: you will lose your passwords losing this file, or changing it in any way!
                </p>
        </p>;
    }

    private fileFieldContent(): string {
        // place a bunch of dots in the out field
        if (this.state.selectedFile) {
            return new Array(this.state.selectedFile.name.length + 1).join("•");
        }
        return "No file selected";
    }

    private okText(): string {
        if (this.state.selectedFile) {
            return " ✔️";
        }
        return ":";
    }
}
