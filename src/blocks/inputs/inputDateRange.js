require('jquery-ui/ui/widgets/datepicker.js');


    const filterElement = $('.input__filter');
    const filterElementHide = $('.input__filter-hide');

    filterElement.datepicker({
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
        onClose: (value, inst)=>{
            if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
                filterElement.datepicker('setDate', null);
            }else filterElementHide.datepicker('show')

        },
        beforeShow: (text, instance)=>{
            setTimeout(()=>{
                $('.ui-datepicker-current').click(()=>{
                    filterElement.datepicker('hide');
                   filterElementHide.datepicker('hide')
                });
                instance.dpDiv.css({top: filterElement.offset().top + 38})
            }, 100)

        }
    } );

filterElementHide.datepicker({
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
    onClose: (value, inst)=>{
        if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
            filterElement.datepicker('setDate', null);
        }else {
            filterElement.val(`${filterElement.val()} - ${filterElementHide.val()}`)
        }

    },
    beforeShow: (text, instance)=>{
        setTimeout(()=>{
            $('.ui-datepicker-current').click(()=>{
                filterElementHide.datepicker('hide');
            });
            instance.dpDiv.css({top: filterElement.offset().top + 38,
                left: filterElement.offset().left})
        }, 100)

    }
} );


