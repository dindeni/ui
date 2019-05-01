require('jquery-ui/ui/widgets/datepicker.js');

const datePickerInOut = (idIn, idOut)=>{
    const dateElementIn = $(idIn);
    const dateElementOut = $(idOut);
    let dateArrive;
    let dateOut;

    const getRange = function (element) {
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
            });
            $('.ui-datepicker-current').click(()=>{
                element.datepicker('hide')
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
        showButtonPanel: true,
        closeText: 'очистить',
        currentText: 'применить',
        onSelect: (date, dataObj)=>{
            dateArrive = date;
        },
        beforeShow: function(tetx, instance){
            getRange(dateElementIn);
            setTimeout(()=>{
                instance.dpDiv.css({top: dateElementOut.offset().top + 38});
            }, 100);

        },
        onClose: (value, inst)=>{
            if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
                dateElementIn.datepicker('setDate', null);
            }
        },
    } );

    dateElementOut.datepicker({
        showOtherMonths: true,
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        dateFormat: 'dd.mm.yy',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
            'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        nextText: '',
        firstDay: 1,
        showButtonPanel: true,
        closeText: 'очистить',
        currentText: 'применить',
        onSelect: (date, dataObj)=>{
            dateOut = date;
        },
        beforeShow: function (text, instance) {
            getRange(dateElementOut);
            setTimeout(()=>{
                instance.dpDiv.css({top: dateElementOut.offset().top + 38});
            }, 100);

        },
        onClose: (value, inst)=>{
            if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
                dateElementOut.datepicker('setDate', null);
            }
        },
    } );
};


datePickerInOut('#datepickerIn', '#datepickerOut');

export {datePickerInOut}








