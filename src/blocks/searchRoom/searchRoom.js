require('jquery-ui/ui/widgets/datepicker.js');

const datePickerInOut = (elementIn, elementOut)=>{
    const $dateElementIn = $(elementIn);
    const $dateElementOut = $(elementOut);
    let dateArrive;
    let dateOut;

    const getRange = function (element) {
        setTimeout(()=>{
            const $tdElement = $('.ui-datepicker td');
            
            $tdElement.each(function(index, elem){
                const isMaxDate = dateOut && +this.textContent === parseInt(dateOut.substring(0, 2), 10);
                const isMinDate = dateArrive && +this.textContent === parseInt(dateArrive.substring(0, 2), 10);
                const isRangeDate = dateArrive && dateOut && +this.textContent >
                  parseInt(dateArrive.substring(0, 2), 10) && +this.textContent < parseInt(dateOut.substring(0, 2), 10);
                if (isMaxDate){
                    $(this).addClass('searchRoom__max');
                }else if(isMinDate){
                    $(this).addClass('searchRoom__min');
                }else if(isRangeDate){
                    $(this).addClass('searchRoom__range');
                }
            });
        }, 100)
    };

    $dateElementIn.datepicker({
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
        beforeShow: function(value, instance){
            getRange($dateElementIn);
            setTimeout(()=>{
                instance.dpDiv.css({top: $dateElementOut.offset().top + 44});
            }, 100);

        },
        onClose: (value, inst)=>{
            if (value === '') {
                $dateElementIn.datepicker('setDate', null);
            }
        },
    } );

    $dateElementOut.datepicker({
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
            getRange($dateElementOut);
            setTimeout(()=>{
                instance.dpDiv.css({top: $dateElementOut.offset().top + 44,
                  left: $dateElementIn.offset().left});
            }, 100);

        },
        onClose: (value, inst)=>{
            if (value === '') {
                $dateElementOut.datepicker('setDate', null);
            }
        },
    } );
};


datePickerInOut('.js-input_in', '.js-input_out');

export {datePickerInOut}








