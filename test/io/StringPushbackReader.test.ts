import { StringPushbackReader } from '../../src/io/StringPushbackReader';
import { PushbackReaderFixture } from './PushbackReaderFixture';

suite('StringPushbackReader', ()=> {
    let content: string;
    let reader: StringPushbackReader;
    let fixture: PushbackReaderFixture;

    setup(() => {
        content = "Test String";
        reader = new StringPushbackReader(content);
        fixture = new PushbackReaderFixture(reader, content);
    });

    test('Operations', () => {
        fixture.testOperations();
    });    

    test('Pushback', () => {
        fixture.testPushback();
    });    

});