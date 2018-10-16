import * as React from "react";

declare class UIFileComponentProps {
    public onFilePicked: (name: string) => void;
}

class UIFileComponentState {
    selectedFile: string | undefined;
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
        function handle() {
            if (!e.target.files || e.target.files.length == 0) {
                return;
            }

            if (e.target.files.length > 1) {
                alert("Select only one file");
                return;
            }
            return e.target.files[0].name;
        }

        let filename = handle();
        if (filename) {
            this.props.onFilePicked(filename);

            this.setState({ selectedFile: filename });
        }
        else {
            this.setState({ selectedFile: undefined });
        }
    }

    private fileFieldContent(): string {
        // place a bunch of dots in the out field
        if (this.state.selectedFile) {
            return new Array(this.state.selectedFile.length + 1).join('•');
        }
        return "No file selected";
    }

    public render() {
        return <p className="formsection">
            <span id="keyfile_desc">Choose your key file:</span>
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
            <p className="style_warning">WARNING: you will lose your passwords losing this file, or changing it in any way!</p>
        </p>
    }
}