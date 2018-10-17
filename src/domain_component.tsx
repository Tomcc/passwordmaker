import * as React from "react";

export function extractDomain(URL: string): string | undefined {
    if (URL.length > 0) {

        // try to find a domain in there
        // it's actually an harder problem than it looks, could need a server-side thing
        // doesn't work if TLD has a dot inside, but there is no way of knowing without
        // listing special TLDs

        // look for :// and remove up to it
        let startOfAddress = URL.indexOf("://");
        if (startOfAddress === -1) {
            startOfAddress = 0;
        }
        else {
            startOfAddress = startOfAddress + 3;
        }

        // find either the end of file or the first /
        let endOfAddress = URL.indexOf("/", startOfAddress);

        if (endOfAddress === -1) {
            endOfAddress = URL.length;
        }

        // there must be at least one period
        const TLDpoint = URL.lastIndexOf(".", endOfAddress);
        if (TLDpoint === -1) {
            return;
        }

        // and the domain must exist (actually just check length)
        if (TLDpoint >= endOfAddress - 2) {
            return;
        }

        // good. now find the previous dot or start
        let domainStart = URL.lastIndexOf(".", TLDpoint - 1);
        if (domainStart === -1) {
            domainStart = startOfAddress;
        }
        else {
            ++domainStart;
        }

        return URL.substring(domainStart, endOfAddress);
    }
    else {
        return;
    }
}

class UIDomainInputState {
    public selectedDomain: string | undefined;
}

declare class UIDomainInputProps {
    public onDomainPicked: (domain: string) => void;
}

export class UIDomainInput extends React.Component {
    // @ts-ignore
    public props: UIDomainInputProps;
    public state = new UIDomainInputState();

    public render() {
        return <p className="formsection">
            <span>Enter the URL of your site{this.renderOk()}</span>
            <input
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                type="url"
                onChange={this.onChange}
            /><br />
            <span className="style_hint">{this.renderHint()}</span>
        </p>;
    }

    private renderHint(): string {
        if (this.state.selectedDomain) {
            return this.state.selectedDomain;
        }
        return "URL not recognized";
    }

    private renderOk(): string {
        if (this.state.selectedDomain) {
            return " ✔️";
        }
        return ":";
    }

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const domain = extractDomain(e.target.value);
        this.setState({
            selectedDomain: domain,
        });

        if (domain) {
            this.props.onDomainPicked(domain);
        }
    }
}
