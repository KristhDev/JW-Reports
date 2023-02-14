import { darkColors, lightColors, undefinedColors } from '../../src/theme';

describe('Test in colors of theme', () => {
    it('should to match snapshot lightColors', () => {
        expect(lightColors).toMatchSnapshot();
    });

    it('should to match snapshot darkColors', () => {
        expect(darkColors).toMatchSnapshot();
    });

    it('should to match snapshot undefinedColors', () => {
        expect(undefinedColors).toMatchSnapshot();
    });
});