const matchPairs = require("../matchPairs");

describe("Ensure function throws error with bad inputs", () => {
    
    it("throws an error if input not provided", () => {
        expect(() => matchPairs()).toThrowError();
    });

    it("throws an error if the input is empty", () => {
        expect(() => matchPairs("")).toThrowError();
    });

    it("throws an error if the input isn't a string", () => {
        expect(() => matchPairs(123)).toThrowError();
        expect(() => matchPairs(["abc"])).toThrowError();
    });

    it("throws an error if the input string contains invalid char", () => {
        expect(() => matchPairs("{[3")).toThrowError();
    });
});

describe("Ensure function returns true on good inputs", () => {

    it("returns true for braces", () => {
        expect(matchPairs("{}")).toBe(true);
    });
    
    it("returns true for brackets", () => {
        expect(matchPairs("[]")).toBe(true);
    });
    
    it("returns true for parens", () => {
        expect(matchPairs("()")).toBe(true);
    });

    it("returns true for nested inputs", () => {
        expect(matchPairs("{([])}")).toBe(true);
    });
    
    it("returns true for multiple open / close inputs", () => {
        expect(matchPairs("{}()[]")).toBe(true);
    });
});

describe("Ensure function returns false on valid, bad inputs", () => {

    it("returns false if something isn't closed", () => {
        expect(matchPairs("{([])")).toBe(false);
        expect(matchPairs("{([]}")).toBe(false);
        expect(matchPairs("{([)}")).toBe(false);
        expect(matchPairs("[")).toBe(false);
    });

    it("returns false if something wasn't opened", () => {
        expect(matchPairs("([])}")).toBe(false);
        expect(matchPairs("{[])}")).toBe(false);
        expect(matchPairs("{(])}")).toBe(false);
        expect(matchPairs("]")).toBe(false);
    });
});