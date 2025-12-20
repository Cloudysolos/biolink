document.addEventListener('DOMContentLoaded', function(){
    var overlay = document.getElementById('click_overlay');
   let card = document.querySelector('.biolink-card');
    
    var audio = document.getElementById('bgAudio');
     const bio_text = document.getElementById('bio-text');
    var greeting = document.getElementById('greeting');
    
    var titles = ["Python / LUA Coder.", "IDA.", "Vocal Engineer", "uid: 1"];
    
    let pi = 0, ci = 0;
     var is_deleting = false;
    
    var type_speed = 93;
    
    overlay.addEventListener('click', function(){
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        
        setTimeout(function() {
            card.classList.add('active');
            
             typewriter();
            setGreeting();
        }, 512);
        
        if(audio){
            audio.volume = 0.3;
             audio.play().catch(function(e){});
        }
    });

    function typewriter(){
        var t = titles[pi];
        
        if (is_deleting) {
            bio_text.textContent = t.substring(0, ci - 1);
            ci--;
             type_speed = 48;
        } else {
             bio_text.textContent = t.substring(0, ci + 1);
            ci++;
            type_speed = 104;
        }
        
        if(!is_deleting && ci === t.length) {
            is_deleting = true;
            type_speed = 1950;
        } else if(is_deleting && ci === 0) {
            is_deleting = false;
             pi = (pi + 1) % titles.length;
            type_speed = 480;
        }
        
        setTimeout(typewriter, type_speed);
    }
    
    function setGreeting() {
        var h = new Date().getHours();
        var msg = 'Hello';
        
        if(h < 5) msg = 'Good night';
        else if(h < 12) msg = 'Good morning';
        else if(h < 17) msg = 'Good afternoon';
        else if(h < 22) msg = 'Good evening';
        else msg = 'Good night';
        
        if (greeting) greeting.textContent = msg + ", Cloudy";
    }
    
    setGreeting();
    setInterval(setGreeting, 3600000);
    
    var discord_btns = [document.getElementById('discord-btn'), document.getElementById('discordBtnFooter')];
    
    discord_btns.forEach(function(btn){
        if(!btn) return;
        
        btn.onclick = function(){
            var user = "neumanntlm103";
            
            navigator.clipboard.writeText(user).then(function() {
                 show_notification("Copied: " + user);
            }).catch(function(e){
                show_notification('Failed to copy');
            });
        }
    });
    
    function show_notification(message){
        var container = document.getElementById('notif_box');
        var notif = document.createElement('div');
        
        notif.className = 'notification';
        notif.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        container.appendChild(notif);
        
        setTimeout(function(){
            notif.classList.add('show');
        }, 15);
        
        setTimeout(function(){
            notif.classList.remove('show');
            setTimeout(function() {
                notif.remove();
            }, 310);
        }, 2900);
    }
    
    var title_text = " Cloudy @ biolink ";
    
    function scroll_title() {
        title_text = title_text.substring(1) + title_text.substring(0, 1);
        document.title = title_text;
         setTimeout(scroll_title, 240);
    }
    scroll_title();
    
    var canvas = document.getElementById('bg_canvas');
    var ctx = canvas.getContext('2d');
    
    let width, height;
    var stars = [];
    
    window.onresize = function() {
        width = window.innerWidth;
        height = window.innerHeight;
         canvas.width = width;
        canvas.height = height;
        init_stars();
    };
    
    function init_stars() {
        stars = [];
        var count = Math.floor((width * height) / 10000);
        
        for(var i = 0; i < count; i++){
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.2,
                speed: Math.random() * 0.2 + 0.05,
                opacity: Math.random()
            });
        }
    }
    
    function draw_stars() {
        // Use transparent fill for trails
        ctx.fillStyle = 'rgba(5, 5, 5, 0.2)'; 
        ctx.fillRect(0, 0, width, height);
        
        stars.forEach(function(star) {
            ctx.globalAlpha = star.opacity;
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ffffff';
            ctx.beginPath();
             ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; // Reset
            
            star.y -= star.speed;
            if (star.y < 0) {
                star.y = height;
                star.x = Math.random() * width;
            }
        });
        
        requestAnimationFrame(draw_stars);
    }
    
    window.dispatchEvent(new Event('resize'));
    draw_stars();
    
    var view_count = document.getElementById('view-count');
    
    function update_views(){
        var namespace = 'cloudy_biolink';
        var key = (location.hostname + location.pathname).replace(/[^a-zA-Z0-9_.-]/g, '_');
        var storage_key = 'viewed_' + key;
        
        var last_visit = Number(localStorage.getItem(storage_key) || 0);
        var now = Date.now();
        
        var should_hit = now - last_visit > 43200000;
        
        var endpoint = should_hit ? 
            `https://api.countapi.xyz/hit/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}` : 
            `https://api.countapi.xyz/get/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`;
            
        fetch(endpoint).then(function(r) {
            return r.json();
        }).then(function(d) {
             if(view_count) view_count.textContent = (d && d.value) ? d.value : '--';
            if (should_hit) localStorage.setItem(storage_key, String(now));
        }).catch(function() {
            if (view_count) view_count.textContent = '--';
        });
    }
    
    update_views();
});
