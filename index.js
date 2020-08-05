let text = "";
let data = new Blob([text]);

const status = document.getElementsByClassName("_3-cMa _3Whw5")[0]

let downloadText = document.createElement("a")

downloadText.innerText = "Download Status History"
downloadText.href = URL.createObjectURL(data);
downloadText.download = "data.txt"
downloadText.type = "text/plain"

status.parentNode.appendChild(downloadText)

let isOnline = false

let secondsStart, secondsEnd

const tracker = () => {


  if (status.innerText === "çevrimiçi" && isOnline === false) {
    isOnline = true
    let timeStart = getTimeString()
    let today = new Date()
    secondsStart = today.getTime()
    console.log("secondsStart: " + secondsStart)
    text += timeStart + " - "
  }

  else if (status.innerText !== "çevrimiçi" && isOnline === true) {
    isOnline = false
    let timeEnd = getTimeString()
    let today = new Date()
    secondsEnd = today.getTime()
    console.log("secondsEnd: " + secondsEnd)
    console.log(typeof secondsEnd)

    console.log(calculateSeconds(secondsEnd, secondsStart))
    text += timeEnd + "(" + calculateSeconds(secondsEnd, secondsStart) + ")" + "\n" 


    data = new Blob([text]);
    downloadText.href = URL.createObjectURL(data)
  }
}

const getTimeString = () => {
  let today = new Date()
  return ('0' + today.getHours()).slice(-2) + ":" + ('0' + today.getMinutes()).slice(-2) + ":" + ('0' + today.getSeconds()).slice(-2)
}


const calculateSeconds = (se, ss) => {
  let res = se - ss

  res = Math.floor(res / 1000)

  console.log(res)
  console.log(typeof res)

  if (res > 3600) {
    let h = Math.floor(res / 3600)
    let min = Math.floor(res / 60)
    let sec = res % 60
    return (h + "h " + min + "m " + sec + "s")
  }

  else if (res > 60) {
    let min = Math.floor(res / 60)
    let sec = res % 60
    return (min + "m " + sec + "s")
  }
  else{
    return (res + "s")
  }
}

setInterval(tracker, 1000)