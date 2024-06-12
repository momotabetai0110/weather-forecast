const WEATHER = 'weather';

function get_id(element) {
    document.getElementById('day_view').innerHTML = element.id
    for (let i = 1; i < 6; i++) {
        console.log(WEATHER + i)
        let loop_str = WEATHER + i
        document.getElementById(loop_str).innerHTML = loop_str + ': ' + element.id
    }
}

function get_time(){
    let now_time = new Date();
    let now_month = 1 + now_time.getMonth();
    if (String(now_month).length === 1) {
        now_month = "0" + String(now_month)
    }
    let now_year = now_time.getFullYear();
    let now_day = now_time.getDate();
    let now_hour = now_time.getHours();
    let now_minute = now_time.getMinutes();
    let now_second = now_time.getSeconds();
    if (String(now_second).length === 1) {
        now_second = "0" + String(now_second)
    }
    document.getElementById('time').innerHTML = now_year + "/" + now_month + "/" + now_day + " " + now_hour + ":" + now_minute + ":" + now_second
}

setInterval(get_time,1000);