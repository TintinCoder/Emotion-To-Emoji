// Teachable Machine Link -: https://teachablemachine.withgoogle.com/models/opFtPuWue/model.json
var prediction_1;
var prediction_2;
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

const webcam = document.getElementById("webcam");
Webcam.attach("#webcam");

function takeSelfie() {
    Webcam.snap(function(data_uri){
        document.getElementById('snapshot').innerHTML = `<img id="img" src="${data_uri}" alt="snapshot"/>`;
    })
}

// Now ML5

console.log(ml5.version);
const classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/opFtPuWue/model.json', modelReady);

function modelReady(result) {
    console.log('Model is now loaded');
}

function gotResult(error, result) {
    if (error) {
        console.error(error)
    }
    else {
        console.log(result);
        document.getElementById('emotion_name1').innerHTML = result[0].label;
        document.getElementById('emotion_name2').innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak()

        // Coding for the emojis
        if (result[0].label === "Happy") {
            document.getElementById('emoji1').innerHTML = "&#128522";
        }
        if (result[0].label === "Surprised") {
            document.getElementById('emoji1').innerHTML = "&#x1F632;";
        }
        if (result[0].label === "Confused") {
            document.getElementById('emoji1').innerHTML = "&#x1f914;";
        }
        if (result[1].label === "Happy") {
            document.getElementById('emoji2').innerHTML = "&#128522;";
        }
        if (result[1].label === "Surprised") {
            document.getElementById('emoji2').innerHTML = "&#x1F632;";
        }
        if (result[1].label === "Confused") {
            document.getElementById('emoji2').innerHTML = "&#x1f914;";
        }
    }
}

function speak() {
    const synth = window.speechSynthesis;
    const speakData_1 = "Your mood is either " + prediction_1;
    const speakData_2 = "or your mood is " + prediction_2;
    const utterThis = new SpeechSynthesisUtterance(speakData_1 + speakData_2);
    synth.speak(utterThis);
}

function predict() {
    const image = document.getElementById('img');
    classifier.classify(image, gotResult)
}