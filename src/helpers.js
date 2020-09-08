import moment from 'moment'

export function formatDate(string) {
    if(string ===null  || string === undefined){
        return '';
    }

    return moment(String(string)).format('DD/MM/YYYY');
}

export default { formatDate }