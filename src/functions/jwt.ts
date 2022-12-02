import jwt from "jsonwebtoken";

export const Sign = ({ id }: MyPayload) => {
    return jwt.sign({ id }, process.env.BACK_SECRET as string);
};
export const Verify = (token: string) => {
    return (jwt.verify(token, process.env.BACK_SECRET as string) as MyPayload).id;
};
