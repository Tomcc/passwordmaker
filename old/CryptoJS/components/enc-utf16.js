!function(){var r=CryptoJS,t=r.lib.WordArray,n=r.enc;function o(r){return r<<8&4278255360|r>>>8&16711935}n.Utf16=n.Utf16BE={stringify:function(r){for(var t=r.words,n=r.sigBytes,o=[],e=0;e<n;e+=2){var f=t[e>>>2]>>>16-e%4*8&65535;o.push(String.fromCharCode(f))}return o.join("")},parse:function(r){for(var n=r.length,o=[],e=0;e<n;e++)o[e>>>1]|=r.charCodeAt(e)<<16-e%2*16;return t.create(o,2*n)}},n.Utf16LE={stringify:function(r){for(var t=r.words,n=r.sigBytes,e=[],f=0;f<n;f+=2){var i=o(t[f>>>2]>>>16-f%4*8&65535);e.push(String.fromCharCode(i))}return e.join("")},parse:function(r){for(var n=r.length,e=[],f=0;f<n;f++)e[f>>>1]|=o(r.charCodeAt(f)<<16-f%2*16);return t.create(e,2*n)}}}();