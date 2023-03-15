export interface M_Message {
    type: string,
    key: string,
    data: { [key: string]: string}
}