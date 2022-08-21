var mouse = {
    x: 0,
    y: 0
};
addEventListener("mousemove", function(event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
});

var Cat = function(name) {
    this.x = 0;
    this.y = 0;
    this.image = (function(){
        var image = document.createElement("img");
        image.id = name;
        image.src = "media/" + name + ".png";
        document.body.appendChild(image);
        return image;
    }());
    this.draw = function() {
        this.image.style.left = this.x + "px";
        this.image.style.top = this.y + "px";
    };
};

var nelly = new Cat("nelly");
var boots = new Cat("boots");

function draw_cats() {
    var leash = 60;

    if (((boots.x - mouse.x)**2 + (boots.y - mouse.y)**2) > leash**2) {
        boots.x += 0.1 * (mouse.x - boots.x);
        boots.y += 0.1 * (mouse.y - boots.y);
        boots.draw();
    }

    if (((nelly.x - boots.x)**2 + (nelly.y - boots.y)**2) > leash**2) {
        nelly.x += 0.1 * (boots.x - nelly.x);
        nelly.y += 0.1 * (boots.y - nelly.y);
        nelly.draw();
    }
}

function animate_cats() {
    draw_cats();
    requestAnimationFrame(animate_cats);
}

animate_cats();
