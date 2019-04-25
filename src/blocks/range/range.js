require('jquery-ui/ui/widgets/slider');
require('jquery-ui/themes/base/slider.css');

$("#slider").slider({
    range: true,
    min: 1000,
    max: 50000,
    step: 1000,
    values:[1000, 50000],
    slide: (event, ui)=> {
        $('.range__label').html(`${ui.values[0].toString().
        replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}&#8381; - ${ui.values[1].toString().
        replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}&#8381;`);
        console.log(ui)
    }
});



