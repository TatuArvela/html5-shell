const sum = (term1: number, term2: number) => {
  return term1 + term2;
};

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
