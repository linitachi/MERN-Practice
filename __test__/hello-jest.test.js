function sum(a, b) {
    return a + b;
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

// 相關的測試放一起，就能用 afterAll(fn, timeout)/afterEach(fn, timeout) / beforeAll(fn, timeout) / beforeEach(fn, timeout)
const myBeverage = {
    delicious: true,
    sour: false,
};

describe('my beverage', () => {
    test('is delicious', () => {
        expect(myBeverage.delicious).toBeTruthy();
    });

    test('is not sour', () => {
        expect(myBeverage.sour).toBeFalsy();
    });
});