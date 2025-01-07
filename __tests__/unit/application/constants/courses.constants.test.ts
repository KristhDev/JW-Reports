import { coursesMessages } from '@application/constants';

describe('Test in constants util', () => {
    it('should to match snapshot - coursesMessages', () => {
        expect(coursesMessages).toMatchSnapshot();
    })
});