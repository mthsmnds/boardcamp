export default function validateSchema(schema) {
    return (req, res, next) => {

        const validation = schema.validate(req.body, { abortEarly: false });

        if (validation.error) {
            const message = validation.error.details.map(detail => detail.message);
            return res.status(422).send(message);
        }
        next();
    }
}