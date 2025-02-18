const db = require('../db/connection');
const seed = require('../db/seed/seed');
const data = require('../db/data/test-data')

beforeEach(() => { 
    seed(data)
})

describe("We will be using this file in the very near future", () => {
  test("You'll love it!", () => {});
});
