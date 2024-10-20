import { coursesMessages } from '@courses';

describe('Test in constants util', () => {
    it('should to match snapshot - coursesMessages', () => {
        expect(coursesMessages).toMatchSnapshot();
    })
});