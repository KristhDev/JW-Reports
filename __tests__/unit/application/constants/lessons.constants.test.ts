import { lessonsMessages } from '@application/constants';

describe('Test in lessons constants', () => {
    it('should to match snapshot', () => {
        expect(lessonsMessages).toMatchSnapshot();
    })
});