var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var inputGroup = $('.header__group-input');
var inputGroup2 = $('.header__group-input--mb')
var listHistory = $('.history__list');
var items = $$('.category-item')
var contentItems = $$('.content-item')
var playlist = $('.playlist')
var audio = $('#audio')
var heading = $('.song-name')
var single = $('.song-single')
var cdImg =  $('.cd-img')
var player = $('.player')
var nextBtn = $('.next-btn')
var prevBtn = $('.prev-btn')
var randomSong = $('.random-song')
var redoSong = $('.redo-song')
var progress = $('#progress')
var rangeVolume = $('.range_volum')
var time = $('.controls_time--left')
var timeRight = $('.controls_time--right')

// pc -tl
inputGroup.onclick = function() {
    inputGroup.classList.toggle('inputactive');
    listHistory.classList.toggle('active');
}
inputGroup.onblur = function() {
    listHistory.classList.remove('active');
    inputGroup.classList.remove('inputactive');
}
listHistory.onclick = function() {
    listHistory.classList.remove('active');
    inputGroup.classList.remove('inputactive');
}

// mb
inputGroup2.onclick = function() {
    inputGroup2.classList.toggle('inputactive');
    listHistory.classList.toggle('active');
}
inputGroup2.onblur = function() {
    listHistory.classList.remove('active');
    inputGroup2.classList.remove('inputactive');
}
listHistory.onclick = function() {
    listHistory.classList.remove('active');
    inputGroup2.classList.remove('inputactive');
}

items.forEach((item, index) => {
    var contentItem = contentItems[index];
    item.onclick = function() {
        $('.category-item.categoryactive').classList.remove('categoryactive');
        $('.content-item.active2').classList.remove('active2')
        item.classList.add('categoryactive')
        contentItem.classList.add('active2')
    }
})

// xử lý music

const app = {
    isPlaying: false,
    currenIndex: 0,
    songs: [
        {
            name: 'Cưới đi',
            single: '2T, ChangC',
            path: './assets/music/CuoiDi.mp3',
            image: './assets/images/anh1.jpg',
            time: '03:53'
        },
        {
            name: '3107 3',
            single: 'W/n, Duongg, Nâu, V.A',
            path: './assets/music/31073.mp3',
            image: './assets/images/anh6.jpg',
            time: '04:00'
        },
        {
            name: 'Có hẹn với thanh xuân',
            single: 'MONSTAR',
            path: './assets/music/cohenvoithanhxuan.mp3',
            image: './assets/images/anh7.jpg',
            time: '03:38'
        },
        {
            name: 'Răng khôn',
            single: 'Phí Phương Anh, RIN9',
            path: './assets/music/RangKhon.mp3',
            image: './assets/images/anh2.jpg',
            time: '03:52'
        },
        {
            name: 'Chỉ muốn bên em lúc này',
            single: 'Jiki X, Huy Vạc',
            path: './assets/music/ChiMuonBenEmLucNay.mp3',
            image: './assets/images/anh3.jpg',
            time: '04:03'
        },
        {
            name: 'Sài gòn đau lòng quá',
            single: 'Hứa Kim Tuyền, Hoàng Duyên',
            path: './assets/music/SaiGonDauLongQua.mp3',
            image: './assets/images/anh4.jpg',
            time: '05:09'
        },
        {
            name: 'Tình yêu màu hồng',
            single: 'Hồ Văn Quý, Xám',
            path: './assets/music/TinhYeuMauHong.mp3',
            image: './assets/images/anh5.jpg',
            time: '04:54'
        }
    ],
    render: function() {
        var _currenIndex = this.currenIndex
        const htmls = this.songs.map(function(song, index) {
            return `
        <div class="song ${index == _currenIndex ? 'active' : ''}" data-index="${index}">
            <div class="song-group">
                <img src="${song.image}" alt="" class="song-img">
                <div class="song-text">
                    <h5 class="song-name">${song.name}</h5>
                    <h6 class="song-single">${song.single}</h6>
                </div>
            </div>
            <div class="song-time">
                <span class="time-minutes">${song.time}</span>
            </div>
            <div class="song-control hide-on-mb-small">
                <div class="one hide-on-mb">
                    <div class="song-icon">
                        <i class="fas fa-microphone "></i>
                    </div>
                </div>
                <div class="two hide-on-mb-ss">
                    <div class="song-icon">
                        <i style="color: #7200a1" class="fas fa-heart "></i>
                    </div>
                </div>
                <div class="three">
                    <div class="song-icon">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
            `
        })
        playlist.innerHTML = htmls.join('');
    },
    handleElement: function() {
        var _this = this;
        player.onclick = function() {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        audio.onplay = function() {
                _this.isPlaying = true;
                player.classList.add('playing')
                cdImgAnimate.play();
        }
        audio.onpause = function() {
                _this.isPlaying = false;
                player.classList.remove('playing')
                cdImgAnimate.pause();
        }
        audio.onended = function() {
            nextBtn.click();
        }
        audio.ontimeupdate = function() {
            if (audio.duration) {
                var audioTimer = audio.currentTime / audio.duration * 100;
                progress.value = audioTimer;

                var e = Math.floor(audio.currentTime) ;
                    var d = e%60;
                    var b =  Math.floor(e/60);
                    if(d<10){
                       var c=0;
                    }else{
                        c="";
                    }
                    timeRight.textContent = '0' + b +  ":" + c + d;

                    // var ee= Math.floor( audio.duration) ;
                    // var dd = ee%60;
                    // var bb =  Math.floor(ee/60);
                    // if(dd<10){
                    //    var cc=0;
                    // }else{
                    //     cc="";
                    // }

                    // time_count.innerHTML =  '0' + bb +  ":" + cc + dd;

            }
        }
        progress.onchange = function(e) {
            var seek = audio.duration / 100 * e.target.value;
            audio.currentTime = seek;
        }
        rangeVolume.oninput = function(e) {
            var songVolume = e.target.value/100;
            audio.volume = songVolume
        }
        nextBtn.onclick = function() {
            _this.nextSong();
        }
        prevBtn.onclick = function() {
            _this.prevSong();
        }
        randomSong.onclick = function() {
            randomSong.classList.toggle('active')
        }
        redoSong.onclick = function() {
            redoSong.classList.toggle('active')
        }
        var cdImgAnimate = cdImg.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdImgAnimate.pause();
        playlist.onclick = function(e) {
            var songNode = e.target.closest('.song:not(.active)');
            if (songNode) {
                _this.currenIndex = Number(songNode.getAttribute('data-index'))
                _this.render();
                _this.loadCurrentSong();
                audio.play();
            }
        }
    },
    nextSong: function() {
        if (this.currenIndex ++ >= this.songs.length - 1) {
            this.currenIndex = 0;
        }
        this.loadCurrentSong();
        this.render();
        this.songIntoView();
        audio.play();
    },
    prevSong: function() {
        if (this.currenIndex -- <= 0) {
            this.currenIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
        this.render();
        this.songIntoView();
        audio.play();
    },
    songIntoView: function() {
        $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currenIndex]
            }
        })
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        single.textContent = this.currentSong.single;
        cdImg.src = this.currentSong.image;
        audio.src = this.currentSong.path;
        time.textContent = this.currentSong.time;
    },
    start: function() {
        this.render();
        this.defineProperties();
        this.loadCurrentSong();
        this.handleElement();
    }
}
app.start();