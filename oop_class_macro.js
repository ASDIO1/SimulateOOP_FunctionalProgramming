import { unwrap, isIdentifier } from '@sweet-js/helpers' for syntax;

// CLASS
syntax class = function (ctx) {
    let name = ctx.next().value;
    let bodyCtx = ctx.contextify(ctx.next().value);

    // default constructor if none specified
    let construct = #`function ${name} () {}`;
    let result = #``;
    for (let item of bodyCtx) {
        if (isIdentifier(item) && unwrap(item).value === 'constructor') {
            construct = #`
                function ${name} ${bodyCtx.next().value}
                ${bodyCtx.next().value}
            `;
        } else {
            result = result.concat(#`
            ${name}.prototype.${item} = function
                ${bodyCtx.next().value}
                ${bodyCtx.next().value};
            `);
        }
    }
    return construct.concat(result);
};

class Counter5 {
    constructor(counter, step) {
        this.counter = counter;
        this.step = step;
    }

    inc() {
        this.counter = this.counter + this.step
    }

    dec() {
        this.counter = this.counter - this.step
    }

    reset() {
        this.counter = 0
    }

    setStep(newstep) {
        this.step = newstep
    }
}