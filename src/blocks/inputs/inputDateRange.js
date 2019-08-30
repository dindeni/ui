require('jquery-ui/ui/widgets/datepicker.js');


    const $filterElement = $('.input__filter');
    const $filterElementHide = $('.input__filter-hide');

    $filterElement.datepicker({
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
        onClose: (value)=>{
            if (value === ''){
                $filterElement.datepicker('setDate', null);
            }else $filterElementHide.datepicker('show')

        },
    } );

$filterElementHide.datepicker({
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
        if (value === '') {
            $filterElement.datepicker('setDate', null);
        }else {
            $filterElement.val(`${$filterElement.val()} - ${$filterElementHide.val()}`)
        }

    },
    beforeShow: (text, instance)=>{
        setTimeout(()=>{
            instance.dpDiv.css({top: $filterElement.offset().top + 38,
                left: $filterElement.offset().left})
        }, 100)

    }
});


