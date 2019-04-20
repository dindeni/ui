require('jquery-ui/ui/widgets/datepicker.js');

const dateElementIn = $('#datepickerIn');
const dateElementOut = $('#datepickerOut');
let dateArrive;
let dateOut;

const getRange = function () {
    setTimeout(()=>{
        $('.ui-datepicker td').each(function(index, elem){
            if (dateOut && +this.textContent === parseInt(dateOut.substring(0, 2), 10)){
                $(this).addClass('searchRoom__max');
            }else if(dateArrive && +this.textContent === parseInt(dateArrive.substring(0, 2), 10)){
                $(this).addClass('searchRoom__min');

            }else if(dateArrive && dateOut && +this.textContent >
                parseInt(dateArrive.substring(0, 2), 10) && +this.textContent < parseInt(dateOut.substring(0, 2), 10)){
                $(this).addClass('searchRoom__range');
            }
        })
    }, 500)
};

dateElementIn.datepicker({
    showOtherMonths: true,
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    dateFormat: 'dd.mm.yy',
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    nextText: '',
    firstDay: 1,
    onSelect: (date, dataObj)=>{
        dateArrive = date;
    },
    beforeShow: function(){
        getRange()
    }
} );

dateElementOut.datepicker({
    showOtherMonths: true,
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    dateFormat: 'dd.mm.yy',
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
        'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    nextText: '',
    firstDay: 1,
    onSelect: (date, dataObj)=>{
        dateOut = date;
    },
    beforeShow: function () {
        getRange();

    }
} );








