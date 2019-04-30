require('jquery-ui/ui/widgets/datepicker.js');

const dateElement = $('#testId');

const datePicker = (element)=>{
    element.datepicker({
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
                element.datepicker('setDate', null);
            }
        },
        beforeShow: ()=>{
            setTimeout(()=>{
                $('.ui-datepicker-current').click(()=>{
                    element.datepicker('hide')
                })
            }, 500)

        }
    } );
};

datePicker(dateElement);
