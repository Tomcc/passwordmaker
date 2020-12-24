CryptoJS.lib.Cipher||function(e){var t=(u=CryptoJS).lib,r=t.Base,i=t.WordArray,c=t.BufferedBlockAlgorithm,n=u.enc.Base64,s=u.algo.EvpKDF,o=t.Cipher=c.extend({cfg:r.extend(),createEncryptor:function(e,t){return this.create(this._ENC_XFORM_MODE,e,t)},createDecryptor:function(e,t){return this.create(this._DEC_XFORM_MODE,e,t)},init:function(e,t,r){this.cfg=this.cfg.extend(r),this._xformMode=e,this._key=t,this.reset()},reset:function(){c.reset.call(this),this._doReset()},process:function(e){return this._append(e),this._process()},finalize:function(e){return e&&this._append(e),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(t,r,i){return("string"==typeof r?l:d).encrypt(e,t,r,i)},decrypt:function(t,r,i){return("string"==typeof r?l:d).decrypt(e,t,r,i)}}}});t.StreamCipher=o.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var a=u.mode={},p=function(e,t,r){var i=this._iv;i?this._iv=void 0:i=this._prevBlock;for(var c=0;c<r;c++)e[t+c]^=i[c]},f=(t.BlockCipherMode=r.extend({createEncryptor:function(e,t){return this.Encryptor.create(e,t)},createDecryptor:function(e,t){return this.Decryptor.create(e,t)},init:function(e,t){this._cipher=e,this._iv=t}})).extend();f.Encryptor=f.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize;p.call(this,e,t,i),r.encryptBlock(e,t),this._prevBlock=e.slice(t,t+i)}}),f.Decryptor=f.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize,c=e.slice(t,t+i);r.decryptBlock(e,t),p.call(this,e,t,i),this._prevBlock=c}}),a=a.CBC=f,f=(u.pad={}).Pkcs7={pad:function(e,t){for(var r,c=(r=(r=4*t)-e.sigBytes%r)<<24|r<<16|r<<8|r,n=[],s=0;s<r;s+=4)n.push(c);r=i.create(n,r),e.concat(r)},unpad:function(e){e.sigBytes-=255&e.words[e.sigBytes-1>>>2]}},t.BlockCipher=o.extend({cfg:o.cfg.extend({mode:a,padding:f}),reset:function(){o.reset.call(this);var e=(t=this.cfg).iv,t=t.mode;if(this._xformMode==this._ENC_XFORM_MODE)var r=t.createEncryptor;else r=t.createDecryptor,this._minBufferSize=1;this._mode=r.call(t,this,e&&e.words)},_doProcessBlock:function(e,t){this._mode.processBlock(e,t)},_doFinalize:function(){var e=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){e.pad(this._data,this.blockSize);var t=this._process(!0)}else t=this._process(!0),e.unpad(t);return t},blockSize:4});var h=t.CipherParams=r.extend({init:function(e){this.mixIn(e)},toString:function(e){return(e||this.formatter).stringify(this)}}),d=(a=(u.format={}).OpenSSL={stringify:function(e){var t=e.ciphertext;return((e=e.salt)?i.create([1398893684,1701076831]).concat(e).concat(t):t).toString(n)},parse:function(e){var t=(e=n.parse(e)).words;if(1398893684==t[0]&&1701076831==t[1]){var r=i.create(t.slice(2,4));t.splice(0,4),e.sigBytes-=16}return h.create({ciphertext:e,salt:r})}},t.SerializableCipher=r.extend({cfg:r.extend({format:a}),encrypt:function(e,t,r,i){i=this.cfg.extend(i);var c=e.createEncryptor(r,i);return t=c.finalize(t),c=c.cfg,h.create({ciphertext:t,key:r,iv:c.iv,algorithm:e,mode:c.mode,padding:c.padding,blockSize:e.blockSize,formatter:i.format})},decrypt:function(e,t,r,i){return i=this.cfg.extend(i),t=this._parse(t,i.format),e.createDecryptor(r,i).finalize(t.ciphertext)},_parse:function(e,t){return"string"==typeof e?t.parse(e,this):e}})),u=(u.kdf={}).OpenSSL={execute:function(e,t,r,c){return c||(c=i.random(8)),e=s.create({keySize:t+r}).compute(e,c),r=i.create(e.words.slice(t),4*r),e.sigBytes=4*t,h.create({key:e,iv:r,salt:c})}},l=t.PasswordBasedCipher=d.extend({cfg:d.cfg.extend({kdf:u}),encrypt:function(e,t,r,i){return r=(i=this.cfg.extend(i)).kdf.execute(r,e.keySize,e.ivSize),i.iv=r.iv,(e=d.encrypt.call(this,e,t,r.key,i)).mixIn(r),e},decrypt:function(e,t,r,i){return i=this.cfg.extend(i),t=this._parse(t,i.format),r=i.kdf.execute(r,e.keySize,e.ivSize,t.salt),i.iv=r.iv,d.decrypt.call(this,e,t,r.key,i)}})}();