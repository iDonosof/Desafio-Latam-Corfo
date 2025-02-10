module.exports = class JsonDataTypeChannel {
    constructor(schema) {
        this.schema = schema;
    }

    validate(message) {
        const { error } = this.schema.validate(message);
        if (error) {
            throw new Error(`Mensaje inválido: ${error.details[0].message}`);
        }
        return message;
    }
};
