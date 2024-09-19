import { revisitsMessages } from '@revisits';

describe('Test in constants util', () => {
    it('should to match snapshot', () => {
        expect(revisitsMessages).toMatchSnapshot();
    });
});