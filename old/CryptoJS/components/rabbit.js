!function(){var i=CryptoJS,t=i.lib.StreamCipher,r=i.algo,o=[],s=[],a=[],e=r.Rabbit=t.extend({_doReset:function(){for(var i=this._key.words,t=this.cfg.iv,r=0;r<4;r++)i[r]=16711935&(i[r]<<8|i[r]>>>24)|4278255360&(i[r]<<24|i[r]>>>8);var o=this._X=[i[0],i[3]<<16|i[2]>>>16,i[1],i[0]<<16|i[3]>>>16,i[2],i[1]<<16|i[0]>>>16,i[3],i[2]<<16|i[1]>>>16],s=this._C=[i[2]<<16|i[2]>>>16,4294901760&i[0]|65535&i[1],i[3]<<16|i[3]>>>16,4294901760&i[1]|65535&i[2],i[0]<<16|i[0]>>>16,4294901760&i[2]|65535&i[3],i[1]<<16|i[1]>>>16,4294901760&i[3]|65535&i[0]];for(this._b=0,r=0;r<4;r++)h.call(this);for(r=0;r<8;r++)s[r]^=o[r+4&7];if(t){var a=t.words,e=a[0],f=a[1],c=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8),_=16711935&(f<<8|f>>>24)|4278255360&(f<<24|f>>>8),l=c>>>16|4294901760&_,v=_<<16|65535&c;for(s[0]^=c,s[1]^=l,s[2]^=_,s[3]^=v,s[4]^=c,s[5]^=l,s[6]^=_,s[7]^=v,r=0;r<4;r++)h.call(this)}},_doProcessBlock:function(i,t){var r=this._X;h.call(this),o[0]=r[0]^r[5]>>>16^r[3]<<16,o[1]=r[2]^r[7]>>>16^r[5]<<16,o[2]=r[4]^r[1]>>>16^r[7]<<16,o[3]=r[6]^r[3]>>>16^r[1]<<16;for(var s=0;s<4;s++)o[s]=16711935&(o[s]<<8|o[s]>>>24)|4278255360&(o[s]<<24|o[s]>>>8),i[t+s]^=o[s]},blockSize:4,ivSize:2});function h(){for(var i=this._X,t=this._C,r=0;r<8;r++)s[r]=t[r];for(t[0]=t[0]+1295307597+this._b|0,t[1]=t[1]+3545052371+(t[0]>>>0<s[0]>>>0?1:0)|0,t[2]=t[2]+886263092+(t[1]>>>0<s[1]>>>0?1:0)|0,t[3]=t[3]+1295307597+(t[2]>>>0<s[2]>>>0?1:0)|0,t[4]=t[4]+3545052371+(t[3]>>>0<s[3]>>>0?1:0)|0,t[5]=t[5]+886263092+(t[4]>>>0<s[4]>>>0?1:0)|0,t[6]=t[6]+1295307597+(t[5]>>>0<s[5]>>>0?1:0)|0,t[7]=t[7]+3545052371+(t[6]>>>0<s[6]>>>0?1:0)|0,this._b=t[7]>>>0<s[7]>>>0?1:0,r=0;r<8;r++){var o=i[r]+t[r],e=65535&o,h=o>>>16,f=((e*e>>>17)+e*h>>>15)+h*h,c=((4294901760&o)*o|0)+((65535&o)*o|0);a[r]=f^c}i[0]=a[0]+(a[7]<<16|a[7]>>>16)+(a[6]<<16|a[6]>>>16)|0,i[1]=a[1]+(a[0]<<8|a[0]>>>24)+a[7]|0,i[2]=a[2]+(a[1]<<16|a[1]>>>16)+(a[0]<<16|a[0]>>>16)|0,i[3]=a[3]+(a[2]<<8|a[2]>>>24)+a[1]|0,i[4]=a[4]+(a[3]<<16|a[3]>>>16)+(a[2]<<16|a[2]>>>16)|0,i[5]=a[5]+(a[4]<<8|a[4]>>>24)+a[3]|0,i[6]=a[6]+(a[5]<<16|a[5]>>>16)+(a[4]<<16|a[4]>>>16)|0,i[7]=a[7]+(a[6]<<8|a[6]>>>24)+a[5]|0}i.Rabbit=t._createHelper(e)}();