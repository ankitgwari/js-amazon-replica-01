//unit test
import { formatCurrency } from '../../scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });
    describe('round off cents', () => {
        it('round up to nearest', () => {
            expect(formatCurrency(2000.5)).toEqual('20.01');
        });
        it('round down to nearest', () => {
            expect(formatCurrency(2000.4)).toEqual('20.00');
        });
    });
    it('works with negative numbers', () => {
        expect(formatCurrency(-500)).toEqual('-5.00');
    });
});