var playing = 0
var exSound = null
var exRadio = null

function changer(playingg, exSoundd, exRadioo) {
    exSound = exSoundd
    exRadio = exRadioo
    playing = playingg
}

async function radioEmit(radioId, radioName) {
    $.ajax({
        url: "/api/channel/" + radioId,
        dataType: 'json',
        success: function(radio) {
            //console.log(radio.mp3)
            if (radio.mp3 === null) {
                throw 'No stream data. ' + radio.id
            }
            try {
                var sound = new Howl({
                    src: radio.mp3,
                    html5: true,
                    format: ['mp3', 'm3u', 'aac']
                });
            } catch (e) {
                throw 'Error', e
            }
            sound.once('load', async function() {
                console.log("Radio loaded.", radio.id)
                await sound.play();
                try {
                    if (exSound.playing()) {
                        await exSound.stop()
                        changer(0, exSound, exRadio)
                    }
                } catch (e) {

                }
            });

            sound.once('play', async function() {
                document.getElementById("streamName").innerText = radioName
                const playBtn = document.getElementById("playpause");
                playBtn.classList.remove("play");
                playBtn.classList.add("pause");
                await changer(1, sound, radio)
                console.log("Radio stream started.", radio.id)
                if (sound.playing() == false) {
                    await sound.play()
                }
            })
            sound.once('loaderror', async function() {
                await gotomappoint(JSON.parse(exRadio.coordinates))
                Howler.unload()
                throw 'Load error. ' + radio.id
            })
            sound.once('playerror', async function() {
                await gotomappoint(JSON.parse(exRadio.coordinates))
                Howler.unload()
                throw 'Play error. ' + radio.id
            })
        }
    })
}