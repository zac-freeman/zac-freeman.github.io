let slide_index = { "about_us": 0, "about_them": 0 };

function show_slide(slideshow, index) {
    let slides = document.getElementsByClassName(slideshow + "_slide");
    const slide_count = slides.length;
    slide_index[slideshow] = (index + slide_count) % slide_count;

    for(let i = 0; i < slide_count; i++) {
        slides[i].style.display = "none";
    }
    slides[slide_index[slideshow]].style.display = "block";
}

function prev_slide(slideshow) {
    show_slide(slideshow, slide_index[slideshow] - 1);
}

function next_slide(slideshow) {
    show_slide(slideshow, slide_index[slideshow] + 1);
}

show_slide("about_us", slide_index["about_us"]);
show_slide("about_them", slide_index["about_them"]);
