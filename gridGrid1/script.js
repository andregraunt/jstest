//comment textarea
function flexibleTextarea(){
	var _txt = document.getElementById('comment'); // здесь comment - это идентификатор поля, которое будет растягиваться.
	var _minRows = 3; // минимальное количество строк (высота поля)

	if (_txt) {
		// функция расчета строк
		function setRows() {
			_txt.rows = _minRows; // минимальное количество строк
			// цикл проверки вместимости контента
			do {
				if (_txt.clientHeight != _txt.scrollHeight) _txt.rows += 1;
			} while (_txt.clientHeight < _txt.scrollHeight);
		}
		setRows();
		_txt.rows = _minRows;

		// пересчет строк в зависимости от набранного контента
		_txt.onkeyup = function(){
			setRows();
		}
	}
}

if (window.addEventListener)
	window.addEventListener("load", flexibleTextarea, false);
else if (window.attachEvent)
	window.attachEvent("onload", flexibleTextarea);

    //end comment textarea

    // comment2 textarea
    function flexibleTextarea2(){
        var _txt = document.getElementById('comment2'); // здесь comment - это идентификатор поля, которое будет растягиваться.
        var _minRows = 3; // минимальное количество строк (высота поля)
    
        if (_txt) {
            // функция расчета строк
            function setRows() {
                _txt.rows = _minRows; // минимальное количество строк
                // цикл проверки вместимости контента
                do {
                    if (_txt.clientHeight != _txt.scrollHeight) _txt.rows += 1;
                } while (_txt.clientHeight < _txt.scrollHeight);
            }
            setRows();
            _txt.rows = _minRows;
    
            // пересчет строк в зависимости от набранного контента
            _txt.onkeyup = function(){
                setRows();
            }
        }
    }
    
    if (window.addEventListener)
        window.addEventListener("load", flexibleTextarea2, false);
    else if (window.attachEvent)
        window.attachEvent("onload", flexibleTextarea2);

    //end comment2 textarea
    
