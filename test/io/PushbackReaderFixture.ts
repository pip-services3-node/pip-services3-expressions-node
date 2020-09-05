const assert = require('chai').assert;

import { IPushbackReader } from '../../src/io/IPushbackReader';
import { CharValidator } from '../../src';

export class PushbackReaderFixture {
    private _reader: IPushbackReader;
    private _content: string;

    public constructor(reader: IPushbackReader, content: string) {
        this._reader = reader;
        this._content = content;
    }

    public testOperations(): void {
        let chr = this._reader.peek();
        assert.equal(this._content.charCodeAt(0), chr);

        chr = this._reader.read();
        assert.equal(this._content.charCodeAt(0), chr);

        chr = this._reader.read();
        assert.equal(this._content.charCodeAt(1), chr);

        this._reader.pushback('#'.charCodeAt(0));
        chr = this._reader.read();
        assert.equal('#', String.fromCharCode(chr));

        this._reader.pushbackString("@$");
        chr = this._reader.read();
        assert.equal('@', String.fromCharCode(chr));
        chr = this._reader.read();
        assert.equal('$', String.fromCharCode(chr));

        for (let i = 2; i < this._content.length; i++) {
            chr = this._reader.read();
            assert.equal(this._content.charCodeAt(i), chr);
        }

        chr = this._reader.read();
        assert.equal(-1, chr);

        chr = this._reader.read();
        assert.equal(-1, chr);
    }

    public testPushback(): void {
        let chr: number;
        let lastChr: number;
        for (chr = this._reader.read(); !CharValidator.isEof(chr); chr = this._reader.read()) {
            lastChr = chr;           
        }

        this._reader.pushback(lastChr);
        this._reader.pushback(chr);

        let chr1 = this._reader.peek();
        assert.equal(lastChr, chr1);

        chr1 = this._reader.read();
        assert.equal(lastChr, chr1);
    }
}