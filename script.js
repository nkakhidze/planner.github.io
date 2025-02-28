let selected_date = '';

$.datepicker.regional['ru'] = {
    closeText: 'Закрыть',
    prevText: 'Предыдущий',
    nextText: 'Следующий',
    currentText: 'Сегодня',
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    weekHeader: 'Нед.',
    dateFormat: 'dd-mm-yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};

$(document).ready(function () {
    $('.today-date').text($.datepicker.formatDate('dd-M-yy', new Date()));

    $("#date-picker").datepicker({
        dateFormat: 'dd-M-yy',
        onSelect: function(selected) {
            selected_date = selected;
            $('.selected-date').text(selected_date);
            showCreateEvents();
        }
    });

    $('#add-event').click(function () {
        const $event_name_selector = $('#event-name');
        const event_name = $event_name_selector.val();
        const $event_description_selector = $('#event-description');
        const event_description = $event_description_selector.val();

        if(selected_date.length === 0) {
            alert('Пожалуйста, выберите дату и продолжите');
            return false;
        }

        if(event_name.length === 0 || event_description.length === 0 ) {
            alert('Название события и описание должны быть заполнены!');
            return false;
        }

        const existing_events = JSON.parse(localStorage.getItem(selected_date));
        const event_data = {'event_name': event_name, 'event_description': event_description};

        if(existing_events) {
            existing_events.push(event_data);
            localStorage.setItem(selected_date, JSON.stringify(existing_events));
        } else {
            localStorage.setItem(selected_date, JSON.stringify([event_data]));
        }

        $event_name_selector.val('');
        $event_description_selector.val('');
        showCreateEvents();
    });
});

function showCreateEvents() {
    const events = JSON.parse(localStorage.getItem(selected_date));
    const $list_events = $('.list-events');

    $list_events.empty();

    if(events) {
        let event_lists = '';

        $.each(events, function (index, event) {
            event_lists += "<span class='index-num'>"+(index+1)+". </span>"+"<span class='event-name'>"+event.event_name+"</span>"+" <span class='event-description'>"+event.event_description+"</span><div></div>";
        });

        $list_events.append(event_lists);
    }
}