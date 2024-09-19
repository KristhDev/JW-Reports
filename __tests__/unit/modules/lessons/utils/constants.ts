import { lessonsMessages } from '@lessons';

describe('Test in constants util', () => {
    it('should to match snapshot', () => {
        expect(lessonsMessages).toMatchSnapshot();
    })
});