$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);
var playlist = $('.playlist');
var btnPlay = $('.btn.btn-toggle-play');
var audio = $('#audio')
var player = $('#player');
const NAME_STORE_KEY = 'F8 - PLAYER'
const nameSong = $('.name_content h2');
const singerSong = $('.name_content .name_3');
const cdThumb = $('.cd_thumb');
const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');
const progress = $('.progress');
const btnRandom = $('.btn-random');
const btnRepeat = $('.btn-repeat');
var songPasted = [];
var cd = $('.cd');
var app = {
    isPlay : false,
    currentIndex : 0,
    isRandom : false,
    isRepeat : false,
    config : JSON.parse(localStorage.getItem(NAME_STORE_KEY)) || {},

    setConfig : function(key , value) {
            this.config[key] =value;
            localStorage.setItem(NAME_STORE_KEY , JSON.stringify(this.config));
            console.log(this.config);
    },




     songs : [
        {
            name : 'Bao nhiêu tiền mua được mớ bình yên',
            singer : '14 Casper , Bon',
            img : 'https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/1/c/3/b/1c3b6283e28b9030d8f6410b210bd765.jpg',
            link : './media/BaoTienMotMoBinhYenLofiVersion-14CasperBonFreakD-6982202.mp3'
        },
        {
            name : 'Có hẹn với thanh xuân',
            singer : 'Suni Hạ Linh',
            img : 'https://i1.sndcdn.com/artworks-ApUD7zsN1RVXcH9u-JhXvBw-t500x500.jpg',
            link : './media/CoHenVoiThanhXuan-SuniHaLinhHoangDungGREYDDoanTheLanOrangeTlinh-7613769.mp3'
        },
        {
            name : 'Cùng Anh',
            singer : 'Ngọc Dolil',
            img : 'https://i.pinimg.com/736x/4b/bc/52/4bbc5291210257fd73c8fd0092704c86.jpg',
            link : './media/Cung-Anh-Ngoc-Dolil-Hagii-STee.mp3'
        },
        {
            name : 'Yêu vội vàng',
            singer : 'Lê Bảo Bình',
            img : 'https://data.chiasenhac.com/data/cover/148/147345.jpg',
            link : './media/Yeu-Voi-Vang-Le-Bao-Binh.mp3'
        },
        {
            name : 'Năm ấy',
            singer : 'Đức Phúc',
            img : 'https://i.ytimg.com/vi/Qmme7CBEVEI/maxresdefault.jpg',
            link : './media/NamAy-DucPhuc-5305026.mp3'
        },
        {
            name : 'Như những phút ban đầu',
            singer : ' Lady Mây',
            img : 'https://i1.sndcdn.com/artworks-Qk2NmnKYwNZqdtvv-2kXqTg-t500x500.jpg',
            link : './media/NhuNhungPhutBanDauCaSiMatNa-LadyMay-7793881.mp3'
        }
    ],
    updateSong : function(){
          var results = this.songs.map(function(song , index){
                //  console.log(song.id);
                return ` <div class="song ${index === app.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url(${song.img})" ></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="anthor">${song.singer}</p>
                </div>
                <div class="options">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
          });
        //   console.log(results);
          playlist.innerHTML = results.join('');
      },
    propertiesDefine : function (){
        Object.defineProperty(this , 'currentSong' , {
            get : function() {
                return this.songs[this.currentIndex];
            },
        })
    },


    loadingCurrentSong : function() {
        nameSong.textContent = `${this.currentSong.name}`;
        singerSong.textContent = `${this.currentSong.singer}`;
        audio.src = `${this.currentSong.link}`;
        cdThumb.style.backgroundImage = `url(${this.currentSong.img})`;
        // var songActive = $(`.song.${this.currentIndex}`);
        // console.log(songActive);
        
    },


    handleEvents : function() {
        const cdWidth = cd.offsetWidth;
        const songs = $$('.song');
        const roteCd = cdThumb.animate([{transform : 'rotate(360deg)'}],{
            duration : 10000,
            iterations : Infinity
        })

        roteCd.pause();


        document.onscroll = function() {
            var htmlLength = window.scrollY || document.documentElement.scrollTop;
            var newCdHight =  cdWidth - htmlLength;
            cd.style.width = newCdHight > 0 ? newCdHight + 'px' : 0;
            cd.style.opacity = newCdHight / cdWidth;
        }



        btnPlay.onclick = function() {
            if(app.isPlay) {
                audio.pause();
            } else audio.play();
            audio.onplay = function() {
                app.isPlay = true;
                player.classList.add('playing');
                roteCd.play();
            }
            audio.onpause = function() {
                app.isPlay = false;
                player.classList.remove('playing');
                roteCd.pause();
            }
        }



        audio.ontimeupdate = function () {
            // console.log(audio.currentTime);
            if(audio.duration) {
                    const time = Math.floor((audio.currentTime / audio.duration) *100);
                    progress.value = time;
                      // console.log(time);
            }
        }


        progress.onchange = function(e) {
            const nowTime = (e.target.value * audio.duration ) / 100;
            audio.currentTime = nowTime;
        }


        btnNext.onclick = function() {
            if(app.isRandom === true) app.randomSong()
            else app.nextSongs();
            audio.play();
            audio.onplay = function() {
                app.isPlay = true;
                player.classList.add('playing');
                roteCd.play();
            }
            app.updateSong();
            app.scrollToSeeSong();
        }

        btnPrev.onclick = function() {
            if(app.isRandom === true) app.randomSong()
            else app.prevSongs();
            audio.play();
            audio.onplay = function() {
                app.isPlay = true;
                player.classList.add('playing');
                roteCd.play();
            }
            app.updateSong();
            app.scrollToSeeSong();
        }


        btnRandom.onclick = function() {
            app.isRandom = !app.isRandom;
            app.setConfig('isRandom' , app.isRandom );
            btnRandom.classList.toggle('active' , app.isRandom);    
            songPasted.push(app.currentIndex);
            // console.log(1);
        }

        btnRepeat.onclick = function() {
            app.isRepeat = !app.isRepeat;
            console.log(app.isRepeat);
            app.setConfig('isRepeat' , app.isRepeat );
            btnRepeat.classList.toggle('active' , app.isRepeat);    
        }



        audio.onended = function() {
            if(app.isRepeat) audio.play();
            else btnNext.onclick();
        }


        playlist.onclick = function(e) {
            var songNote = e.target.closest('.song:not(.active)');
            if(songNote || e.target.closest('.options')) {
                if(songNote) {
                    var idSong = songNote.getAttribute('data-index');
                    app.touchSongs(Number(idSong));
                    audio.play();
                    audio.onplay = function() {
                        app.isPlay = true;
                        player.classList.add('playing');
                        roteCd.play();
                    }
                }
            }
        }
        

    },

    nextSongs : function () {
        this.currentIndex ++;
        if(this.currentIndex === this.songs.length) this.currentIndex = 0;
        this.loadingCurrentSong();
    },

    prevSongs : function() {
        this.currentIndex --;
        if(this.currentIndex < 0) this.currentIndex = this.songs.length - 1;
        this.loadingCurrentSong();
    },

    randomSong : function() {
        var newIndex;
        var kt =false;
        do {
            if(songPasted.length === this.songs.length) songPasted = [];
            newIndex = Math.floor(Math.random() * this.songs.length);
            if(songPasted.indexOf(newIndex) === -1) 
            {
                kt = true;
                songPasted.push(newIndex);
            }
        }         
        while(kt === false);
        // console.log(songPasted);
        this.currentIndex = newIndex;
        this.loadingCurrentSong();
    },

    scrollToSeeSong : function() {
        setTimeout(() => {
            setTimeout(() => {
               $('.song.active').scrollIntoView({
                    behavior  : 'smooth',
                    block : 'end'
               })
            })
            
        }, 300);
    },



    touchSongs : function(id) {
        this.currentIndex = id;
        this.updateSong();
        this.loadingCurrentSong();
    },


    loadingStoneKeys : function() {
        this.isRepeat = this.config['isRepeat'];
        this.isRandom = this.config['isRandom'];
    },



    start : function() {

        this.loadingStoneKeys();  

        this.updateSong();

        this.handleEvents();

        this.propertiesDefine();

        this.loadingCurrentSong();
        
        btnRepeat.classList.toggle('active' , app.isRepeat);   
        btnRandom.classList.toggle('active' , app.isRandom);
    }
}

app.start();