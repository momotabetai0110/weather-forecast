//初期処理-----------------------------------------------------------------------------------------------------------
let weather_API = '';
let locate_API ='';

//緯度経度を取得
navigator.geolocation.getCurrentPosition(connect_API);
//API接続準備
function connect_API(position){
    const KEY = "625a424f8db3eaeb4a4e2b020bcb5df9";
    const LAT = position.coords.latitude;
    const LON = position.coords.longitude;
    weather_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${KEY}&lang=ja&units=metric`;
    locate_API = `http://api.openweathermap.org/geo/1.0/reverse?lat=${LAT}&lon=${LON}&limit=5&appid=${KEY}`;
    get_locate()
}

//現在地の表示
async function get_locate(){
    console.log(locate_API)
    const LOCATE_RESPONSE = await fetch(locate_API);
    const LOCATE_JSON = await LOCATE_RESPONSE.json();
    document.getElementById('locate').innerHTML = "【現在地】" + LOCATE_JSON[0].local_names.ja;
}

//日付リストの表示
for (let i = 1; i < 6; i++) {
    const NOW_TIME = new Date();
    NOW_TIME.setDate(NOW_TIME.getDate() + i);
    const YEAR = NOW_TIME.getFullYear();
    const MONTH = add_0(NOW_TIME.getMonth() + 1);
    const DAY = NOW_TIME.getDate();
    document.getElementById("day" + i).innerHTML = `${YEAR}-${MONTH}-${DAY}`
}

//現在時刻を表示
function get_time() {
    const NOW_TIME = new Date();
    const NOW_MONTH = add_0(1 + NOW_TIME.getMonth());
    const NOW_YEAR = add_0(NOW_TIME.getFullYear());
    const NOW_DAY = add_0(NOW_TIME.getDate());
    const NOW_HOUR = add_0(NOW_TIME.getHours());
    const NOW_MINUTE = add_0(NOW_TIME.getMinutes());
    const NOW_SECOND = add_0(NOW_TIME.getSeconds());
    document.getElementById('time').innerHTML = `【現在時刻】${NOW_YEAR}/${NOW_MONTH}/${NOW_DAY} ${NOW_HOUR}:${NOW_MINUTE}:${NOW_SECOND}`;
}
setInterval(get_time, 1000);

//天気予報機能-----------------------------------------------------------------------------------------------------

//日時をもとに天気データを表示
async function get_weather(select_time) {
    const WEATHER_RESPONSE = await fetch(weather_API);
    const WEATHER_JSON = await WEATHER_RESPONSE.json();
    const JSON_LIST = WEATHER_JSON.list;
    let temp_array = [];
    let feel_temp_array = [];
    let climate = '';
    select_time = select_time.innerHTML;
    for (let i = 0; i < JSON_LIST.length; i++) {
        //選択した日付の気温を配列に追加
        if (JSON_LIST[i].dt_txt.startsWith(select_time)) {
            temp_array.push(JSON_LIST[i].main.temp);
            feel_temp_array.push(JSON_LIST[i].main.feels_like);
        }
        //選択した日付の12:00の天気を取得
        if (JSON_LIST[i].dt_txt === select_time + " 12:00:00") {
            climate = JSON_LIST[i].weather[0].description;
        }
    };
    const MAX_TEMP = temp_array.reduce((a, b) => a > b ? a : b);
    const MIN_TEMP = temp_array.reduce((a, b) => a < b ? a : b);
    const AVG_TEMP = get_avg(temp_array);
    const AVG_FEEL_TEMP = get_avg(feel_temp_array);
    document.getElementById('day_view').innerHTML = select_time;
    document.getElementById('weather1').innerHTML = `天気: ${climate}`;
    document.getElementById('weather2').innerHTML = `最高気温: ${MAX_TEMP}℃`;
    document.getElementById('weather3').innerHTML = `最低気温: ${MIN_TEMP}℃`;
    document.getElementById('weather4').innerHTML = `平均気温: ${AVG_TEMP}℃`;
    document.getElementById('weather5').innerHTML = `平均気温(体感): ${AVG_FEEL_TEMP}℃`;
}


//時刻のフォーマットを整形する
function add_0(time) {
    return String(time).padStart(2, '0')
}

//配列の平均を求める
function get_avg(array){
    let avg = 0;
    let = sum = 0;
    array.forEach(element => {
        sum += element;
        avg = sum/array.length;
    });
    return avg.toFixed(2);
}






