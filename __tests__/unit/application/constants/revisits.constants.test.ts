import { revisitsMessages } from '@application/constants';

describe('Test in constants of revisits', () => {
    it('should to match snapshot', () => {
        expect(revisitsMessages).toMatchSnapshot();
    });
});