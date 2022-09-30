import moment from "moment";

export function formatAMPM(strDate: Date) {
    let date = moment(strDate).utc(false).toDate();
    // let hours = date.getUTCHours()
    // let minutes: string | number = date.getUTCMinutes()
    // let ampm = hours >= 12 ? 'Pm' : 'Am';
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    // minutes = minutes < 10 ? '0'+minutes : minutes;
    // const strTime = hours + ':' + minutes + ' ' + ampm;
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export function makeRandomId(length: number) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
