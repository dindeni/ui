require('jquery-ui/ui/widgets/datepicker.js');

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
        onClose: (value)=>{
            if (value === '') {
                element.datepicker('setDate', null);
            }
        },
        beforeShow: (text, instance)=>{
            setTimeout(()=>{
                const handlerDatepickerClick = ()=>element.datepicker('hide');
                $('.ui-datepicker-current').click(handlerDatepickerClick);
                instance.dpDiv.css({top: element.offset().top + 38});
            }, 100)

        }
    } );
};

export {datePicker}
