function formatDate(date,x){
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var res = [year,month,day].map(format).join("/");

    if(!x || x===2){
        console.log(date) 
        let hour = date.getHours();
        let minute = date.getMinutes();
        let seconds = date.getSeconds();
        return res + " " + [hour,minute,seconds].map(format).join(":");
    }

    return res;    
}

function format(n){
    return String(n)[1] ? n : '0'+n;
}

module.exports = {
    formatDate:formatDate
}