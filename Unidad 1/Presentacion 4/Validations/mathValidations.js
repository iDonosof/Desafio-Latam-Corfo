function ValidateIntegerNumber(params) {
    params.forEach(element => {
        if(typeof(element) !== "number")
            throw new Error("Parameters should be numeric");
    });
}

function ValidateCeroValues(value) {
    if(value === 0) {
        throw new Error("Value can't be 0");
    }
}

function ValidateNoNegativeNumbers(params) {
    params.forEach(element => {
        if(element < 0)
            throw new Error("Parameters should be greater than 0");
    });
}

export {
    ValidateIntegerNumber,
    ValidateCeroValues,
    ValidateNoNegativeNumbers
}