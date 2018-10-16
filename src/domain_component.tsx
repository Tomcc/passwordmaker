import * as React from "react";

export function extractDomain(URL: string): string | undefined {
    if (URL.length > 0) {

        //try to find a domain in there
        //it's actually an harder problem than it looks, could need a server-side thing
        //doesn't work if TLD has a dot inside, but there is no way of knowing without
        //listing special TLDs

        //look for :// and remove up to it
        var startOfAddress = URL.indexOf("://")
        if (startOfAddress == -1)
            startOfAddress = 0
        else
            startOfAddress = startOfAddress + 3

        //find either the end of file or the first /
        var endOfAddress = URL.indexOf("/", startOfAddress)

        if (endOfAddress == -1) {
            endOfAddress = URL.length
        }

        //there must be at least one point
        var TLDpoint = URL.lastIndexOf('.', endOfAddress)
        if (TLDpoint == -1) {
            return;
        }

        //and the domain must exist (actually just check length)
        if (TLDpoint >= endOfAddress - 2) {
            return
        }

        //good. now find the previous dot or start
        var domainStart = URL.lastIndexOf('.', TLDpoint - 1)
        if (domainStart == -1) {
            domainStart = startOfAddress
        }
        else {
            ++domainStart
        }

        return URL.substring(domainStart, endOfAddress)
    }
    else {
        return;
    }
}

export class UIDomainInput extends React.Component {
    public render() {
        return <p className="formsection">
            <span id="input_desc">Enter the URL of your site:</span>
            <input autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} type="url" id="input" />
            <span id="actualurl" className="style_hint"></span>
        </p>;
    }
}